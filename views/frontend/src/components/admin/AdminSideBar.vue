<template>
  <div class="side-bar">
    <div class="side-bar-header">
      <img class="logo" src="../../assets/img/logo.svg"/>
    </div>
    <div>
      <router-link class="router-link" to="/orders"><span class="sider-bar-link"> <div class="left-line"></div><img src="../../assets/icons/Plus.svg" >Company</span> <img class="arrow" src="../../assets/icons/side-arrow.svg"></router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: "AdminSideBar",
  data() {
    return {
      sideBarMenu: true,
    }
  },
  props:{
    closeSideBar: {
      type:Function,
    },




  }

}
</script>

<style scoped>

.logo{
  height: auto;
  width:50%;
}
.side-bar{
  background: #25262C;
  min-height: 100vh;
  width: 100%;
  position: relative;

}
.side-bar-header{
  display: flex;
  justify-content: center;
  background: #3B3B45;
  height:60px;
  margin-bottom: 20px;
}


.counters{
  width:24px;
  height: 22px;
  background: #D25858;
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right:20px;
}

.router-link {
  padding-left: 20px;
  display: flex;
  align-items: center;
  color:#fff;
  text-decoration: none;
  font-size: 15px;
  height: 50px;
  position: relative;


}
.sider-bar-link{
  opacity: 0.7;
}
.router-link-active {
  background: #363642;

}
.router-link-active .sider-bar-link{
  opacity: 1;
}
.router-link-active .left-line{
  visibility:visible;
  opacity:1;
}

.router-link:hover{
  opacity: 1;
  background: #363642;
  transition: 0.4s;
}
.router-link:hover .left-line{
  visibility:visible;
  opacity:1;
}
.router-link:hover .sider-bar-link{
  opacity: 1;
}
.router-link img{
  margin-right: 10px;
}
.closing{
  display: none;
  color:#fff;
}

.arrow{
  position: absolute;
  right:20px;
}
.help-setting{
  position: absolute;
  width: 100%;
  bottom:20px;
}
.line-side{
  border-bottom:1px solid #e8e8e8;
  width: 90%;
  opacity: 0.3;
  margin: 10px auto;
}
.left-line{
  width: 5px;
  height: 100%;
  background: #606877;
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 5px 0px 0px 5px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  opacity:0;
  transition:visibility 0.3s linear,opacity 0.3s linear;
}

@media(max-width:992px){
  .side-bar-header{
    justify-content: space-around;
  }
  .closing{
    display: block;

  }
}
</style>