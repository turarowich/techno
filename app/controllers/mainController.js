var bcrypt = require('bcryptjs');
const { useDB } = require('../../services/helper')

class MainController {

    getClient = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");

        let result = {
            'status': 200,
            'msg': 'Sending client'
        }
        try {

            let client = await Client.findById(req.params.client)
            result['object'] = client

        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };
}


module.exports = new MainController();
