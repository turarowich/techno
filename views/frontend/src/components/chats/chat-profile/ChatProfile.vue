<template>
<div class="chat-profile">
  <div v-if="contact">
    <img class="profile-img" v-if="contact.avatar" :src="makeImg(contact.avatar)" alt="">
    <img class="profile-img" v-else src="../../../assets/icons/chat.svg" > 
    <h3 class="profile-title">{{contact.name}}</h3>
    <span>Last purchase {{contact.updatedAt ? contact.updatedAt.slice(0, 10) : ""}}</span>
    <div class="chat-line"> </div>

    <div class="d-flex justify-content-center mb-5">
        <div class="paid-for">
            <h4>{{contact.balance}}</h4>
        <span>Paid for</span>
        </div>
        <div class="points">
        <h4>{{contact.points}}</h4>
        <span>Point</span>
        </div>
    </div>

    <div class="profile-contact">
        <p><img src="../../../assets/icons/Call.svg">{{contact.phone}}</p>
        <p><img src="../../../assets/icons/Message.svg">{{contact.email}}</p>
        <p><img src="../../../assets/icons/Calendar.svg">{{contact.birthDate ? contact.birthDate.slice(0, 10) : ""}}</p>
    </div>

    <button class="view-profile">View profile</button>
  </div>
</div>
</template>

<script>
export default {
    name: "ChatProfile",
    props:{
        contact:{
            type:Object
        }
    },
    methods:{
        makeImg(name){
            return this.img(name)
        }
    },
}
</script>

<style scoped>
.chat-profile{
  text-align: center;
  padding:20px;
  color: #8C94A5;
  font-size: 14px;

}
.profile-img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}
.profile-title{
  color:#000;
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 0;
}

.chat-line{
  width: 100%;
  height: 1px;
  background: #D3D3D3;
  margin: 20px auto;
}
h4{
  color:#000;
  margin-bottom: 0;
  font-size: 16px;
}
.paid-for{
  margin-right: 20px;
  padding-right: 20px;
  border-right: 1px solid #d3d3d3;
}
.profile-contact{
  text-align: left;
  margin-bottom: 50px;
}
.profile-contact img{
  margin-right: 10px;
}
.view-profile{
  border:none;
  background: #E9ECFF;
  border-radius: 5px;
  width: 145px;
  height: 36px;
  font-size: 16px;
  color: #616CF5;
}
.view-profile:hover{
  background: #616CF5;
  transition: .5s;
  color:#fff;
}
.view-profile:not(:hover){
  transition: .5s;
}
</style>