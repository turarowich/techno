<template>

    <div class="header d-flex justify-content-between align-items-center">
      <button v-on:click="openSideBar" type="button" id="sidebarCollapse" class="btn">
        <i class="fas fa-align-left"></i>

      </button>
      <div class="total-order">
        <h5 v-if="$route.path.startsWith('/settings')" class="route-name">Settings</h5>
        <h5 v-else-if="$route.path.startsWith('/loyalty')" class="route-name">Loyalty</h5>
        <h5 v-else class="route-name">{{$route.name}}</h5>
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
              <h3 class="mb-0 cashback-sub-title" style="font-weight:400">{{user_info ? user_info.name.slice(0,22) : ""}}</h3>
              <span style="color:#8C94A5">Your tariff is lite</span>
          </div>
          <img class="profile-arrow" src="../../assets/icons/down.svg">
        </div>

        <div class="dropdown-menu animate slideIn general-dropdown">
          <div class="profile-dropdown">
            <div class="d-flex align-items-center profile-header dropdown-toggle">
              <span class="profile-logo d-flex align-items-center justify-content-center">{{user_info ? user_info.name.charAt(0).toUpperCase() : ""}}</span>
              <div>
                <h3 class="profile-title mb-0 cashback-sub-title">{{user_info ? user_info.name.slice(0,22) : ""}}</h3>
                <span style="color:#8C94A5">Your tariff is lite</span>
              </div>
            </div>
            <div class="warning d-flex align-items-center">
                <span class="number">{{ getDaysLeft(user_info.activeBefore) }}</span>
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
              <li class="profile-list" @click="$router.push('/settings/price')">
                <svg width="18" height="18" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.59381 8.23203C5.59381 6.77486 6.77564 5.59303 8.23164 5.59303H9.43214C10.1275 5.59303 10.796 5.3177 11.2906 4.82653L12.1295 3.98653C13.1573 2.95403 14.828 2.94936 15.8605 3.9772L15.871 3.98653L16.711 4.82653C17.2045 5.3177 17.873 5.59303 18.5695 5.59303H19.7688C21.226 5.59303 22.4078 6.77486 22.4078 8.23203V9.4302C22.4078 10.1279 22.6831 10.7952 23.1743 11.2899L24.0143 12.1299C25.0468 13.1577 25.0526 14.8272 24.0248 15.8609L24.0143 15.8714L23.1743 16.7114C22.6831 17.2037 22.4078 17.8734 22.4078 18.5687V19.7692C22.4078 21.2264 21.226 22.407 19.7688 22.407H18.5695C17.873 22.407 17.2045 22.6835 16.711 23.1747L15.871 24.0135C14.8443 25.0472 13.1736 25.0519 12.14 24.024C12.1365 24.0205 12.133 24.017 12.1295 24.0135L11.2906 23.1747C10.796 22.6835 10.1275 22.407 9.43214 22.407H8.23164C6.77564 22.407 5.59381 21.2264 5.59381 19.7692V18.5687C5.59381 17.8734 5.31731 17.2037 4.82614 16.7114L3.98731 15.8714C2.95364 14.8435 2.94897 13.1729 3.97681 12.1404L3.98731 12.1299L4.82614 11.2899C5.31731 10.7952 5.59381 10.1279 5.59381 9.4302V8.23203" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M11.002 16.9981L16.9986 11.0015" stroke="#222222" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.9951 17.8765C16.7618 17.8765 16.5401 17.7832 16.3768 17.6198C16.2951 17.5382 16.2368 17.4332 16.1901 17.3282C16.1435 17.2232 16.1201 17.1193 16.1201 17.0015C16.1201 16.8849 16.1435 16.7682 16.1901 16.6632C16.2368 16.5582 16.2951 16.4649 16.3768 16.3832C16.7035 16.0565 17.2868 16.0565 17.6135 16.3832C17.6951 16.4649 17.7651 16.5582 17.8118 16.6632C17.8468 16.7682 17.8701 16.8849 17.8701 17.0015C17.8701 17.1193 17.8468 17.2232 17.8118 17.3282C17.7651 17.4332 17.6951 17.5382 17.6135 17.6198C17.4501 17.7832 17.2285 17.8765 16.9951 17.8765Z" fill="#222222"/>
                  <path d="M10.998 11.8801C10.8814 11.8801 10.7764 11.8556 10.6714 11.8089C10.5664 11.7622 10.4614 11.7051 10.3797 11.6234C10.298 11.5301 10.2397 11.4367 10.193 11.3317C10.1464 11.2256 10.123 11.1217 10.123 11.0051C10.123 10.8872 10.1464 10.7717 10.193 10.6667C10.2397 10.5617 10.298 10.4567 10.3797 10.3867C10.718 10.0589 11.2897 10.0589 11.6164 10.3867C11.7797 10.5489 11.873 10.7717 11.873 11.0051C11.873 11.1217 11.8614 11.2256 11.8147 11.3317C11.768 11.4367 11.698 11.5301 11.6164 11.6234C11.5347 11.7051 11.4414 11.7622 11.3364 11.8089C11.2314 11.8556 11.1147 11.8801 10.998 11.8801Z" fill="#222222"/>
                </svg>
                Choose tariff</li>
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
    getDaysLeft(selectedDate){
      let today = this.$moment();
      let start = this.$moment(selectedDate).startOf('day');
      let end = this.$moment(today).startOf('day');
      return start.diff(end, 'days',true);
    }
  },
  beforeCreate(){
    this.user_info = JSON.parse(localStorage.getItem('user'))


  }

}
</script>

<style scoped>
.log-out:hover{
  color:#BD1010;
}
.profile-list:hover{
  color:#616cf5;
}
.profile-list:hover svg path{

  stroke:#616cf5;
}
.general-dropdown{
  width: 18rem;
  left: calc(100% - 18rem + -30px) !important;
  top:55px !important;
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
.profile{
  position: static !important;
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
  transition: .3s;
}
.profile-cursor{
  cursor:pointer;

}
.profile-header{
  margin-bottom: 20px;
}
.profile-dropdown{
  padding:22px;
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
.profile.show .profile-arrow{
  transform: rotate(180deg);
  transition:0.3s;
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
.profile-list:hover .profile-list img svg path{
  stroke:#616cf5
}
.profile-list img{
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
.log-out{
  color:#E94A4A;
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