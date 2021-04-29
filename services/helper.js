var path = require('path')
const fs = require('fs')
var validate = require('../config/errorMessages');
var excel = require('excel4node');
const { errors } = require('formidable');
function useDB(db_name) {
    let db = global.userConnection.useDb(db_name);
    return db;
}

function saveImage(file, company, old_file_name=null){
    let filename = 'images/' + company + '/' + Math.random().toString().substr(2, 8) + path.extname(file.name)
    var dir = path.join(__dirname, '/../views/frontend/images/' + company)
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    if (old_file_name){
        old_file_name = path.join(__dirname, '/../views/frontend/images/' + old_file_name)
        if (fs.existsSync(old_file_name)){
            fs.unlink(old_file_name, function(err){
                console.log(err)
            });
        }
    }
    var upload = path.join(__dirname, '/../views/frontend/' + filename)
    if (file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        fs.rename(file.path, upload, function (err) {
            if (err) {
                console.log(err);
            }
        });
    }else{
        filename = 'Not image'
    }
    return filename
}
function sendError(error, lang) {
    let result = {
        'status': 500,
        'msg': "Something went wrong"
    }
    if(lang != 'ru'){
        lang = 'en'
    }
    if (error.name === "ValidationError") {
        let errors = {};

        Object.keys(error.errors).forEach((key) => {
            
            if (error.errors[key].message in validate[lang]){
                errors[key] = validate[lang][error.errors[key].message]
                
            }else{
                errors[key] = error.errors[key].message;
            }
            
        });
        result["status"] = 400
        result["msg"] = "Validation error"
        result["errors"] = errors
    }else{
        console.log(error)
    }
    return result
};
function createExcel(headers, params){
    var workbook = new excel.Workbook();

    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Sheet 1');

    // Create a reusable style
    var headerStyle = workbook.createStyle({
        font: {
            color: '#FF0800',
            size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });
    var paramStyle = workbook.createStyle({
        font: {
            color: '#FF0800',
            size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });

    // Create Headers
    for (let [index, header] in headers.keys){
        worksheet.cell(index + 1, 1).string(headers[header]).style(headerStyle);
        for (let [param_index, param] in params) {
            worksheet.cell(index + 1, param_index + 1,).string(param[header]).style(paramStyle);
        }
    }
    workbook.write('Excel.xlsx');
    return workbook
}
module.exports = {
    useDB: useDB,
    saveImage: saveImage,
    sendError: sendError,
    createExcel: createExcel
}