<template>
<div  v-if="isSelected">
<slot ></slot>
</div>
</template>

<script>
export default {
name: "LoyaltyTabContent",
  props:{
  isSelected:{
    type:Boolean
  }
  }
}
</script>

<style scoped>

</style>