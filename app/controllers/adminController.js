const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var config = require('../../config/config');
const xmlController = require("./xmlController");
const { sendError,useDB, getDaysLeft } = require('../../services/helper');

sortByFunc = function (property,sortOrder){
    sortOrder = parseInt(sortOrder);
    let first = sortOrder === 1 ? -1 : 1;
    let second = sortOrder === 1 ? 1 : -1;

    let compare = function( a, b ) {
        if ( a[property] < b[property] ){
            return first;
        }
        if ( a[property] > b[property] ){
            return second;
        }
        return 0;
    }
    return compare;
}

class AdminController{
    login = async function (req, res) {
        let db = useDB('loygift');
        let User = db.model("User");
        // let hashedPassword = bcrypt.hashSync(req.fields.password, 8);
        // console.log(hashedPassword);
        // console.log(bcrypt.compareSync(req.fields.password, "$2a$08$pTfNpGMFla0pU6rVr/ooLueTMsmkhJqCeLASbAKw0qhUUvcFWJ1zi"));
        try {
            let user = await User.findOne({ email: req.fields.email }).select('+password +DB')
            if (!user) return res.status(404).json({ status: 404, msg: 'No user found' });

            var passwordIsValid = bcrypt.compareSync(req.fields.password, user.password);
            if (!passwordIsValid) return res.status(401).json({ auth: false, token: null });

            var token = jwt.sign({ id: user._id, user: user._id, name: user.name, type: "admin" }, config.secret_key, {
                expiresIn: "30 days" // expires in 24 hours
            });
            var refresh_token = jwt.sign({ id: user._id, user: user._id, name: user.name, type: "admin" }, config.secret_key, {
                expiresIn: "60 days"
            });
            user.password = ""
            res.status(200).json({ auth: true, token: token, refresh_token: refresh_token, object: user });
        } catch (error) {
            let result = sendError(error, req.headers["accept-language"])
            res.status(result.status).json(result);
        }

    };

    getAdminSettings = async function(req,res){
        let db = useDB('loygift');
        let AdminSettings = db.model("AdminSettings");
        let result = {
            'status': 200,
            'msg': 'adminSettings'
        }
        try {
            let adminSetting = await AdminSettings.findOne({});
            if(!adminSetting){
                adminSetting = await new AdminSettings();
            }
            result["object"] = adminSetting;
            res.status(result.status).json(result);
        } catch (error) {
            result = sendError(error, req.headers["accept-language"]);
            res.status(result.status).json(result);
        }
    }

    getMainUsers = async function(){
        let db = useDB('loygift');
        let User = db.model("User");
        return User.find({});
    };

    // startCronParsers = async function () {
    //     let db = useDB('loygift');
    //     let User = db.model("User");
    //     let users = await User.find({});
    //     users.foreach(function (comp){
    //         console.log(comp,"opopopopoooooooo11111111111111111111111111111111111111");
    //     })
    // };

    getActiveCronParsers = async function(req,res){
        let result = {};
        let listAllJobsArray = [];
        try{
            let listAllJobsObject = await global.cronJobMethods.listCronJobs();
            Object.keys(listAllJobsObject).forEach(job=>{
                if(job.includes('parser')){
                    let temp = {};
                    temp['id'] =  job.replace('parser-', '');
                    temp['time'] =  listAllJobsObject[job].cron.cronTime;
                    listAllJobsArray.push(temp);
                }
            });
            result['objects'] = listAllJobsArray;
            res.status(200).json(result);
        }catch (e){
            res.status(500).json(e);
        }
    }

