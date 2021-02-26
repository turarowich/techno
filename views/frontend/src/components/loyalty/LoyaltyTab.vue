<template>
<div>
  <ul class="loyalty-menu">
    <li class="loyalty-list" v-for="tab in tabs" :key="tab">
      <a :class="{active: tab===selected} " v-on:click="setTab(tab)" >{{tab}}</a>
    </li>

  </ul>
  <slot> </slot>
</div>
</template>

<script>
export default {
name: "LoyaltyTab",
  props:{
    tabs:{
      type:Object,
      required:true
    },
    selected:{
      type:Object,
      required:true
    }
  },
  methods:{
      setTab(tab){
        this.$emit('selected',tab)
      }
  }
}
</script>

<style scoped>
.loyalty-menu{
  margin-bottom: 24px;
  padding-left: 0;
  border-bottom: 1px solid #D3D3D3;
  padding-bottom: 10px;

}
.loyalty-list{
  list-style-type: none;
  display: inline;
  margin-right: 35px;
  font-size: 16px;
  cursor:pointer;
}
.loyalty-list a{
  color:#999;
  text-decoration: none;
  padding-bottom: 11px;


}
.loyalty-list a:hover, a.active{
  border-bottom: 3px solid #616CF5;
  color:#222;
}




</style>