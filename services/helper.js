var path = require('path')
const fs = require('fs')
var validate = require('../config/messages');
var excel = require('excel4node');
const { errors } = require('formidable');
const QRCode = require('qrcode');
var moment = require("moment")

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
    if (file.name.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
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
function createExcel(type, params, lang, company){
    var workbook = new excel.Workbook();

    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Sheet 1');

    // Create a reusable style
    var headerStyle = workbook.createStyle({
        font: {
            color: '#000000',
            size: 16,
            bold: true
        },
        border:{
            outline: true
        }
    });
    var paramStyle = workbook.createStyle({
        font: {
            color: '#000000',
            size: 14
        },
    });
    // Create Headers
    let headers = getExcelHeader(type)
    let global_index = [2]
    // console.log(params)
    headers.forEach((header, index) => {        
        index++
        worksheet.cell(1, index).string(validate[lang][header.name]).style(headerStyle);
        let key = header.key.split('/')
        let element_index = 2
        
        params.forEach((param_element, param_index) => {    
            if (typeof global_index[param_index] === 'undefined'){
                global_index[param_index] = element_index
            }
            if (key.length > 1) {
                if (param_element[key[0]] instanceof Array) {
                    param_element[key[0]].forEach(param => {
                        setWorkSheetCell(param[key[1]], worksheet, element_index, index, paramStyle, key[1])
                        element_index++
                    })
                }else{
                    if (param_element[key[0]] && param_element[key[0]][key[1]]){
                        setWorkSheetCell(param_element[key[0]][key[1]], worksheet, element_index, index, paramStyle, key[1])
                        element_index++
                    }
                }
            }else {
                setWorkSheetCell(param_element[header.key], worksheet, global_index[param_index], index, paramStyle, "")
                element_index++
            }
        });
    });
    
    var dir = path.join(__dirname, '/../views/frontend/files/' + company)
    if (!fs.existsSync(dir)) {
        console.log(dir)
        fs.mkdirSync(dir);
    }
    workbook.write('./views/frontend/files/' + company+'/Excel.xlsx');
    
    return workbook
}
function setWorkSheetCell(value, worksheet, index, param_index, paramStyle, key=""){
    if (value instanceof Date) {
        worksheet.cell(index, param_index).string(moment(value).format("DD-MM-YYYY h:mm:ss"))
    } else if (typeof value == 'number') {
        worksheet.cell(index, param_index).number(value).style(paramStyle);
    } else if (key.includes("formula")) {
        key = key.split(' ')
        let first = excel.getExcelCellRef(index, param_index + parseInt(key[1]))
        let second = excel.getExcelCellRef(index, param_index + parseInt(key[3]))
        worksheet.cell(index, param_index).formula(first + key[2] + second).style(paramStyle);
    }else if (value) {
        worksheet.cell(index, param_index).string(value).style(paramStyle);
    }
    return worksheet
}
function getExcelHeader(type){
    let headers = []
    if(type == "order"){
        headers = [
            {
                name: "xl_produt_name",
                key: "products/name"

            },
            {
                name: "xl_produt_price",
                key: "products/price"
            },
            {
                name: "xl_product_quantity",
                key: "products/quantity"
            },
            {
                name: "xl_product_result",
                key: "products/formula -2 * -1"
            },
            {
                name: "xl_client_name",
                key: "client_name"
            },
            {
                name: "xl_client_phone",
                key: "client_phone"
            },
            {
                name: "xl_created_at",
                key: "createdAt"
            },
            {
                name: "xl_order_notes",
                key: "notes"
            },
            {
                name: "xl_order_status",
                key: "status"
            },
        ]
    } else if (type == "product"){
        headers = [
            {
                name: "xl_produt_name",
                key: "name"

            },
            {
                name: "xl_produt_name_ru",
                key: "name_ru"

            },
            {
                name: "xl_produt_price",
                key: "price"
            },
            {
                name: "xl_product_quantity",
                key: "quantity"
            },
            {
                name: "xl_category_name",
                key: "category/name"
            },
            {
                name: "xl_product_vendorcode",
                key: "vendorCode"
            },
            {
                name: "xl_promo_name",
                key: "promo"
            },
            {
                name: "xl_promo_price",
                key: "promoPrice"
            },
            {
                name: "xl_promo_start",
                key: "promoStart"
            },
            {
                name: "xl_promo_end",
                key: "promoEnd"
            },
            {
                name: "xl_recommend",
                key: "recommend"
            },
            {
                name: "xl_created_at",
                key: "createdAt"
            },
            
        ]
    }
    return headers
}
function randomNumber(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}
function randomPassword(letterCount) {
    return Math.random().toString(36).slice(-letterCount);
}
function createQrFile(user_id, company) {
    let link = 'images/' + company + '/qr'
    let filename ='/' + user_id + '.png'
    var dir = path.join(__dirname, '/../views/frontend/')
    QRCode.toFile(dir + link + filename, user_id, {
        color: {
            dark: '#B0B0B0',  // Blue dots
            light: '#0000' // Transparent background
        },
        width: 600
    }, function (err) {
        if (err) throw err
        console.log('done')
    })
    return link + filename
}
module.exports = {
    useDB: useDB,
    saveImage: saveImage,
    sendError: sendError,
    createExcel: createExcel,
    randomNumber: randomNumber,
    randomPassword: randomPassword,
    createQrFile: createQrFile
}