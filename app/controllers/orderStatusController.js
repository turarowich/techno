const { useDB, sendError, createExcel, randomNumber, checkAccess } = require('../../services/helper')
var socketController = require('./socketController');

exports.create = function(io) {
    return  function(req) {
        console.log(req.fields);
        console.log(io.sockets.adapter.rooms);
        try {
            io.to(req.fields.client).emit('sendingHey', {
                status: req.fields.status,
                order: req.fields.order,
                code: req.fields.code,
            });
        } catch (error) {
            console.log(error);
        }
    }
}
