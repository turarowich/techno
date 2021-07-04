<template>
<div class="side-bar">
    <div class="side-bar-header">
          <img class="logo" src="../assets/img/logo.svg"/>
          <button v-on:click="closeSideBar" class="btn closing"><i class="fas fa-align-right "></i></button>
    </div>
    <div v-on:click="closeSideBar">
      <router-link class="router-link" v-if="check('orders', 'active')" to="/orders"><span class="sider-bar-link"> <div class="left-line"></div><img src="../assets/icons/Plus.svg" >Orders</span> </router-link>
      <router-link class="router-link" v-if="check('clients', 'active')"  data-turbolinks="false" to="/clients" ><span class="sider-bar-link"><div class="left-line"></div><img src="../assets/icons/Document.svg" >Clients</span><img class="arrow" src="../assets/icons/side-arrow.svg"></router-link>
      <router-link class="router-link" v-if="check('loyalty', 'active')" to="/loyalty"><span class="sider-bar-link"><div class="left-line"></div><img src="../assets/icons/Game.svg" >Loyalty</span><img class="arrow" src="../assets/icons/side-arrow.svg"></router-link>
      <router-link class="router-link" v-if="check('catalog', 'active')" to="/catalog"><span class="sider-bar-link"><div class="left-line"></div><img src="../assets/icons/Discovery.svg"  data-turbolinks="false">Catalog</span><img class="arrow" src="../assets/icons/side-arrow.svg"></router-link>
      <router-link class="router-link" v-if="check('chat', 'active')" to="/chats"><span class="sider-bar-link"><div class="left-line"></div><img src="../assets/icons/MoresSquare.svg" >Chats <span class="chats-quantity" v-if="msgsCount != ''">{{msgsCount}}</span></span><img v-if="msgsCount == ''" class="arrow" src="../assets/icons/side-arrow.svg"></router-link>
      <router-link class="router-link" v-if="check('analytics', 'active')" to="/analytics"><span class="sider-bar-link"><div class="left-line"></div><img src="../assets/icons/group.svg" >Analytics</span><img class="arrow" src="../assets/icons/side-arrow.svg"></router-link>
      <router-link class="router-link" v-if="check('news', 'active')" to="/news"><span class="sider-bar-link"><div class="left-line"></div><img src="../assets/icons/VolumeUp.svg" >News</span><img class="arrow" src="../assets/icons/side-arrow.svg"></router-link>
      <router-link class="router-link" v-if="check('log', 'active')" to="/log"><span class="sider-bar-link"><div class="left-line"></div><img src="../assets/icons/logs.svg" >Log</span><img class="arrow" src="../assets/icons/side-arrow.svg"></router-link>
     <div class="help-setting">
        <router-link class="router-link help" to="/"><span class="sider-bar-link"><div class="left-line"></div><img src="../assets/icons/question.svg" >Help</span><img class="arrow" src="../assets/icons/side-arrow.svg"></router-link>
        <div class="line-side"></div>
        <router-link class="router-link" v-if="check('settings', 'active')" to="/settings"><span class="sider-bar-link"><div class="left-line"></div><img src="../assets/icons/Setting.svg" >Settings</span><img class="arrow" src="../assets/icons/side-arrow.svg"></router-link>
      </div>
    </div>
</div>


</template>

<script>

export default {
name: "SideBar",
    data() {
        return {
            sideBarMenu: true,
        }
    },
    computed:{
        msgsCount(){
            return this.$store.getters['Message/getMessages'];
        },
        
    },
    props:{
        closeSideBar: {
            type:Function,
        }
    },
    methods:{
        check(access, parametr, parametr2){
            return this.checkAccess(access, parametr, parametr2)
        }
    },
    created(){
        this.$store.dispatch("Message/setMessages",{axios:this.axios, url:this.url('getNewMessages')});
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
.chats-quantity{
    position: absolute;
    right: 30px;
    top: 13px;
    background: #E94A4A;
    border-radius: 5px;
    width: 24px;
    height: 24px;
    text-align: center;
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

