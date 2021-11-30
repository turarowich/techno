/*
There 2 files
"offers0_1.xml" and "import0_1.xml"
offer contains prices, import contains categories and product's full names
each product size is a different product. In order to group same products with diff sizes
we use a common "controlName" that is used to identify groups of products
the control name is a full product's name without it's size
*/
const parser = require('fast-xml-parser');
const he = require('he');
const path = require('path');
const fs = require('fs');
const { useDB} = require('../../services/helper')
const oneCfileController = require('./oneCfileController')
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

parseXml = async function(companyName){
    // console.log("STARTED xmlParse");
    //companyName full with Loygift prefix
    let directoryPath = path.join(__dirname, '/../../views/frontend/files/' + companyName+'/xml');
    await oneCfileController.checkDir(directoryPath);
    let db = useDB(companyName)
    let Category = db.model("Category");  //for createCategory and insertProducts
    let Product = db.model("Product"); //for insertProducts
    let Settings = db.model("Settings");
    let settings = await Settings.findOne({});
    if(!Category || !Product || !settings){
        console.log("parser, company not found")
        return;
    }
    fs.readdir(directoryPath, async function (err, folders) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        for (const folder of folders) {
            let fullPath = path.join(__dirname, '/../../views/frontend/files/' + companyName+'/xml/'+folder);
            //has to be a folder
            if(fs.lstatSync(fullPath).isDirectory()){
                await fs.readdir(fullPath, async function (err, files) {
                    //has to be a file
                    if(files.length===0){
                        try {
                            fs.rmdirSync(fullPath, { recursive: true });
                            console.log(`${fullPath} is deleted@@!`);
                        } catch (err) {
                            console.error(`Error while deleting @@${fullPath}.`);
                        }
                    }
                    for (const file of files) {
                        let fullPathFile = path.join(__dirname, '/../../views/frontend/files/' + companyName + '/xml/' + folder + '/' + file);
                        if (!fs.lstatSync(fullPathFile).isDirectory()) {
                            if (file === "offers0_1.xml") { //prices
                                fs.readFile(`${fullPathFile}`, 'utf8', (err, data) => {
                                    if (err) {
                                        console.error(err)
                                        return
                                    }
                                    try {
                                        const jsonObj = parser.parse(data, options, true);
                                        let products = jsonObj["КоммерческаяИнформация"]["ПакетПредложений"]["Предложения"]["Предложение"];
                                        for (const prod of products) {
                                            let name = prod["Наименование"];
                                            let vendorCode = prod["Артикул"];
                                            let quantity = prod["Количество"];
                                            let oneCId = prod["Ид"];
                                            let price = prod["Цены"]["Цена"]["ЦенаЗаЕдиницу"];
                                            parseProductsToObjects(price,oneCId,name,vendorCode,quantity);
                                        }
                                        if(productsCatsAsObjectsArray.length !== 0 && productsAsObjectsArray.length !== 0){
                                            console.log("THIS IS 1")
                                            createProductToInsert(productsCatsAsObjectsArray, productsAsObjectsArray,settings.groupItemsOnImport || false,Product,Category,settings,companyName);
                                        }
                                    } catch (error) {
                                        console.log(error.message)
                                    }
                                })
                                await fs.unlink(fullPathFile, () => {
                                    console.log(`Deleted  ${file}`)
                                })
                            }
                            if (file === "import0_1.xml") { //category and full name
                                fs.readFile(`${fullPathFile}`, 'utf8', (err, data) => {
                                    if (err) {
                                        console.error(err)
                                        return
                                    }
                                    try {
                                        const jsonObj = parser.parse(data, options, true);
                                        let categories = jsonObj["КоммерческаяИнформация"]["Классификатор"]["Группы"] ? jsonObj["КоммерческаяИнформация"]["Классификатор"]["Группы"]["Группа"] : [];
                                        for (const cat of categories) {
                                            createCategory(cat["Наименование"], cat["Ид"],Category);
                                        }
                                        let products2 = jsonObj["КоммерческаяИнформация"]["Каталог"]["Товары"]["Товар"];
                                        for (const prod2 of products2) {
                                            let fullProductName = prod2["Наименование"];
                                            let productProperties = prod2["ЗначенияРеквизитов"]["ЗначениеРеквизита"];
                                            let catId = prod2["Группы"] ? prod2["Группы"]["Ид"] : "";
                                            let img = prod2["Картинка"] ? prod2["Картинка"] : "";
                                            for(const prop of productProperties){
                                                if(prop["Наименование"]==="Полное наименование"){
                                                    fullProductName = prop["Значение"];
                                                }
                                            }
                                            parseCatsToObjects(catId ,fullProductName,prod2["Ид"],img);
                                        }
                                        if(productsCatsAsObjectsArray.length !== 0 && productsAsObjectsArray.length !== 0){
                                            console.log("THIS IS 2")
                                            createProductToInsert(productsCatsAsObjectsArray, productsAsObjectsArray,settings.groupItemsOnImport || false,Product,Category,settings,companyName);
                                        }
                                        // insertProducts(Product,Category,settings);
                                    } catch (error) {
                                        console.log(error.message)
                                    }
                                })
                                await fs.unlink(fullPathFile, () => {
                                    console.log(`Deleted  ${file}`)
                                })
                            }
                            //
                        } else {
                            if (file === "import_files") {
                                await moveImage(fullPathFile, companyName)
                                try {
                                    fs.rmdirSync(fullPathFile, { recursive: true });
                                    console.log(`${fullPathFile} is deleted@k@!`);
                                } catch (err) {
                                    console.error(`Error while deleting @k@${fullPath}.`);
                                }
                            }
                        }
                    }
                })
            }
        }
    });
    //
}

