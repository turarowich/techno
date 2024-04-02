<template>
<div>
  <div>
    <span>
      List of active parsers
    </span>
  </div>
  <div>
    <div v-for="company in companies" :key="company['id']">
      <span>
        {{ company['id'] }} -  {{ company['time'] }}
      </span>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: "CatalogImport",
  data(){
    return{
      companies:[],
    }
  },
  components:{

  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods:{
    async  getCompanies(){
      const options = {
        headers: {
          "x-admin": true,
          "x-admin-token": localStorage.getItem('tokenAdmin'),
        },
        params: {
        },
      }
      await this.axios.get(this.url('getActiveCronParsers'),options)
        .then((response) => {
          console.log(response.data.objects,"opopp");
          this.companies = response.data.objects;
        })
    },
  },
  mounted() {
    this.getCompanies();
  },

}
</script>

<style scoped>
.router-link-active{
  background: none;
}
.loyalty-menu{
  margin-bottom: 10px;
}
.loyalty-nav{
  border-bottom: 1px solid #D3D3D3;
  margin-bottom: 22px;
}
.loyalty-link{
  color:#999;
  text-decoration: none;
  padding-bottom: 11px;
  border-bottom: 3px solid transparent;
}
.loyalty-link.active{
  color:#222;
  border-bottom: 3px solid #616CF5;
  padding-bottom: 11px;

}

.loaylty-list{
  list-style-type:none;
  margin-right: 20px;
}
.companyName{
  font-size: 16px;
  line-height: 19px;
  color: #222222;
}
.userName{
  font-size: 14px;
  line-height: 17px;
  color: #858585;
}
.table-content{
  height: calc(100vh - 200px);
  overflow-y: overlay;
}
.days-left{
  background: #F4F4F4;
  border-radius: 5px;
  color:#616cf5;
  padding:5px;
}
.status-header{
  background: #F4F4F4;
  border-radius: 5px;
  padding: 3px 15px;
}
.status-dot{
  height: 7px;
  width: 7px;
  border-radius: 50%;
  background: #fff;
}
.table-item{
  height: 60px;
  padding: 10px 25px;
}
.main-search{
  margin: 25px;

}
.admin-header{
  height: 60px;
  display: flex;
  justify-content: left;
  margin-bottom: 25px;
}
.company-title{
  font-size: 24px;
  font-weight: 700;
}
.total-company{
  font-size: 16px;
  color:#858585;
}
.main-content-header{
  padding: 10px 25px;
}
.admin-content{
  border:1px solid #D3D3D3;
  border-radius: 10px;
}

.contentWrapper{
  margin:30px 30px;
}
</style>