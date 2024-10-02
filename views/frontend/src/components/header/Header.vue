<template>

  <div class="header d-flex justify-content-between align-items-center">
    <button v-on:click="openSideBar" type="button" id="sidebarCollapse" class="btn">
      <i class="fas fa-align-left"></i>

    </button>
    <div class="total-order">
      <h5 v-if="$route.path.startsWith('/settings')" class="route-name">Settings</h5>
      <h5 v-else-if="$route.path.startsWith('/loyalty')" class="route-name">Loyalty</h5>
      <h5 v-else class="route-name">{{ $route.name }}</h5>
      <span class="total-order"></span>
    </div>
    <div class="d-flex align-items-center">
      <div class="select-lang dropdown">
        <!-- <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <a href="/">Eng <img src="../../assets/icons/Line.svg"></a>
        </div> -->

        <!-- <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
          <ul class="list-group" >
            <li class="list-group-item">English</li>
            <li class="list-group-item">Russian</li>
          </ul>
        </div> -->
      </div>

      <!-- <div class="notification">
        <img src="../../assets/icons/ring.svg">
      </div> -->


      <div class="profile dropdown">
        <div class="d-flex align-items-center profile-cursor dropdown-toggle" id="dropdownMenu" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">
          <span class="profile-logo d-flex align-items-center justify-content-center">{{ user_info ?
            user_info.name.charAt(0).toUpperCase() : ""}}</span>
          <div>
            <h3 class="mb-0 cashback-sub-title profile-name" style="color: white">{{ user_info ? user_info.name.slice(0, 22) : "" }}
            </h3>
          </div>
          <img class="profile-arrow" src="../../assets/icons/down.svg">
        </div>

        <div class="dropdown-menu animate slideIn general-dropdown">
          <div class="profile-dropdown">
            <div class="d-flex align-items-center profile-header dropdown-toggle">
              <span class="profile-logo profile-logo-2 d-flex align-items-center justify-content-center">{{ user_info ?
                user_info.name.charAt(0).toUpperCase() : ""}}</span>
              <div>
                <h3 class="profile-title mb-0 cashback-sub-title">{{ user_info ? user_info.name.slice(0, 22) : "" }}</h3>
              </div>
            </div>
            <!-- <div class="warning d-flex align-items-center">
                <span class="number">{{ getDaysLeft(user_info.activeBefore) }}</span>
                <span class="mr-2 ml-2" style="color:#8C94A5;">|</span>
                <span class="days">days lefts</span>
            </div> -->

            <ul class="p-0">
              <li class="profile-list" @click="$router.push('/settings/personal-settings')">
               Изменить профиль
              </li>
              <a class="log-out" @click="logout">Выйти</a>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "Header",
  props: {
    openSideBar: {
      type: Function
    },
    data() {
      return {
        user_info: ''
      }
    }
  },
  methods: {
    logout() {
      this.$router.push('/')
      localStorage.removeItem('token')
    },
    getDaysLeft(selectedDate) {
      let today = this.$moment();
      let start = this.$moment(selectedDate).startOf('day');
      let end = this.$moment(today).startOf('day');
      return start.diff(end, 'days', true);
    }
  },
  beforeCreate() {
    this.user_info = JSON.parse(localStorage.getItem('user'))
  }

}
</script>

<style scoped>
.log-out:hover {
  color: #BD1010;
}

.profile-list:hover {
  color: #616cf5;
}

.profile-list:hover svg path {

  stroke: #616cf5;
}
.route-name{
  color: #fff;
}
.general-dropdown {
  width: 18rem;
  left: calc(100% - 18rem + -30px) !important;
  top: 55px !important;
}

.header {
  background: #616CF5;
  height: 60px;
  padding: 0 30px;
  margin-bottom: 30px;
}

.select-lang a {
  color: #525252;
  font-size: 14px;
}

.notification {
  margin: 0 24px;
  cursor: pointer;
}

#sidebarCollapse {
  display: none;
}

.profile {
  position: static !important;
}

.profile-logo {
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  color: #616cf5;
  margin-right: 10px;
}
.profile-logo-2 {
  color: #616cf5;
  background: #E9ECFF;
}

.profile-dropdown .profile-logo {
  width: 50px;
  height: 50px;
}
.profile-logo + h3{
  color: #fff;
}
.profile-arrow {
  margin-left: 14px;
  transition: .3s;
}

.profile-cursor {
  cursor: pointer;

}

.profile-header {
  margin-bottom: 20px;
}

.profile-dropdown {
  padding: 22px;
}

.profile-title {
  font-size: 18px;
  font-weight: 400;
}

.warning {
  background: #F8F9FF;
  border-radius: 7px;
  height: 40px;
  padding: 0 20px;
  margin-bottom: 20px;
}

.profile.show .profile-arrow {
  transform: rotate(180deg);
  transition: 0.3s;
}

.warning .number {
  font-weight: 500;
  color: #616CF5;
  font-size: 16px;
}

.warning .days {
  color: #8C94A5;
  font-size: 14px;
}

.profile-list {
  list-style-type: none;
  color: #222;
  font-size: 16px;
  margin-top: 25px;
  border-top: 1px solid #e8e8e8;
  border-bottom: none;
  padding: 12px 0;
}


.profile-list:hover {
  background: none;
}

.profile-list:hover .profile-list img svg path {
  stroke: #616cf5
}

.profile-list img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.log-out {
  color: #E94A4A;
  display: block;
  margin-bottom: 50px;
  text-decoration: none;
  cursor: pointer
}

.powered {
  color: #8C94A5;
  font-size: 14px;
  text-align: center;
  margin-bottom: 0;
}

@media(max-width:992px) {
  #sidebarCollapse {
    display: block;
  }

}
</style>