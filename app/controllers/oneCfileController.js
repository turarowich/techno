const path = require('path');
const fs = require('fs');
let company = "loygift60b7032e691787213076f378";
async function extractZip(source, target) {
    try {
        await extract(source, { dir: target });
        console.log("Extraction complete");
    } catch (err) {
        console.log("Oops: extractZip failed", err);
    }
}
const unzipFiles = async function (dirPath) {
    const files = fs.readdirSync(dirPath);
    console.log(files,"Files");
    await Promise.all(
        files.map(async (file) => {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                await unzipFiles(dirPath + "/" + file);
            } else {
                const fullFilePath = path.join(dirPath, "/", file);
                const folderName = file.replace(".zip", "");
                if (file.endsWith(".zip")) {
                    await extractZip(fullFilePath, path.join(dirPath, "/", folderName));
                    await unzipFiles(path.join(dirPath, "/", folderName));
                }
            }
        })
    );
};

function move(oldPath, newPath, callback) {
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                callback(err);
            }
            return;
        }
        callback();
    });
    function copy() {
        const readStream = fs.createReadStream(oldPath);
        const writeStream = fs.createWriteStream(newPath);
        readStream.on('error', callback);
        writeStream.on('error', callback);
        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });
        readStream.pipe(writeStream);
    }
}
function saveFiles(req){
    let dir = path.join(__dirname, '/../../views/frontend/files/' + company+'/xml/'+req.query.filename);
    let parentDir = path.join(__dirname, '/../../views/frontend/files/' + company+'/xml/');
    checkDir(parentDir);
    try{
        move(req.files.file.path,dir,function (what){
            console.log(what,"das ist what")
        })
        //unzip
    }catch (e){
        console.log(e,"tryyyy")
    }
}
function checkDir(dir){
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true}, err => {
            console.log(err)
        })
    }
}
module.exports = {
    saveFiles
}