const moveImage = async function(imgPath,companyName){
    let imagesDirectory = path.join(__dirname, '/../../views/frontend/files/' + companyName+'/xml/images/');
    await oneCfileController.checkDir(imagesDirectory);
    const files = fs.readdirSync(imgPath);
    for(const image of files){
        if (fs.lstatSync(imgPath + "/" + image).isDirectory()) {
            await moveImage(imgPath + "/" + image,companyName);
        } else {
            //file image
            fs.rename(imgPath + "/" + image, imagesDirectory+image, ()=>{
                console.log("Mooving");
            })
        }
    }
}
let productsArray = [];
let productsCatsAsObjectsArray = [];
let productsAsObjectsArray = [];

const parseVendorCode = function(fullName){
    let res={
        found:false,
        controlName:fullName,
        size:"",
    }
    //const pattern = new RegExp(/\([0-9]+\)/); // looking for (number) anywhere in the string
    const pattern = new RegExp(/\(.*?\)/); // looking for (anything) anywhere in the string
    const found = fullName.match(pattern);
    if(found){
        res.found = true;
        res.size = found[0];
        res.controlName = fullName.replace(res.size,"").replace(/ +(?= )/g,'').trim();
    }
    return res;
}

parseCatsToObjects = async function(category1cId,productFullName,product1cId,img){
    let temp = {
        category1cId,
        productFullName,
        product1cId,
        img
    }
    productsCatsAsObjectsArray.push(temp);
}

parseProductsToObjects =  function(productPrice,product1cId,productName,productVendorCode,quantity){
    let temp = {
        productPrice,
        product1cId,
        productName,
        productVendorCode,
        quantity,
    }
    productsAsObjectsArray.push(temp);
}

createProductToInsert = async function (productWithCategories,productWithPrices,groupItems,Product,Category,settings,companyName){
    //match products and categories
    productWithCategories.forEach(productsCatsArrayItem=>{
        let index = productWithPrices.findIndex(x => x.product1cId === productsCatsArrayItem.product1cId);
        if(index !== -1){
            //if product has a price
            let category1cId =productsCatsArrayItem.category1cId;
            let name = productsCatsArrayItem.productFullName;
            let product1cId = productsCatsArrayItem.product1cId;
            let img = productsCatsArrayItem.img;
            let vendorCode = productWithPrices[index].productVendorCode;
            let quantity = productWithPrices[index].quantity;
            let price = productWithPrices[index].productPrice;
            createProduct({name, vendorCode, quantity, product1cId, price,category1cId,img},groupItems);
        }
    })

    await insertProducts(Product, Category, settings,companyName);
}
createProduct = async function(product,groupItems){
    try {
        let temp = {
            controlName:"",
            sizes:[]
        }
        let commonPrice = 0;
        let totalQuantity = 0;
        let sizePrice = {};
        let controlName = product.name; //name without size;
        let parseName =  parseVendorCode(product.name);
        if(parseName.found && groupItems){ //found size
            //found match
            let size = parseName.size;
            controlName = parseName.controlName;
            sizePrice.size=size.replace(/[()]/g, "");
            sizePrice.price=product.price;
            sizePrice.oneCId=product.oneCId;
            sizePrice.vendorCode=product.vendorCode;
            sizePrice.quantity=product.quantity;
        }else{
            commonPrice = product.price;
            totalQuantity = product.quantity;
            console.log(product.name,"NOpe")
        }

        temp.category1cId = product.category1cId;
        temp.controlName = controlName;
        temp.name = controlName;
        if(sizePrice.hasOwnProperty("size")) {
            temp.sizes.push(sizePrice);
        }
        temp.commonPrice = commonPrice;
        temp.totalQuantity = totalQuantity;
        temp.oneCId = product.oneCId;
        temp.vendorCode=product.vendorCode;
        temp.img = product.img;
        if(productsArray.length>0){
            let index = productsArray.findIndex(x => x.controlName === controlName);
            if(index!==-1){
                if(sizePrice.hasOwnProperty("size")){
                    productsArray[index].sizes.push(sizePrice);
                }
            }else{
                if(controlName.length>0){
                    productsArray.push(temp);
                }
            }
        }else{
            if(controlName.length>0){
                productsArray.push(temp);
            }
        }
    } catch (error) {
        console.log(error,"errr6767676767")
    }
}

