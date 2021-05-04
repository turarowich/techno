<template>
<div class="edit-client">
  <div class="container my-container ">
    <div class="edit-header d-flex justify-content-between align-items-center">
      <div class="edit-header-left d-flex align-items-center">
        <div class="d-flex align-items-center edit-header-item">
          <img class="edit-img" src="../../assets/icons/editUserAvatar.svg">
          <div>
            <h3 class="edit-name">Tomas Levins</h3>
            <div class="edit-category">Category: <span> Vip</span></div>
            <span class="edit-user" data-toggle="modal" data-target="#edit-client">Edit user</span>
          </div>
        </div>


      </div>

      <div class="edit-header-right d-flex align-items-center">
        <div class="selects">
          <select class=" form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
            <option>discount 5%</option>
            <option>discount 80%</option>
            <option>discount 100%</option>
            <option>discount 15%</option>
          </select>
        </div>
        <div class="d-flex align-items-center" data-toggle="modal" data-target="#send-push"><img src="../../assets/icons/roundPlus.svg"><span>Send push</span></div>
        <div class="d-flex align-items-center" data-toggle="modal" data-target="#add-points"><img src="../../assets/icons/roundPlus.svg"><span>Add points</span></div>
        <div class="d-flex align-items-center" data-toggle="modal" data-target="#remove-points"><img src="../../assets/icons/roundMinus.svg"><span>Remove points</span></div>
      </div>
    </div>

    <div class="line"></div>

    <EditClient/>
    <AddPoints/>
    <RemovePoints/>
    <SendPush/>
<!-------------------------End of Header --------------------------------------- - -->

    <div class="row client-number-row">
      <div class="col-lg-2 client-number-box">
        <span class="client-number-label">Points</span>
        <h5 class="client-number" style="color:#616cf5">100</h5>
      </div>
      <div class="col-lg-2 client-number-box">
        <span class="client-number-label">Paid by points</span>
        <h5 class="client-number">100</h5>
      </div>
      <div class="col-lg-2 client-number-box">
        <span class="client-number-label">Total of paid</span>
        <h5 class="client-number">52900</h5>
      </div>
      <div class="col-lg-2 client-number-box">
        <span class="client-number-label">Remaining points</span>
        <h5 class="client-number">10</h5>
      </div>


    </div>



    <div class="d-flex align-items-center nav-buttons justify-content-between">
      <ul class="nav nav-tabs">
        <li>
          <a  class="disable-underline"  data-toggle="tab" href="#menu1">
            <div class="order-tab d-flex align-items-center mr-4">
              <h2 class="history-title">Purchase history</h2>
            </div>
          </a>
        </li>
        <li>
          <a class="disable-underline" data-toggle="tab" href="#bonuses">
            <div data-toggle="tab" class="order-tab d-flex align-items-center">
              <h2 class="history-title">Bonuses</h2>
            </div>
          </a>
        </li>
      </ul>
      <button class="app-buttons-item" ><img src="../../assets/icons/yesterday.svg">12-03-1998</button>

    </div>

    <div class="tab-content">
      <div id="menu1" class="tab-pane fade">
        <div class="d-flex main-content-header">
          <div class="table-head" style="width: 45%;">Order name</div>
          <div class="table-head table-link" style="width: 25%;">Date<img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
          <div class="table-head " style="width: 25%;" >Total </div>
          <div class="table-head " style="width: 5%;" ></div>
        </div>

        <div class="table-content">
