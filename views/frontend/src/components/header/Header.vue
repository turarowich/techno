<template>

    <div class="header d-flex justify-content-between align-items-center">
      <button v-on:click="openSideBar" type="button" id="sidebarCollapse" class="btn">
        <i class="fas fa-align-left"></i>

      </button>
      <div class="total-order">
        <h5 class="route-name">{{$route.name}}</h5>
        <span class="total-order">Total orders: {{total_order}}</span>
      </div>
      <div class="d-flex align-items-center">
      <div class="select-lang dropdown">
        <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <a href="/">Eng <img src="../../assets/icons/Line.svg"></a>
        </div>

        <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
          <ul class="list-group" >
            <li class="list-group-item">English</li>
            <li class="list-group-item">Russian</li>

          </ul>
        </div>

      </div>

      <div class="notification">
        <img src="../../assets/icons/ring.svg">
      </div>

      <div class="user-info d-flex align-items-center">
        <span class="user-logo">W</span>
        <div class="user-text">
          <h4 class="user-name">Wory Shop</h4>
          <span class="user-tariff">Your tarif is lite</span>
        </div>


        <div class="dropdown">
         <div class="drop-img dropdown-toggle" id="dropdownProfile" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <img src="../../assets/icons/Line.svg"  >
         </div>
          <div class="dropdown-menu profile-dropdown" aria-labelledby="dropdownProfile">
           <form>
             <div class="user-info d-flex align-items-center">
               <span class="user-logo">W</span>
               <div class="user-text">
                 <h4 class="user-name ">Wory Shop</h4>
                 <span class="user-tariff">Your tarif is lite</span>
               </div>
             </div>

             <ul class="list-group">
               <li class="profile-list list-group-item"><img src="../../assets/icons/edit-profile.svg">Edit pofile</li>
               <li class="profile-list list-group-item"><img src="../../assets/icons/discountProfile.svg">Choose your tariff</li>
             </ul>
             <span class="logout" @click="logout">Log out</span>
              <p class="profile-footer">Powered by ”Loy Gift” 2021</p>
           </form>
          </div>
        </div>

      </div>
      </div>
    </div>

</template>

<script>
export default {
name: "Header",
  props:{
  openSideBar:{
    type:Function
  },
    total_order:Number,
  },
  methods:{
  logout(){
    this.$router.push('/')
    localStorage.removeItem('token')
  }
  }

}
</script>

<style scoped>

.total-order span{
  color: #8C94A5;
  font-size: 14px;
  line-height: 17px;
}
.total-order{
  line-height: 17px;
}
.header{
  background: #fff;
  height: 60px;
  padding: 0 30px;
  margin-bottom: 30px;

}
.select-lang a{
  color: #525252;
  font-size: 14px;
}
.notification{
  margin:0 24px;
  cursor: pointer;
}
.user-name{
  font-size: 16px;
  margin-bottom: 0;
  font-weight:500;
  cursor:pointer;
}
.user-tariff{
  color: #BABABA;
  font-size: 14px;
}
.user-logo{
  width: 40px;
  height: 40px;
  background: #4257D0;
  color:#fff;
  border-radius:50%;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor:pointer;
}
.user-text{
  line-height: 17px;
  margin-right: 10px;
}
.user-info img{
  cursor:pointer;
}
#sidebarCollapse{
  display: none;
  padding: 0;
}
.profile-dropdown{
  position: absolute;
  width: 277px;
  height: 386px;
  background: #FFFFFF;
  box-shadow: 2px 11px 35px rgba(0, 0, 0, 0.1);
  border-radius: 7px;
  transform: translate3d(-256px, 40px, 0px) !important;
  padding:23px;

}
.profile-dropdown .user-info{
  margin-bottom:40px;
}
.profile-dropdown .user-logo{
  width: 50px;
  height: 50px;
}
.profile-dropdown .user-name{
  font-size: 18px;
}
.drop-img{
  width: 20px;
  height: 20px;
  cursor:pointer;
  text-align: center;
}
.profile-list{
  font-size:16px;
  color:#222;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  border-radius: 0;
}
.profile-list:last-child{
  border-bottom: 1px solid #e8e8e8;
}
.profile-list:hover{
  background: none;
}
.profile-list img{
  margin-right:10px;
  width: 13px;
  height: 13px;
}
.logout{
  color:#D81919;
  font-size: 16px;
  cursor:pointer;
}
.profile-footer{
  color: #8C94A5;
  font-size: 14px;
  position: absolute;
  bottom:0;
  left: 55px;
}

@media(max-width:992px){
  #sidebarCollapse{
    display: block;
  }

}
</style>