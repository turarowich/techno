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
            let orders      = await Order.find(query)
            let profit      = 0;
            let discounts   = 0;
            let spentPoints = 0;
            for (let order of orders) {
                profit      += order.totalPrice
                discounts   += order.totalDiscount
                spentPoints += order.points
            }
            analytic.profit = profit;
            analytic.discounts = discounts;
            analytic.spentPoints = spentPoints;
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
                middleAge += moment().diff(client.birthDate, 'years', false);
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

        let result = {
            'status': 200,
            'msg': 'Sending analytics'
        }
        try {
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
            let analytics = await Analytics.find(query).sort({ createdAt: 1 })
            let chart = {}
            for(let analytic of analytics){
                chart[moment(analytic.createdAt).format("YYYY-MM-DD")] = analytic.profit;
            }
            result['objects'] = analytics;
            result['chart'] = chart;
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
}


module.exports = new AnalyticsController();
