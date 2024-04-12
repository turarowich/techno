const axios = require('axios');
const postUrl = 'https://joinposter.com/api'
const { useDB, randomNumber } = require('../../services/helper')
let baseUrl = `https://joinposter.com`;
const fs = require("fs");
const path = require("path")
const { HttpsProxyAgent } = require('https-proxy-agent');
const proxy = 'http://117.250.3.58:8080';
const agent = new HttpsProxyAgent(proxy);

async function downloadImage(url, filename, db) {
  try {
      const response = await axios({
          method: 'GET',
          url: url,
          responseType: 'stream',
          httpsAgent: agent // Добавление агента в запрос
      });
      const imageName = path.basename(filename);
      const dbL = db
      const savePath = path.join(__dirname, '..', '..', 'views','frontend','images', dbL, imageName);
      const writer = fs.createWriteStream(savePath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
          writer.on('finish', resolve);
          writer.on('error', reject);
      });
  } catch (error) {
      throw new Error(`Error downloading image: ${error.message}`);
  }
}
async function callAPI(href) {
  let response = await axios({
    url: href,
    method: "get",
    params: {
      limit: 500,
    },
    headers: {
      "Content-Type": "application/json",
      "Accept-Encoding": "gzip",
    },
    httpsAgent: agent
  }).catch((error) => {
    console.log(
      error,
      "Call Api error"
    );
    return { error: error };
  });
  return response
}

class PosterPosController {
  getProductPoster = async function (req, res) {
    try {
      let db = useDB(req.db)
      let Product = db.model("Product");
      let Settings = db.model("Settings");
      let settings = await Settings.find();
      let tokenPP = settings[0].tokenPosterPos ? settings[0].tokenPosterPos : ""
      let fetchFromPoster = await callAPI(`${postUrl}/menu.getProducts?token=${tokenPP}`);
      let data = fetchFromPoster.data.response
      for (const product of data) {
        // downloadImage(baseUrl + product["photo_origin"], product["photo_origin"], req.db)
        // .then(savedFilename => {
        //   console.log(`Изображение успешно загружено и сохранено как ${savedFilename}.`);
        // })
        // .catch(error => {
        //     console.error('Ошибка при загрузке и сохранении изображения:', error);
        // });
        // let imageName = path.basename(product["photo_origin"]);
        let imageName = product["photo_origin"] ? product["photo_origin"].split('/').pop() : product["product_id"]
        let imgPath = "images/"+req.db+"/products/"+imageName;

        let oldProduct = await Product.findOne({ post_id: product["product_id"] });
        if (!oldProduct) {
          let newProduct = new Product({
            post_id: product["product_id"] ? product["product_id"] : "",
            name: product["product_name"] ? product["product_name"]: "",
            price: product['price']['1'] ? product['price']['1'] / 100: "",
            vendorCode: product['product_code'] ? product['product_code'] : "",
            description: product['product_production_description'] ? product['product_production_description']: "",
            quantity: product['unit'] ? product['unit'] : 20,
            img: imgPath ? imgPath : null,
          });
          await newProduct.save();
        } else {
          oldProduct.post_id = product["product_id"] ? product["product_id"] : "",
          oldProduct.name = product["product_name"] ? product["product_name"]: "",
          oldProduct.price = product['price']['1'] ? product['price']['1'] / 100: "",
          oldProduct.vendorCode = product['product_code'] ? product['product_code'] : "",
          oldProduct.description = product['product_production_description'] ? product['product_production_description']: "",
          oldProduct.quantity = product['unit'] ? product['unit'] : 20,
          oldProduct.img = imgPath ? imgPath : null
          await oldProduct.save();
        }
      }
      let result = {msg:`count data dowload ${data.length}`
      
    }
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  getCategoryPoster = async function (req, res) {
    try {
      let db = useDB(req.db)
      let Category = db.model("Category");
      let Settings = db.model("Settings");
      let settings = await Settings.find();
      let tokenPP = settings[0].tokenPosterPos ? settings[0].tokenPosterPos : ""
      let fetchFromPoster = await callAPI(`${postUrl}/menu.getCategories?token=${tokenPP}`);
      let data = fetchFromPoster.data.response
      for (const category of data) {
        let oldCategory = await Category.findOne({ post_id: category["category_id"] });
        if (!oldCategory) {
          let newCategory = new Category({
            post_id: category["category_id"] ? category["category_id"] : "",
            name: category["category_name"] ? category["category_name"]: "",
          });
          await newCategory.save();
        } else {
          oldCategory.name = category["category_name"] ? category["category_name"]: ""
          oldCategory.save()
        }
      }
      let result = {msg:`count data dowload ${data.length}`
    }
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
  getCheckPoster = async function (req, res) {
    try {
      let db = useDB(req.db)
      let Order = db.model("Order");
      let Settings = db.model("Settings");
      let Product = db.model("Product");
      let OrderProduct = db.model("OrderProduct");
      let settings = await Settings.find();
      let tokenPP = settings[0].tokenPosterPos ? settings[0].tokenPosterPos : ""
      let fetchFromPoster = await callAPI(`${postUrl}/dash.getTransactions?token=${tokenPP}`);
      let data = fetchFromPoster.data.response
      let updatedCount = 0;
  
      for (const check of data) {
        let oldCheck = await Order.findOne({ post_id: check["transaction_id"] });
        // get product for check
        let fetchProductPoster = await callAPI(`${postUrl}/dash.getTransactionProducts?token=${tokenPP}&transaction_id=${check['transaction_id']}`);
        let fetchProduct = fetchProductPoster.data.response
        // get product for check
        if (!oldCheck) {
          let order = await new Order({
            code: randomNumber(100000, 10000000),
            totalPrice:  check['sum'] / 100,
            post_id: check['transaction_id'],
            status: check['date_close'] == 0 ? 'In Progress' : 'Done',
            point: 0,
            notes: check['transaction_comment']? check['transaction_comment'] : ''
          });
          for (let i = 0; i < fetchProduct.length; i++) {
            let product = fetchProduct[i];
            let search_product = await Product.findOne({ post_id: product["product_id"] })
            if (!search_product) {
              break
            }
            let order_product = await new OrderProduct({
              name: search_product.name,
              img: search_product.img,
              price: search_product.price,
              quantity: 1,
            }).save();
            order.products.push(order_product._id);
          }
          await order.save();
        } else {
          oldCheck.totalPrice =  check['sum'] ? check['sum'] / 100 : 0,
          oldCheck.status = check['date_close'] == 0 ? 'In Progress' : 'Done',
          oldCheck.point = 0,
          oldCheck.notes = check['transaction_comment']? check['transaction_comment'] : ''
          for (let i = 0; i < fetchProduct.length; i++) {
            let product = fetchProduct[i];
            let search_product = await Product.findOne({ post_id: product["product_id"] })
            if (!search_product) {
              break
            }
            let order_product = await new OrderProduct({
              name: search_product.name  ? search_product.name: "",
              img: search_product.img  ? search_product.img: "",
              price: search_product.price  ? search_product.price: "",
              quantity: 1,
            }).save();
            oldCheck.products.push(order_product._id);
          }
          await oldCheck.save();
          updatedCount++;
        }
      }
      let result = { msg: `Count data download ${data.length}. Updated ${updatedCount} records.` };
      res.send(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new PosterPosController();