<!--          <div class="text-center mt-5">-->
<!--              <img src="../../assets/clients/box.png">-->
<!--              <h3 class="cashback-sub-title">Still empty</h3>-->
<!--              <p class="client-paragraph">Information about your orders will be stored here</p>-->
<!--            </div>-->
          <div class="table-item d-flex align-items-center">
              <div style="width:45%" class="d-flex align-items-center">
                <div class="table-img">
                  <img src="../../assets/img/sneak.webp">
                </div>
             235534
              </div>
              <div style="width:25%"> 04.04.2021</div>
              <div style="width:25%">500$</div>
              <div style="width:5%;" class="detail" @click="$router.push('/order-detail')">details</div>

            </div>



          </div>



      </div>
      <div id="bonuses" class="tab-pane fade">
        <div class="d-flex main-content-header">
          <div class="table-head" style="width: 40%;">Name</div>
          <div class="table-head table-link" style="width: 20%;">Date<img class="date-pol" style="margin-left:10px" src="../../assets/icons/polygon.svg"></div>
          <div class="table-head " style="width: 30%;" >Notes </div>
          <div class="table-head " style="width: 10%;" >Quantity </div>

        </div>

        <div class="table-content">
          <!--          <div class="text-center mt-5">-->
          <!--              <img src="../../assets/clients/box.png">-->
          <!--              <h3 class="cashback-sub-title">Still empty</h3>-->
          <!--              <p class="client-paragraph">Information about your orders will be stored here</p>-->
          <!--            </div>-->
          <div class="table-item d-flex align-items-center">
            <div style="width:40%" class="d-flex align-items-center">
              <div class="table-img">
                <img src="../../assets/img/sneak.webp">
              </div>
              Initial points
            </div>
            <div style="width:20%"> 04.04.2021</div>
            <div style="width:30%" class="pr-3">Please, can you do it quickly?</div>
            <div style="width:10%">100P</div>

          </div>
          <div class="table-item d-flex align-items-center">
            <div style="width:40%" class="d-flex align-items-center">
              <div class="table-img">
                <img src="../../assets/img/sneak.webp">
              </div>
              Initial points
            </div>
            <div style="width:20%"> 04.04.2021</div>
            <div style="width:30%" class="pr-3">Please, can you do it quickly?</div>
            <div style="width:10%">100P</div>

          </div>
          <div class="table-item d-flex align-items-center">
            <div style="width:40%" class="d-flex align-items-center">
              <div class="table-img">
                <img src="../../assets/img/sneak.webp">
              </div>
              Initial points
            </div>
            <div style="width:20%"> 04.04.2021</div>
            <div style="width:30%" class="pr-3">Please, can you do it quickly?</div>
            <div style="width:10%">100P</div>

          </div>



        </div>
      </div>
    </div>



  </div>
</div>
</template>

<script>
import $ from "jquery";
import EditClient from "@/modals/client/EditClient";
import AddPoints from "@/modals/client/AddPoints";
import RemovePoints from "@/modals/client/RemovePoints";
import SendPush from "@/modals/client/SendPush";

export default {
  name: "EditClientPage",
  components:{
    EditClient,
    AddPoints,
    RemovePoints,
    SendPush
  },
  mounted(){
    $('.nav-tabs a:first').click();
  }
}
</script>

<style scoped>

.detail{
  color:#616cf5;
  cursor:pointer;
}
.order-tab{
  opacity:0.5;
  border-bottom:1px solid transparent;
  padding-bottom: 6px;
}
.order-tab:hover{
  opacity: 1;
  transition: .3s;
  border-bottom: 1px solid #616CF5;
  padding-bottom: 6px;
}
.disable-underline.active .order-tab{
  opacity: 1;
  border-bottom:1px solid #616cf5;
}
.line{
  margin-bottom: 30px;
}
.client-number-row{
  margin-bottom: 60px;
}
.client-number{
  font-size: 20px;
}
.client-number-box{
  border-right: 1px solid #E3E3E3;
}
.client-number-box:last-child{
  border-right: none;
}
.client-number-label{
  color: #B0B0B0;
  font-size: 14px;
  margin-bottom: 10px;
  display: inline-block;
}
.selects:before{
  content:'';
  background: url("../../assets/icons/down.svg") no-repeat;
  width:20px;
  height:20px;
  position: absolute;
  z-index:88;
  right: 0;
  top:42%;

}
.selects{
  position: relative;
}
.form-control{
  background: #F8F9FB;
  border:none;
  height: 35px;
  padding-right: 30px;

}
@media(min-width:1200px){
  .my-container{
    max-width:calc(100vw - 420px);

  }
}
.edit-user{
  color:#616CF5;
  font-size: 14px;
  cursor:pointer;
}
.history-title{
  font-size: 16px;
  color:#000;
}
.nav-buttons{
  margin-bottom: 30px;
}
.edit-header{
  height: 140px;
}
.edit-img{
  width: 80px;
  height: 80px;
  border-radius:50%;
  margin-right: 10px;
}
.edit-name{
  font-size: 20px;
  font-weight: normal;
  margin-bottom: 5px;
}
.edit-category{
  color:#8C94A5;
  margin-bottom: 5px;
}
.edit-category span{
  color:#000;
  text-transform: uppercase;
}


.edit-header-item{
  margin-right: 40px;
}
.edit-header-right{
  color:#616cf5;
  font-size: 16px;
  font-weight: normal;
  cursor:pointer;
}
.edit-header-right img{
  margin-right: 10px;
}
.edit-header-right div{
  margin-right: 26px;
}
</style>