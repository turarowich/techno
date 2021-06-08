<template>
    <div>  
        <li v-for="(contact,index) in contactList" :key="contact.id" :class="{'selected' : index === selected}" v-on:click="selectContact(index, contact)">
        <div class="contact-list d-flex align-items-center">
          <img src="../../../assets/img/chat.jpg" class="avatar mr-1">
          <div>
            <p class="contact-name m-0">{{contact.name +' '+ contact.lastName}}</p>
            <span  class="contact-span m-0">{{contact.email}}</span>
          </div>
        </div>
        <div>
          <span class="contact-span">{{contact.last_visit}}</span>
        </div>
      </li>
    </div>
</template>

<script>
export default {
name: "Contact",
  data(){
    return{
      selected: 0
    }
  },
  methods:{
    selectContact(index,contact){
      this.selected = index;
      this.$emit('selected',contact)

    }

  },
  props:{
  contactList:{
    type:Array,
    default: function () { return [] }
  }
  }
}
</script>

<style scoped>


li{
  list-style-type: none;
  border-bottom:1px solid #e8e8e8;
  padding:0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 81px;




}
li:hover{

  background: #F6F6F6;
  transition: .3s;
  cursor: pointer;
}
.avatar{
  width: 50px;
  height: 50px;
  border-radius:50%;
}
.contact-name{
  font-size: 15px;
  font-weight: normal;
 }
.contact-span{
  color: #8C94A5;
}


</style>