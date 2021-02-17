<template>
<div class="side-bar">
    <div class="side-bar-header">
          <img src="../assets/img/logo.svg"/>
          <button v-on:click="closeSideBar" class="btn closing"><i class="fas fa-align-right "></i></button>
    </div>
    <div>
      <router-link class="router-link" to="/">Home</router-link>
      <router-link class="router-link" to="/orders"><img src="../assets/icons/Plus.svg" >Orders <span class="counters">13</span></router-link>
      <router-link class="router-link" to="/clients"><img src="../assets/icons/Document.svg" >Clients<span class="counters">27</span></router-link>
      <router-link class="router-link" to="/loyalty"><img src="../assets/icons/Game.svg" >Loyalty Programm</router-link>
      <router-link class="router-link" to="/"><img src="../assets/icons/Discovery.svg" >Online</router-link>
      <router-link class="router-link" to="/chats"><img src="../assets/icons/MoreSquare.svg" >Chats<span class="counters">2</span></router-link>
      <router-link class="router-link" to="/"><img src="../assets/icons/Chart.svg" >Reports</router-link>
      <router-link class="router-link" to="/"><img src="../assets/icons/Setting.svg" >Settings</router-link>

    </div>
</div>


</template>

<script>
export default {
name: "SideBar",
props:{
  closeSideBar: {
    type:Function,
  }
}
}
</script>

<style scoped>
.side-bar{
  background: #30303A;
  min-height: 100vh;
  width: 100%;
  position: relative;

}
.side-bar-header{
  display: flex;
  justify-content: center;
  background: #4257D0;
  padding:10px 0;
  height:55px;
  margin-bottom: 20px;
}

.counters{
  width:24px;
  height: 22px;
  background: #D87575;
  border-radius: 5px;
  font-size: 13px;
  display: inline-block;
  vertical-align: center;
  padding-top:2px ;
  text-align: center;
  position: absolute;
  right:20px;
}

.router-link {
  padding-left: 20px;
  display: flex;
  align-items: center;
  color:#fff;
  text-decoration: none;
  border-left:3px solid transparent;
  font-size: 14px;
  padding-top:10px;
  padding-bottom: 10px;
}
.router-link:last-child{
  position: absolute;
  width: 100%;
  bottom:20px;

}
.router-link:hover{
  border-left:3px solid blue;
  background: #2A2A31;
  transition: 0.4s;
}
.router-link img{
  margin-right: 10px;
}
.closing{
  display: none;
  color:#fff;

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

