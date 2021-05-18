<template>
  <div class="client">
<div >

  <div v-if="!['ClientLogin', 'ClientRegister'].includes($route.name)">
    <Navbar/>

  </div>
  <router-view/>
</div>
    <div v-if="!['ClientLogin', 'ClientRegister'].includes($route.name)">
      <Footer/>

    </div>
  </div>
</template>

<script>
import Navbar from "@/client/Navbar";
import Footer from "@/client/components/footer/Footer";
export default {
name: "Home",
  components:{
  Navbar,

    Footer
  }

}
</script>

<style scoped>
@media(min-width:1200px){
  .client-container{
    max-width: calc(100vw - 240px);
  }
}
.client{
  overflow-y: auto;
  height: 100%;
}

.main-box h1{
  font-size: 34px;
  font-weight: bold;
  margin-bottom: 5px;
}.main-box p{
  font-size: 22px;
   font-weight: normal;
 }


.new-img img{
  width: 100%;
}

</style>