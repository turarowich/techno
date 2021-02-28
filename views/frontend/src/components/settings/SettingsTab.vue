<template>
  <div>
    <ul class="tab-menu">
      <li class="tab-list" v-for="tab in tabs" :key="tab">
        <a :class="{active: tab===selected} " v-on:click="setTab(tab)" >{{tab}}</a>
      </li>

    </ul>
    <slot> </slot>
  </div>
</template>

<script>
export default {
  name: "SettingsTab",
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



</style>