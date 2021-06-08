<template>

  <div class="settings">
      <SettingsNavbar/>
      <router-view/>

  </div>
</template>

<script>
import SettingsNavbar from "@/components/settings/SettingsNavbar";
export default {
name: "Settings",
  components:{
  SettingsNavbar
  }


}
</script>

<style scoped>

.settings{
  padding:0 30px;

}
</style>