//files/loygift60b7032e691787213076f378/xml/images/40345a222cd111ec80b8acd5646f4828_40345a292cd111ec80b8acd5646f4828.png
insertProducts = async function(Product,Category,settings,companyName){
    if(settings.removeGhostsOnImport){
        let oldNamesNotFoundInNew = checkOldProducts(await Product.find({}),productsArray);
        if(oldNamesNotFoundInNew.length>0){
            //delete old items that are not found in new import
            await Product.deleteMany({controlName:{$in:oldNamesNotFoundInNew}});
        }
    }

    for(const pro of productsArray){
        //check if all sizes have same price
        let sum = 0;
        let commonPrice = 0;
        let totalQuantity = 0;
        let hasMultipleTypes = false;
        if(pro.sizes.length>0){
            hasMultipleTypes = true;
            let maxPrice = 0;
            pro.sizes.forEach(ie=>{
                maxPrice = ie.price>maxPrice ? ie.price:maxPrice;
                sum+=ie.price;
                totalQuantity+=ie.quantity;
            })
            if((sum/pro.sizes.length)==pro.sizes[0].price){
                commonPrice = pro.sizes[0].price
            }else{
                //if size prices are different set max price;
                console.log("DIFFS",pro.controlName)
                commonPrice = maxPrice;
            }
        }else{
            totalQuantity = pro.totalQuantity;
            commonPrice = pro.commonPrice;
        }
        let productCheck = await Product.findOne({controlName:pro.controlName});
        let cat = await Category.findOne({ 'oneCId': pro.category1cId });

        let imgFull = getImgFullPath(pro.img,companyName);
        if(!productCheck){
            try {
                let newProduct = await new Product({
                    type:pro.type || "product",
                    name: pro.controlName,
                    controlName: pro.controlName,
                    price:commonPrice,
                    quantity:totalQuantity,
                    sizes:pro.sizes,
                    oneCId:pro.oneCId,
                    category:cat,
                    vendorCode:pro.vendorCode || "",
                    hasMultipleTypes:hasMultipleTypes,
                    //img:imgFull,
                    // imgArray:[imgFull],
                });
                if(imgFull.length>0){
                    newProduct.imgArray = [imgFull];
                }
                await newProduct.validate()
                await newProduct.save()
            }catch (e){
                console.log(e);
                console.log(pro);
            }
        }else{
            //update
            //fully update ignoring all changes/except for images
            //fully update images ignore images that were uploaded through CRM
            productCheck.price = commonPrice;
            productCheck.quantity = totalQuantity;
            productCheck.sizes = pro.sizes;
            productCheck.category = cat;
            if(!settings.ignoreImagesOnImport && imgFull.length>0){
                // productCheck.img = imgFull;
                productCheck.imgArray =[imgFull];
            }
            productCheck.save();
        }
    }
}

createCategory = async function(name,oneCId,type="product",Category){
    try {
        let catCheck = await Category.find({oneCId:oneCId});
        if(catCheck.length===0){
            await new Category({
                oneCId,
                name,
                type,
            }).save();
        }
    } catch (error) {
        console.log(error)
    }
}

getImgFullPath = function(imgNamesArray = [],companyName){
    let fullImgPath = "";
    let imgUrl = `files/${companyName}/xml/images/`;
    let imgName = "";
    if(imgNamesArray.length===0){
        return fullImgPath;
    }
    imgName = imgNamesArray[0];
    if(imgName.length>0){
        let name = imgName.split('/')[imgName.split('/').length-1];
        fullImgPath = imgUrl + name;
    }
    return fullImgPath;
}
checkOldProducts = function (oldProducts=[],newProducts=[]){
    let oldNames = oldProducts.map(function (item){
        return item.name;
    })
    let newNames = newProducts.map(function (item){
        return item.name;
    })
    return oldNames.filter(x => newNames.indexOf(x) === -1);// old items not found in a new import
}
//unused function
// updateProduct = async function(shortName,category,fullName){
//     let fullNameWithoutSize = parseVendorCode(fullName);
//     let parsedCode =  parseVendorCode(shortName);
//     let query = { "controlName": parsedCode.controlName };
//     let query2 = { 'oneCId': category };
//     let prod = await Product.findOne(query);
//     let cat = await Category.findOne(query2);
//     if(cat && prod){
//         prod.category = cat;
//         prod.name = fullNameWithoutSize.controlName;
//         prod.save();
//     }
// }
// parseXml("loygift60b7032e691787213076f378");

module.exports = {
    parseXml
}
