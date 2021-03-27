var bcrypt = require('bcryptjs');
const { useDB } = require('../../services/helper')

class ClientController{
    
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

    getClients = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");

        let result = {
            'status': 200,
            'msg': 'Sending clients'
        }
        try {
            
            let clients = await Client.find()
            result['objects'] = clients
        
        } catch (error) {
        
            result = {
                'status': 500,
                'msg': error.message
            }
        
        }

        res.status(result.status).json(result);
    };

    addClient = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");

        let result = {
            'status': 200,
            'msg': 'Client added'
        }
        try {
            let hashedPassword = bcrypt.hashSync(req.fields.password, 8);

            let client = await new Client({
                firstName: req.fields.firstName,
                lastName: req.fields.lastName,
                phone: req.fields.phone,
                email: req.fields.email,
                password: hashedPassword,
                birthDate: req.fields.birthDate,
                address: req.fields.address,
                category: req.fields.category
            }).save();
            client.password = 'secured';
            result['object'] = client
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    updateClient = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");

        let result = {
            'status': 200,
            'msg': 'Client updated'
        }
        try {
            let query = { '_id': req.params.client }
            req.fields.password = bcrypt.hashSync(req.fields.password, 8);

            let client = await Client.findOneAndUpdate(query, req.fields)
            client.password = 'secured';
            result['object'] = client
        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };

    deleteClient = async function (req, res) {
        let db = useDB(req.db)
        let Client = db.model("Client");

        let result = {
            'status': 200,
            'msg': 'Client deleted'
        }
        try {

            let query = { '_id': req.params.client }
            await Client.findByIdAndRemove(query)

        } catch (error) {
            result = {
                'status': 500,
                'msg': error.message
            }
        }

        res.status(result.status).json(result);
    };
}


module.exports = new ClientController();
