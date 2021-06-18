<template>

    <div class="header d-flex justify-content-between align-items-center">
      <button v-on:click="openSideBar" type="button" id="sidebarCollapse" class="btn">
        <i class="fas fa-align-left"></i>

      </button>
      <div class="total-order">
        <h5 class="route-name">{{$route.name}}</h5>
        <span class="total-order"></span>
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


      <div class="profile dropdown">
        <div class="d-flex align-items-center profile-cursor dropdown-toggle"   id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="profile-logo d-flex align-items-center justify-content-center">{{user_info ? user_info.name.charAt(0).toUpperCase() : ""}}</span>
          <div>
              <h3 class="mb-0 cashback-sub-title" style="font-weight:400">{{user_info ? user_info.name : ""}}</h3>
              <span style="color:#8C94A5">Your tariff is lite</span>
          </div>
          <img class="profile-arrow" src="../../assets/icons/down.svg">
        </div>

        <div class="dropdown-menu general-dropdown">
          <div class="profile-dropdown">
            <div class="d-flex align-items-center profile-header dropdown-toggle">
              <span class="profile-logo d-flex align-items-center justify-content-center">{{user_info ? user_info.name.charAt(0).toUpperCase() : ""}}</span>
              <div>
                <h3 class="profile-title mb-0 cashback-sub-title">{{user_info ? user_info.name : ""}}</h3>
                <span style="color:#8C94A5">Your tariff is lite</span>
              </div>
            </div>
            <div class="warning d-flex align-items-center">
                <span class="number">99</span>
                <span class="mr-2 ml-2" style="color:#8C94A5;">|</span>
                <span class="days">days lefts</span>
            </div>

            <ul class="p-0">
              <li class="profile-list" @click="$router.push('/settings/personal-settings')">
                <svg class="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.44209 10.8658L10.8917 3.41615C11.6525 2.65539 12.8865 2.65539 13.6473 3.41615L14.6423 4.41118C15.4031 5.17195 15.4031 6.40601 14.6423 7.16677L7.16332 14.6458C6.83059 14.9785 6.37953 15.1651 5.90861 15.1651H2.8457L2.92273 12.0752C2.93464 11.621 3.12047 11.1874 3.44209 10.8658Z" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.96289 4.35986L13.696 8.09222" stroke="#222222" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10.3887 15.1651H15.6703" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Edit profile</li>
              <li class="profile-list" @click="$router.push('/settings/price')"><img src="../../assets/clients/DiscountBlack.svg">Choose tariff</li>
            </ul>

            <a class="log-out" @click="logout">Log out</a>
            <p  class="powered">
              Powered by ”Loy Gift” 2021
            </p>
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
data(){
    return{
      user_info:''
    }
}
  },
  methods:{
  logout(){
    this.$router.push('/')
    localStorage.removeItem('token')
  },
  },
  beforeCreate(){
    this.user_info = JSON.parse(localStorage.getItem('user'))


  }

}
</script>

<style scoped>

.profile-list:hover{
  color:#616cf5;
}
.profile-list:hover svg path{
  fill:red;
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
#sidebarCollapse{
  display: none;
}

.profile-logo{
  width: 40px;
  height: 40px;
  background: #616CF5;
  border-radius:50%;
  color:#fff;
  margin-right: 10px;
}
.profile-dropdown .profile-logo{
  width: 50px;
  height: 50px;
}
.profile-arrow{
  margin-left: 14px;
}
.profile-cursor{
  cursor:pointer;

}
.profile-header{
  margin-bottom: 20px;
}
.profile-dropdown{
  padding:25px;
}
.profile-title{
  font-size: 18px;
  font-weight:400;
}
.warning{
  background: #F8F9FF;
  border-radius: 7px;
  height: 40px;
  padding:0 20px;
  margin-bottom: 20px;
}
.warning .number{
  font-weight: 500;
  color: #616CF5;
  font-size: 16px;
}
.warning .days{
  color: #8C94A5;
  font-size: 14px;
}
.profile-list{
  list-style-type:none;
  color:#222;
  font-size: 16px;
  margin-bottom: 25px;
}
.profile-list:last-child{
  border-bottom: 1px solid #E3E3E3;
}
.profile-list:hover{
  background: none;
}
.profile-list img{
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.log-out{
  color:#D81919;
  display: block;
  margin-bottom: 50px;
  text-decoration: none;
  cursor:pointer
}
.powered{
  color:#8C94A5;
  font-size: 14px;
  text-align: center;
  margin-bottom: 0;
}
@media(max-width:992px){
  #sidebarCollapse{
    display: block;
  }

}
</style>