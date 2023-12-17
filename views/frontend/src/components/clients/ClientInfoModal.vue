<template>
  

            
           <div class="infoContent">
            <div class="infoContent_1">
              <div class="clientlogo 1" v-bind:style="{ 'background-image': 'url(' + imgSrc+clientInfoData.logo + ')' }"></div>

              <div class="line"></div>

              <div v-if="clientInfoData.img" class="clientImg 1" v-bind:style="{ 'background-image': 'url(' + imgSrc+clientInfoData.img + ')' }"></div>
              <div v-else class="clientImg 2">
                <img style="width: 100%;height: 100%;" src="../../assets/icons/chat.svg">
              </div>
                

              <div class="clientName">{{clientInfoData.name}}</div>
              <div class="clientPhone">{{clientInfoData.phone}}</div>
            </div>  
            <div class="infoContent_2">
              <div class="discountTitle">Скидка</div>
              <div class="discountPercentage">{{clientInfoData.discount_percentage}}%</div>
            </div> 
           </div>




  
</template>

<script>

export default {
name: "ClientInfoModal",
  data(){
  return{
    imgSrc:'',
      clientInfoData:{
        name:"",
        phone:"",
        discount_percentage:"",
      },
  }
  },
  computed:{

  },
  methods:{
    getClientInfo(){
      let currentCompanyCatalog = this.$route.params.company_id;
      let client_id = this.$route.params.client_id;
      let that=this;
      const options = {
        headers: {"x-client-url": currentCompanyCatalog}
      }
      let url = this.url('getClientInfoScan');
      let data = {
        clientCode:client_id,
      }

      this.axios.post(url,data,options).then(function (response) {
        console.log(response);
        let clientData = response.data.client;
        that.clientInfoData = clientData;
      }).catch(function(error){
        if (error.response) {
          console.log(Object.values(error.response.data.errors));
        }
      });
    }
  }, 
  mounted() {
    this.imgSrc=this.$server+"/";
    this.getClientInfo();
  }
}
</script>

<style scoped>
 .modal-dialog, .modal-content,.infoContent{
  height: 100%;
}

.infoContent_2,.infoContent_1{
  flex: 1 0 0;
  width: 100%;
}

.infoContent_2{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
 .infoContent{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  padding: 65px;
}

.discountPercentage{
  color:#616CF5;
  font-weight: 700;
  font-size: 40px;
}
.discountTitle{
  font-weight: 600;
  font-size: 16px;
}
.clientImg{
  width: 152px;
  height: 152px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  margin: auto;
  border-radius: 50%;
  margin-bottom: 50px;
}
.clientPhone{
  font-weight: 400;
  font-size: 16px;
}
.clientName{
  font-weight: 500;
  font-size: 23px;
}
.companyName{
  color: red;
  font-size: 40px;
  font-weight: 700;
}

.clientlogo{
  height: 35px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin-bottom: 25px;
}
</style>