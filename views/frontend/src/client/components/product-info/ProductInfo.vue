<template>
<div>
  <h2 class="order-title">Order 235523</h2>
  <p class="order-date">4 april 2021</p>
  <div class="row">
   <div class="col-10 m-auto">
     <div class="row">
       <div class="col-lg-6">
         <div class="info-order">
            <h3 class="info-title">Information about order</h3>
             <p class="info-text">We will call you within an hour to clarify the details of the order</p>
           <div class="line"></div>

           <div class="order-status d-flex justify-content-between">
             <span class="info-heading">Order status</span>
              <div class="pr-3">
                <span style="color:#616CF5">Awaiting payment</span>
              </div>
           </div>

           <div class="d-flex justify-content-between">
             <span class="info-heading">Method of obtaining</span>
             <div>
               <p class="pick-up">Pick-up service</p>
               <span style="color:#8C94A5">Bishkek, Ahunbaeva st.<br>
               Mn-Fr 08:00 - 19:00
               </span>
             </div>
           </div>
         </div>
       </div>
       <div class="col-lg-6">

         <div class="basket-hover">
           <div class="basket-header">
             <h5>Your order</h5>
           </div>
           <div class="line"></div>
           <div class="scroll-basket">
             <div class="order-item d-flex align-items-start">
               <div style="width:20%" class="basket-img">
                 <img src="../../../assets/clients/shirt.svg">
               </div>
               <div style="width:60%">
                 <h3 class="basket-title">Nike air max</h3>
                 <span class="basket-code">1617W11F</span>
               </div>
               <div class="basket-price " style="width:20%">50 $</div>
             </div>
             <div class="order-item d-flex align-items-start">
               <div style="width:20%" class="basket-img">
                 <img src="../../../assets/clients/shirt.svg">
               </div>
               <div style="width:60%">
                 <h3 class="basket-title">Nike air max</h3>
                 <span class="basket-code">1617W11F</span>
               </div>
               <div class="basket-price " style="width:20%">50 $</div>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
  </div>
</div>
</template>

<script>
export default {
  name: "ProductInfo"
}
</script>

<style scoped>
.order-item{
  border-bottom: 1px solid #F4F4F4;
  margin-bottom: 20px;
}
.order-title{
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  margin-top: 39px;
}
.order-date{
  color:#999;
  text-align: center;
  font-size: 16px;
  margin-bottom: 47px;
}
.info-order{
  width: 80%;
}
.info-title{
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}
.info-text{
  color:#999999;
  text-align: center;
  margin-bottom: 24px;
}
.order-status{
  margin-bottom: 50px;
}
.info-heading{
  color:#8C94A5;
  font-weight: normal;
}
.pick-up{
  margin-bottom: 8px;
}
.basket-hover{
  width: 80%;
  border-radius: 10px;
  padding: 20px;
  padding-bottom:24px;
  background: #FCFCFF;



}


.basket-header{
  padding-bottom:10px;
}
.basket-header h5{
  color:#222;
  font-weight: 600;
  font-size: 20px;
}
.basket-img{
  height:60px;
  margin-right: 20px;
  margin-bottom: 10px;
}
.basket-img img{
  width: 100%;
  height: 100%;
}
.basket-title{
  font-size:16px;
  font-weight: normal;
  margin-bottom: 4px;
}
.basket-code{
  color: #B0B0B0;
}
.basket-price{
  font-size: 18px;
  font-weight: normal;
  padding-top: 10px;
}
.scroll-basket{
  height: 250px;
  overflow-y: auto;
}
</style>