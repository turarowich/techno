const moment = require("moment");
const pushController = require('./pushController');
const { useDB} = require('../../services/helper')
checkAllClients = async function () {
    let today = moment()
    let companies = [];
    let clientsTodayWithDb = [];
    try{
        await global.userConnection.useDb('loygift').model("User").find({}, function (err, users) {
            users.forEach(function (user) {
                companies.push(user._id)
            });
        });
        for (const id of companies) {
            await global.userConnection.useDb(`loygift${id}`).model("Client").find({}, function (err, clients) {
                clients.forEach(function (client) {
                    let birthDay = moment(client.birthDate)
                    if(birthDay.isSame(today,'day')){
                        clientsTodayWithDb.push({
                            companyDb:`loygift${id}`,
                            clientId:client._id
                        })
                    }
                });
            });
        }
    }catch (e){
        console.log(e,"ERRRfffffffffffffffffffffffffffffffffff")
    }
    for (const clientWithDb of clientsTodayWithDb) {
        let db = useDB(clientWithDb.companyDb)
        let cashback_model = db.model("Cashback");
        let ClientNews = db.model("ClientNews");
        let Client = db.model("Client");
        let cashbackAll = await cashback_model.find();
        let ClientBonusHistory = db.model("clientBonusHistory");

        let clientObject = await Client.findById(clientWithDb.clientId)

        if(!clientObject || clientObject.receivedBdPoints){
            continue;
        }

        if(cashbackAll.length===0){
            //no model
            continue;
        }
        let cashback = cashbackAll[0];
        if(!cashback.birthday_points_status){
            continue;
        }
        let title = cashback.bday_message_title
        let body = cashback.bday_message_body
        let bdPoints = cashback.birthday_points_quant

        let news = await new ClientNews({
            name: title,
            desc: body,
            category: "birthday",
        });
        news.save()

        if(bdPoints !=null && bdPoints>0){
            clientObject.points = parseFloat(clientObject.points ) + bdPoints;
            await new ClientBonusHistory({
                client: clientObject._id,
                points: bdPoints,
                source: 'Birthday points',
                type: 'received',
            }).save();
        }
        clientObject.receivedBdPoints = true;
        clientObject.news.push( news)
        await clientObject.save()
        // await Client.updateOne({_id:clientWithDb.clientId}, { $push: { news: news } });
        let message={
            client:clientWithDb.clientId,
            text: body,
        }
        try {
            try{
                await pushController.sendNewMessage(clientWithDb.companyDb, clientWithDb.clientId, message,title)
            }catch (e){
                console.log(e)
            }
            try{
                await pushController.sendNewMessageAndroid(clientWithDb.companyDb, clientWithDb.clientId, message,title,"notification")
            }catch (e) {
                console.log(e)
            }
        }catch (e){
            console.log(e,"ERROeR")
        }
    }
}

checkBirthdayPointsLife = async function () {
    let today = moment()
    let companies = [];
    let companiesWithPointsLifeLimit = [];
    //get all companies that have set the bd points life to true
    try {
        await global.userConnection.useDb('loygift').model("User").find({}, function (err, users) {
            users.forEach(function (user) {
                companies.push(user._id)
            });
        });
        for (const id of companies) {
            await global.userConnection.useDb(`loygift${id}`).model("Cashback").find({}, function (err, cashbackAll) {
                if(cashbackAll.length!==0){
                    let cashback = cashbackAll[0];
                    if(cashback.points_lifetime_status){
                        companiesWithPointsLifeLimit.push(
                            {
                                company:`loygift${id}`,
                                limitInDays:cashback.points_expiration_period || 0
                            }
                        );
                    }
                }
            });
        }
    } catch (e) {
        console.log(e, "ERRRfffffffffffffffffffffffffffffffffff")
    }
    //for each company get Birthday points and check dates
    for (const companyAndLimit of companiesWithPointsLifeLimit) {
        let db = useDB(companyAndLimit.company)
        let cashback_model = db.model("Cashback");
        let ClientNews = db.model("ClientNews");
        let Client = db.model("Client");
        let cashbackAll = await cashback_model.find();
        let ClientBonusHistory = db.model("clientBonusHistory");
        let Order = db.model("Order");

        let pointsLifeInDays = companyAndLimit.limitInDays;
        let allBdPoints = await ClientBonusHistory.find({source:"Birthday points"});

        try{
            for (const history of allBdPoints) {
                let limitDate = moment(history.createdAt).add(pointsLifeInDays, 'days');

                if(limitDate.isSameOrBefore(today,'day')){
                    //check if client already had used these points
                    //check if points were already expired
                    //subtract points
                    //create history
                    console.log("FOUkND",history.points)
                    let pointsQuantity = history.points || 0;
                    let clientObject = await Client.findById(history.client)

                    if(!clientObject || clientObject.expiredBdPoints || pointsQuantity<=0){
                        continue
                    }
                    let pointsLeft =  await usedBdPointsCheck(Order,clientObject,history);
                    console.log(pointsLeft,"---l")
                    if(pointsLeft<=0){
                        //nothing to deduct, client already had used all bd points
                        clientObject.expiredBdPoints = true;
                        clientObject.save();
                        continue
                    }

                    let newAmount = clientObject.points - pointsLeft;
                    if(newAmount>0){
                        clientObject.points = newAmount;
                    }else{
                        clientObject.points = 0;
                    }
                    console.log("YESklk",newAmount)
                    await new ClientBonusHistory({
                        client: clientObject._id,
                        points: pointsLeft,
                        source: 'Birthday points expired',
                        type: 'deducted',
                    }).save();
                    clientObject.expiredBdPoints = true;
                    await clientObject.save();
                }
            }
        }catch(er){
            console.log(err)
        }

    }
}

usedBdPointsCheck = async function (ordersModel, clientObject,history) {
    //check if client has spent any points from the day he received the birthday points
    //check amount used, return unused bd points
    let dateStart = moment(history.createdAt);
    let today = moment().startOf('day');
    let birthdayHistoryPoints = history.points;
    let totalUsedPoints = 0;
    let pointsDelta = 0;
    let result = 0;
    let allOrders = await ordersModel.find({client: clientObject._id,points: { $gt: 0 },  createdAt: {
            $gte: dateStart.toDate(),
            $lte: moment(today).endOf('day').toDate()
        }});
    allOrders.forEach(function (order){
        totalUsedPoints+= parseFloat(order.points);
    })

    pointsDelta = parseFloat(birthdayHistoryPoints) - parseFloat(totalUsedPoints);
    if(pointsDelta>0){
        result = pointsDelta;
    }else{
        result = 0;
    }
    return result;
}

module.exports = {
    checkAllClients,
    checkBirthdayPointsLife
}