var bcrypt = require('bcryptjs');
const { useDB, sendError, saveImage, createQrFile, randomNumber, checkAccess } = require('../../services/helper')
var validate = require('../../config/messages');
const { query } = require('express');


class EmployeeController{
    
    getEmployee = async function (req, res) {
        let db = useDB(req.db)
        let Employee = db.model("Employee");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Sending employee'
        }
        try {

            let employee = await Employee.findById(req.params.employee)
            result['object'] = employee

        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    getEmployees = async function (req, res) {
        let db = useDB(req.db)
        let Employee = db.model("Employee");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active" }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Sending employees'
        }
        try {
            
            let employees = await Employee.find()
            result['objects'] = employees
        
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    addEmployee = async function (req, res) {
        let db = useDB(req.db)
        let Employee = db.model("Employee");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Employee added'
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        addEmployee: try {
            let hashedPassword = bcrypt.hashSync(req.fields.password, 8);
            let employee = await new Employee({
                name: req.fields.name,
                phone: req.fields.phone,
                email: req.fields.email,
                password: hashedPassword,
                birthDate: req.fields.birthDate,
                comment: req.fields.comment,
            }).save();
            
            if (req.files.avatar) {
                let filename = saveImage(req.files.avatar, req.db, null, true)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break addEmployee
                } else {
                    employee.avatar = filename
                    await employee.save()
                }
            }

            employee.password = 'secured';
            result['object'] = employee
        } catch (error) {
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };

    updateEmployee = async function (req, res) {
        let db = useDB(req.db)
        let Employee = db.model("Employee");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Employee updated'
        }
        let lang = req.headers["accept-language"]
        if (lang != 'ru') {
            lang = 'en'
        }
        updateEmployee: try {
            let query = { '_id': req.params.employee }
            let employee = null
            if (req.fields.birthDate) {
                req.fields.birthDate = req.fields.birthDate.replace('\r\n', '');
            }
            console.log(req.fields)
            if (req.fields.password && req.fields.password != "\r\n") {
                req.fields.password = req.fields.password.trim()
                employee = await Employee.findOneAndUpdate(query, req.fields, {
                    new: true
                }).select('+password')
                await employee.save()
                employee.password = bcrypt.hashSync(req.fields.password, 8);
                await employee.save()

            }else{
                delete req.fields.password
                
                employee = await Employee.findOneAndUpdate(query, req.fields, {
                    new: true
                })
            }
            
            
            if (req.files.avatar) {
                let filename = saveImage(req.files.avatar, req.db, req.files.avatar, true)
                if (filename == 'Not image') {
                    result = {
                        status: 500,
                        msg: "Validation error",
                        errors: {
                            img: validate[lang]['image_not_valid'],
                        },
                    }
                    break updateEmployee
                } else {
                    employee.avatar = filename
                    await employee.save({
                        new: true
                    })
                }
            }
            result['object'] = employee
        } catch (error) {
            console.log(error)
            result = sendError(error, req.headers["accept-language"])
        }

        res.status(result.status).json(result);
    };
    
    deleteEmployees = async function (req, res) {
        let db = useDB(req.db)
        let Employee = db.model("Employee");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Employees deleted'
        }
        if (req.fields.objects && req.fields.objects.length) {
            try {
                let query = {
                    '_id': {
                        $in: req.fields.objects
                    }
                }
                await Employee.deleteMany(query)
                let employees = await Employee.find()
                result['objects'] = employees
            } catch (error) {
                result = sendError(error, req.headers["accept-language"])
            }
        } else {
            result = {
                'status': 200,
                'msg': 'Parametr objects is empty'
            }
        }


        res.status(result.status).json(result);
    };

    updateEmployees = async function (req, res) {
        let db = useDB(req.db)
        let Employee = db.model("Employee");
        if (req.userType == "employee") {
            let checkResult = await checkAccess(req.userID, { access: "settings", parametr: "active", parametr2: 'canEdit' }, db, res)
            if (checkResult) {
                return;
            }
        }
        let result = {
            'status': 200,
            'msg': 'Employees updated'
        }
        if (req.fields.objects.length) {
            try {
                let query = {}
                for (let employee of req.fields.objects){
                    query = { '_id': employee._id }
                    await Employee.findOneAndUpdate(query, req.fields)
                }
                let employees = await Employee.find()
                result['objects'] = employees
            } catch (error) {
                result = sendError(error, req.headers["accept-language"])
            }
        } else {
            result = {
                'status': 200,
                'msg': 'Parametr objects is empty'
            }
        }


        res.status(result.status).json(result);
    };
}


module.exports = new EmployeeController();
