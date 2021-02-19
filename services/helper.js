var path = require('path')
const fs = require('fs')

function useDB(db_name) {
    let db = global.userConnection.useDb(db_name);
    return db;
}

function saveImage(file, company, old_file_name=null){
    let filename = company + '/' + Math.random().toString().substr(2, 8) + file.name
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
    var upload = path.join(__dirname, '/../views/frontend/images/' + filename)
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
module.exports = {
    useDB: useDB,
    saveImage: saveImage
}