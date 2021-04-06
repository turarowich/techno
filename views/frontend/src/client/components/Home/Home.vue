<template>
  <div class="client">
<div class="container">
  <Navbar/>
  <router-view/>
</div>
    <Footer/>
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