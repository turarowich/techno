<template>

  <div class="settings">
    <div class="settings-header">
      <h2 class="route-name">Settings</h2>
    </div>
    <SettingsTab :tabs="['General','QR Codes', 'Prices']" :selected="selected" @selected="setSelected">
      <SettingsTabContent :isSelected="selected==='General'">
        <General/>
      </SettingsTabContent>
      <SettingsTabContent :isSelected="selected==='QR Codes'">
        <h1>QR Codes</h1>
      </SettingsTabContent>
      <SettingsTabContent :isSelected="selected==='Prices'">
       <Price/>
      </SettingsTabContent>
    </SettingsTab>
  </div>
</template>

<script>
import SettingsTab from "@/components/settings/SettingsTab";
import SettingsTabContent from "@/components/settings/SettingsTabContent";
import General from "@/components/settings/general/General";
import Price from "@/components/settings/prices/Price";
export default {
name: "Settings",
  components:{
    SettingsTab,
    SettingsTabContent,
    General,
    Price
  },
  data(){
    return{
      selected:'General'
    }
  },
  methods:{
    setSelected(tab){
      this.selected = tab
    }
  }
}
</script>

<style scoped>
.settings-header{
  height:60px;
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}
.settings{
  padding:0 30px;
  height:100vh;
  overflow-y: auto;
}
</style>