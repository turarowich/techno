var bcrypt = require('bcryptjs');
const { useDB, sendError } = require('../../services/helper')
var validate = require('../../config/messages');
var config = require('../../config/config');
const { query } = require('express');
var path = require('path')
var dir = path.join(__dirname, "../../keys/" + config.APNs)
const moment = require('moment');
const analytics = require('../models/analytics');
class AnalyticsController {

    updateAnalytics = async function (req, date=null, upOrders=false, upClients=false) {
        let db = useDB(req.db)
        let Analytics = db.model("Analytics");
        let Order = db.model("Order");
        let Client = db.model("Client");
        if(!date){
            date = new Date()
        }
        let query = { //query today up to tonight
            createdAt: {
                "$gte": moment(date).startOf('day').toDate(),
                "$lt": moment(date).endOf('day').toDate()
            }
        }
        let analytic = await Analytics.find(query)
        
        analytic = analytic[0]
        if (!analytic){
            analytic = new Analytics();
        }
        
        if (upOrders){
            let orders      = await Order.find(query).populate('sample').exec()
            let profit      = 0;
            let discounts   = 0;
            let spentPoints = 0;
            let income      = 0;
            for (let order of orders) {
                profit      += order.totalPrice
                discounts   += order.totalDiscount
                spentPoints += order.points
                income      += order.sample.details[0].income
            }
            analytic.profit = profit;
            analytic.discounts = discounts;
            analytic.spentPoints = spentPoints;
            analytic.income = income;
            if (orders.length) {
                analytic.averageCheck = profit / orders.length
            }
        }
        
        if(upClients){
            let clients   = await Client.find(query)
            let mans      = 0;
            let women     = 0;
            let middleAge = 0;

            for (let client of clients) {
                mans      += client.gender == "man" ? 1 : 0;
                women     += client.gender == "women" ? 1 : 0;
                if (client.birthDate){
                    middleAge += moment().diff(client.birthDate, 'years', false);
                }
            }
            analytic.mans  = mans
            analytic.women = women
            if (clients.length){
                analytic.middleAge = middleAge / clients.length
                analytic.clients   = clients.length
            }
        }
        analytic.createdAt = date;
        await analytic.save()
        return;
    };    

    getAnalytics = async (req, res) => {
        let db = useDB(req.db)
        let Analytics = db.model("Analytics");
        let Worker = db.model("Worker")
        let Orders = db.model("Order")
        let Client = db.model("Client")

        let result = {
            'status': 200,
            'msg': 'Sending analytics'
        }
        try {
            let info = {
                workersCount: 0,
                discount: 0,
                clients: 0,
                income: 0,
                total: 0,
                building: 0,
                points: 0
            }
            let query = {}
            if (req.query.start || req.query.end) {
                query = {
                    createdAt: {
                    }
                }
            }
            if (req.query.start){
                query.createdAt['$gte'] = moment(req.query.start).startOf('day')
            }
            if (req.query.end) {
                query.createdAt['$lt'] = moment(req.query.end).endOf('day')
            }
            await this.updateAnalytics(req);
            let analytics = await Orders.find(query).sort({ createdAt: 1 }).populate('sample').exec()
            let chart = {}
            for(let analytic of analytics){
                info.discount += analytic.totalDiscount
                info.income += (analytic.sample.details[0].income * analytic.quantity) -  analytic.totalDiscount
                info.points += analytic.points

                const sample = analytic.sample.details[0]
                let totalSample = parseInt(sample.sewing) + parseInt(sample.kroy) + parseInt(sample.overlok) + parseInt(sample.rasposhivalka) + parseInt(sample.vengerka) + parseInt(sample.beltclipper) + parseInt(sample.petla) + parseInt(sample.iron) + parseInt(sample.otk) + parseInt(sample.package) + parseInt(sample.buttons) + parseInt(sample.technolog) + parseInt(sample.consumption) + parseInt(sample.furnitura)
                let building = totalSample * analytic.quantity
                info.building = building

                totalSample+= +sample.income
                totalSample = (totalSample * analytic.quantity) - analytic.totalDiscount
                info.total  = totalSample
                chart[moment(analytic.createdAt).format("YYYY-MM-DD")] = totalSample
            }
            let countOfWorkers = await Worker.find().count()
            info.workersCount = countOfWorkers
            let countOfClients = await Client.find().count()
            info.clients = countOfClients

            result['info'] = info
            result['objects'] = analytics;
            result['chart'] = chart;
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
}


module.exports = new AnalyticsController();
