const extract = require('extract-zip');
const parser = require('fast-xml-parser');
const he = require('he');
const path = require('path');
const fs = require('fs');

const options = {
    attributeNamePrefix: "@_",
    attrNodeName: "attr", //default is 'false'
    textNodeName: "#text",
    ignoreAttributes: true,
    ignoreNameSpace: false,
    allowBooleanAttributes: false,
    parseNodeValue: true,
    parseAttributeValue: false,
    trimValues: true,
    cdataTagName: "__cdata", //default is 'false'
    cdataPositionChar: "\\c",
    parseTrueNumberOnly: false,
    numParseOptions: {
        hex: true,
        leadingZeros: true,
        //skipLike: /\+[0-9]{10}/
    },
    arrayMode: false, //"strict"
    attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
    tagValueProcessor: (val, tagName) => he.decode(val), //default is a=>a
    stopNodes: ["parse-me-as-string"]
};
let company = "loygift60b7032e691787213076f378"
let directoryPath  = path.join(__dirname, '/../../views/frontend/files/' + company+'/xml');
// fs.readdir(directoryPath, function (err, files) {
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     }
//     files.forEach(function (file) {
//         console.log(file,"NAME");
//
//         // fs.readFile(`${directoryPath}/${file}`, 'utf8' , (err, data) => {
//         //     if (err) {
//         //         console.error(err)
//         //         return
//         //     }
//         //     try{
//         //         const jsonObj = parser.parse(data, options, true);
//         //         let allNodes = jsonObj["КоммерческаяИнформация"]["ПакетПредложений"]["Предложения"]["Предложение"];
//         //         for (const node of allNodes) {
//         //             console.log(node);
//         //         }
//         //     }catch(error){
//         //         console.log(error.message)
//         //     }
//         // })
//     });
// });
// async function extractZip(source, target) {
//     try {
//         await extract(source, { dir: target });
//         console.log("Extraction complete");
//     } catch (err) {
//         console.log("Oops: extractZip failed", err);
//     }
// }
//
// const unzipFiles = async function (dirPath) {
//     const files = fs.readdirSync(dirPath);
//     console.log(files,"FIELSSSS");
//     await Promise.all(
//         files.map(async (file) => {
//             if (fs.statSync(dirPath + "/" + file).isDirectory()) {
//                 await unzipFiles(dirPath + "/" + file);
//             } else {
//                 const fullFilePath = path.join(dirPath, "/", file);
//                 const folderName = file.replace(".zip", "");
//                 if (file.endsWith(".zip")) {
//                     await extractZip(fullFilePath, path.join(dirPath, "/", folderName));
//                     await unzipFiles(path.join(dirPath, "/", folderName));
//                 }
//             }
//         })
//     );
// };
// unzipFiles(directoryPath);

// function move(oldPath, newPath, callback) {
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
//         var readStream = fs.createReadStream(oldPath);
//         var writeStream = fs.createWriteStream(newPath);
//
//         readStream.on('error', callback);
//         writeStream.on('error', callback);
//         readStream.on('close', function () {
//             fs.unlink(oldPath, callback);
//         });
//         readStream.pipe(writeStream);
//     }
// }
// function saveFiles(req){
//     let dir = path.join(__dirname, '/../../views/frontend/files/' + company+'/xml/'+req.query.filename);
//     let parentDir = path.join(__dirname, '/../../views/frontend/files/' + company+'/xml/');
//     checkDir(parentDir);
//     try{
//         move(req.files.file.path,dir,function (what){
//             console.log(what,"das ist what")
//         })
//         //unzip
//         // unzipFiles(parentDir);
//     }catch (e){
//         console.log(e,"tryyyy")
//     }
// }
// function checkDir(dir){
//     if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir, {recursive: true}, err => {
//             console.log(err)
//         })
//     }
// }
// module.exports = {
//     saveFiles
// }