    getCompanies = async function(req,res){
        let filterQuery = {};
        if(req.query.searchText && req.query.searchText.length > 0){
            let searchText = req.query.searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
            filterQuery.name= { $regex: '.*' + searchText + '.*' ,$options: 'i'};
        }
        let sortByProperty = req.query.sortByProperty || "companyName";
        let sortOrder = req.query.sortOrder || 1;

        let db = useDB('loygift');
        let User = db.model("User");
        let result = {};
        let users = await User.find({});
        let companyDetails = [];
        for(const user of users){
            let detail = {};
            let companyDb = useDB(`loygift${user._id}`);
            let Client = companyDb.model("Client");
            let Settings = companyDb.model("Settings");
            let clients = await Client.find({});
            let setting = await Settings.findOne(filterQuery);

            if(user.companyName === "admin"){
                continue;
            }

            if(!setting && filterQuery.name){
                continue;
            }
            detail.id = user._id;
            detail.name = user.name;
            detail.email = user.email;
            detail.companyName = setting ? setting.name : '';
            detail.country = setting ? setting.country : '';
            detail.phone = user.phone;
            detail.clients = clients.length;
            detail.expires = user.activeBefore;
            detail.created = user.createdAt;
            detail.lastLogged = user.loggedAt;
            detail.isBlocked = user.isBlocked;
            detail.catalogParserStatus = user.catalogParserStatus;
            detail.password = '';
            detail.daysLeft = getDaysLeft(user.activeBefore);
            companyDetails.push(detail);
        }

        let functionSort = sortByFunc(sortByProperty,sortOrder);
        companyDetails.sort(functionSort);
        result['objects'] = companyDetails;
        res.status(200).json(result);
    }

    updateCompanyAccess = async function(req,res){
        let type = req.fields['type'] || "block";
        let id = req.params['id'] || '';
        let db = useDB('loygift');
        let User = db.model("User");
        let result = {
            'status': 201,
            'msg': 'Sending Cashback'
        }
        try {
            let query = { '_id': id }
            await User.findOneAndUpdate(query, {'isBlocked':type === "block"});
        } catch (error) {
            result = sendError(error, req.headers["accept-language"]);
        }
        res.status(result.status).json(result);
    }

    updateCompany = async function(req,res){

        let expireDate = req.fields.expirationDate;
        let companyName = req.fields.company.companyName;
        let email = req.fields.company.email;
        let phone = req.fields.company.phone;
        let password = req.fields.company.password;
        let country = req.fields.company.country;
        let catalogParserStatus = req.fields.company.catalogParserStatus;

        let id = req.params['id'] || '';
        let db = useDB('loygift');
        let User = db.model("User");

        let result = {
            'status': 201,
            'msg': 'Updated'
        }
        try {
            let user = await User.findById(id);
            if(user){
                user.activeBefore = expireDate;
                user.email = email;
                user.phone = phone;
                user.catalogParserStatus = catalogParserStatus;
                if(password.length>0){
                    user.password = bcrypt.hashSync(password, 8);
                }
                await user.save();

                if(user.catalogParserStatus){
                    await global.cronJobMethods.createParserCron(user, global.cronJobMethods.parserCronTime, function () {
                        console.log(`Running chron parser for loygift${user._id}`)
                        xmlController.parseXml(`loygift${user._id}`);
                    })
                }else{
                    await global.cronJobMethods.removeCronJob(`parser-${user.companyName}-${user.email}`);
                }

                let companyDb = useDB(`loygift${user._id}`);
                let Settings = companyDb.model("Settings");
                let setting = await Settings.findOne({});
                if(setting){
                    setting.name = companyName;
                    setting.country = country;
                    await setting.save({ validateBeforeSave: false });
                }
            }
        } catch (error) {
            result = sendError(error, req.headers["accept-language"]);
        }
        res.status(result.status).json(result);
    }

    updateAdminSettings = async function(req,res){
        let db = useDB('loygift');
        let AdminSettings = db.model("AdminSettings");
        let result = {
            'status': 201,
            'msg': 'Updated'
        }
        try {
            let adminSetting = await AdminSettings.findOne({});
            if(!adminSetting){
                adminSetting = await new AdminSettings()
            }
            adminSetting.autoBlock = req.fields.autoBlock;
            adminSetting.save();

        } catch (error) {
            result = sendError(error, req.headers["accept-language"]);
        }
        res.status(result.status).json(result);
    }
}
module.exports = new AdminController();