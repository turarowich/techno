//
// export default {
//     actions:{
//         getCategories:async function(ctx){
//             await this.axios.get('http://localhost:8080/api/getCategories')
//                 .then((res)=>{
//                     ctx.commit('updateCategory', res.data.objects)
//                 })
//         },
//         addCategory: async function( ctx, data){
//             await this.axios.post('http://localhost:8080/api/addCategory',data)
//                 .then((response)=>{
//                     console.log('Success ', response.data.object)
//                     console.log(ctx)
//
//                 })
//                 .catch((error)=>{
//                     console.log("Error"+error)
//                 })
//         },
//
//
//     },
//     state () {
//         return {
//             listCategory:[
//                 {id:1, name:''},
//             ],
//             catalog:[
//                 {id:1, name:'Air Forces ', code:'1617W11F', price:23, category:'shoes',image: [
//                         'https://n.nordstrommedia.com/id/sr3/6766217f-3a04-4af3-8e89-82f05bc4d1f3.jpeg?crop=pad&pad_color=FFF&format=jpeg&trim=color&trimcolor=FFF&w=780&h=838',
//                         'https://n2.sdlcdn.com/imgs/h/m/c/large/Nike-AIR-FORCE-1-White-SDL968002180-1-a6803.jpeg',
//                         'https://www.cdiscount.com/pdt2/9/6/2/1/700x700/mp29694962/rw/baskets-casual-pour-hommes-de-la-mode-hiver.jpg',
//                         'https://kickz.akamaized.net/se/media/images/p/600/nike-air_force_1_07-WHITE_WHITE-1.jpg',
//                         'https://www.babyshop.com/images/489630/open_graph.jpg',
//                         'https://img01.ztat.net/article/spp-media-p1/d9f1aedd837939cc95686168fa2ba2e0/4c173933bbc841c9b1106071a3fdde9e.jpg?imwidth=762&filter=packshot'
//                     ]},
//                 {id:2, name:'Nike Air Max', code:'1617W11F', price:467,category:'shoes',image:  [
//                         'https://suprehero.kg/wp-content/uploads/2021/02/nike-air-max-270-react-travis-scott-2-1000.png',
//                         'https://static-sl.insales.ru/images/products/1/528/364225040/Travis_Scott_x_Nike_Air_Max_270_React_%D0%BA%D1%83%D0%BF%D0%B8%D1%82%D1%8C_-.jpg',
//                         'https://step-man.com/wp-content/uploads/2020/05/Travis-Scott-x-Nike-Air-Max-270-React-Cactus-Trails-for-sale.jpg',
//                         'https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2020%2F03%2Ftravis-scott-nike-air-max-270-react-release-date-ct2864-200-info-001.jpg',
//                         'https://i.pinimg.com/originals/45/5c/ae/455cae7b1f3255eeedc6e1bebbba7857.png'
//
//                     ]},
//                 {id:3, name:'Macks', code:'1617W11F', price:12,category:'clothes',image:  [
//                         'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
//                         'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2',
//                         'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
//                         'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2',
//                         'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
//                         'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
//                         'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2'
//                     ]},
//                 {id:4, name:'Alexander msqween', code:'1617W11F', price:15,category:'clothes',image: [
//                         'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2',
//                         'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
//                         'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
//                         'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2',
//                         'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
//                         'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
//                         'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2'
//                     ]},
//                 {id:5, name:'T-shirt', code:'1617W11F', price:456,category:'clothes',image:  [
//                         'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
//                         'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
//                         'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
//                         'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2',
//                         'https://cdn.shopify.com/s/files/1/2143/3217/products/500_946a22ef-e740-40ad-8c96-ba7e6ca15f87_1024x1024.png?v=1617646131',
//                         'https://accessories.tvsmotor.com/images/premium-acc/T-shirts-Red-1.jpg',
//                         'https://cdn11.bigcommerce.com/s-405b0/images/stencil/500x659/products/71/16784/5000-gildan-heavy-cotton-t-shirt-white-t-shirt.ca__76325.1605526691.jpg?c=2'
//                     ] },
//             ],
//             productDetail: ''
//         }
//     },
//     mutations:{
//         updateCategory:(state, listCategory)=>{
//             state.listCategory = listCategory
//             state.listCategory.unshift({id:1, name:''})
//         },
//         productDetail(state) {
//             const detail = JSON.parse(localStorage.getItem('detail'))
//             state.productDetail = detail
//
//         }
//     },
//     getters:{
//         listCategory(state){
//             return state.listCategory
//         },
//         catalog(state){
//             return state.catalog
//         },
//         productDetail(state){
//             return state.productDetail
//         }
//     }
// }