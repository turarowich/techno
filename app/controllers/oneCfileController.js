const extract = require('extract-zip');
const path = require('path');
const fs = require('fs');
async function check1cAuth(req, res) {
    try {
        console.log("CHECK AUTH TRY");
        let users = global.userConnection.useDb('loygift').model("User");
        let basicAuth = req.headers.authorization.split(" ")[1];
        let buff = new Buffer(basicAuth, 'base64');
        let credentials = buff.toString('ascii').split(":");
        let login = credentials[0];
        let password = credentials[1];
        if (req.query.type === "catalog" && req.query.mode === "checkauth") {
            let cook = "cook";
            let cookies = "cookies";
            return res.status(200).send(`success\r\n${cook}\r\n${cookies}`);
        } else if (req.query.type === "catalog" && req.query.mode === "init") {
            return res.status(200).send(`zip=yes\r\nfile_limit=5000000`);
        } else if (req.query.type === "catalog" && req.query.mode === "file") {
            let user = await users.findOne({oneCApiLogin: login, oneCApiPassword: password});
            console.log(user,"USER",login,password);
            if (!user) {
                return;
            }
            let dbName = "loygift" + user._id;
            let directoryPath = path.join(__dirname, '/../../views/frontend/files/' + dbName + '/xml');
            // let dbName = "loygift60b7032e691787213076f378";
            console.log(directoryPath,"directoryPath");
            let result = await saveFiles(req, dbName, directoryPath);
            if(result.status == 200){
                return res.status(200);
            }else{
                return res.status(500);
            }
        }
    } catch (e) {
        console.log(e, "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR")
    }
}

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
    await Promise.all(
        files.map(async (file) => {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                await unzipFiles(dirPath + "/" + file);
            } else {
                const fullFilePath = path.join(dirPath, "/", file);
                const folderName = file.replace(".zip", "");
                if (file.endsWith(".zip")) {
                    await extractZip(fullFilePath, path.join(dirPath, "/", folderName));
                    await fs.unlink(fullFilePath, ()=>{
                        console.log(`Deleted ${file}`)
                    })
                    await unzipFiles(path.join(dirPath, "/", folderName));
                }
            }
        })
    );
};


const move = function (oldPath, newPath) {
    return new Promise((resolve, reject) => {
        fs.rename(oldPath, newPath, function (err) {
            if (err) {
                if (err.code === 'EXDEV') {
                    copy();
                } else {
                    reject(err);
                }
                return;
            }
            resolve();
        });

        function copy() {
            const readStream = fs.createReadStream(oldPath);
            const writeStream = fs.createWriteStream(newPath);
            readStream.on('error', reject);
            writeStream.on('error', reject);
            readStream.on('close', function () {
                fs.unlink(oldPath, resolve);
            });
            readStream.pipe(writeStream);
        }
    });
}

// const move = function (oldPath, newPath, callback) {
//     fs.rename(oldPath, newPath, function (err) {
//         if (err) {
//             if (err.code === 'EXDEV') {
//                 copy();
//             } else {
//                 callback(err);
//             }
//             return;
//         }
//         callback();
//     });
//     function copy() {
//         const readStream = fs.createReadStream(oldPath);
//         const writeStream = fs.createWriteStream(newPath);
//         readStream.on('error', callback);
//         writeStream.on('error', callback);
//         readStream.on('close', function () {
//             fs.unlink(oldPath, callback);
//         });
//         readStream.pipe(writeStream);
//     }
// }


async function deleteChildrenOfDirectory(parentDirPath) {
    /**
     * Deletes all children (files and subfolders) of a given directory.
     * @param {string} parentDirPath - The path of the parent directory.
     * @returns {Promise<void>} - A Promise that resolves once all children are deleted.
     */
    try {
        const contents = await fs.promises.readdir(parentDirPath);

        await Promise.all(contents.map(async (item) => {
            const itemPath = path.join(parentDirPath, item);
            const itemStats = await fs.promises.stat(itemPath);

            if (itemStats.isDirectory()) {
                // Recursively delete subdirectory and its contents
                await deleteChildrenOfDirectory(itemPath);
            } else {
                // Delete file
                await fs.promises.unlink(itemPath);
            }
        }));

        console.log(`Children of '${parentDirPath}' have been deleted.`);
    } catch (error) {
        console.error('Error while deleting children:', error.message);
    }
}



async function saveFiles(req,dbName,directoryPath){
    console.log("STARTED SAVING FILES")
    let dir = path.join(__dirname, '/../../views/frontend/files/' + dbName+'/xml/'+req.query.filename);
    let parentDir = path.join(__dirname, '/../../views/frontend/files/' + dbName+'/xml/');
    await checkDir(parentDir);

    try{
        await deleteChildrenOfDirectory(parentDir);
        console.log("1 CLEARED");
        await move(req.files.file.path, dir);
        console.log("2 MOVED");
        await unzipFiles(directoryPath);
        console.log("2 UNZIPPED");
        // move(req.files.file.path,dir,function (what){
        //     unzipFiles(directoryPath);
        // })

        return {
            status: 200,
            message: 'Files saved successfully.',
        };
        
    }catch (e){
        console.log(e,"tryyyy");
        return {
            status: 500,
            message: 'Server error.',
        };

    }
}

async function checkDir(dir){
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true}, err => {
            console.log(err)
        })
    }
}
module.exports = {
    saveFiles,
    move,
    checkDir,
    check1cAuth,
}