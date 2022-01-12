<template>
<div class="contentWrapper">
    <div class="admin-header">
      <div style="margin-right: 20px;">
        <img src="../../assets/img/logoAdmin.svg">
      </div>
      <div style="display: flex;justify-content: space-between;flex-direction: column;">
        <h3 class="company-title" @click="getCompanies">Superadmin panel</h3>
        <span class="total-company">Companies
          <span>
            {{ companies.length }}
          </span>
        </span>
      </div>

      <div @click="logOut" class="d-flex justify-content-center align-items-center" style="margin-left: auto;cursor: pointer;">
        <div>
          <img src="../../assets/icons/log-out.svg" style="margin-bottom: 3px;">
          <span class="total-company" style="margin-left: 8px;">Log out</span>
        </div>
      </div>
    </div>

  <div class="loyalty-nav d-flex align-items-end">
    <ul class="loyalty-menu p-0 d-flex">
      <li class="loaylty-list"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='CompanyList' }" to="/admin/company-list" exact>Company List</router-link></li>
      <li class="loaylty-list"><router-link class="loyalty-link" v-bind:class="{ active: currentRouteName==='CatalogImport' }" to="/admin/catalog-import">Catalog Import</router-link></li>
    </ul>
  </div>

  <div>
    <router-view/>
  </div>
</div>
</template>

<script>
export default {
  name: "AdminPage",
  data(){
    return{
      companies:[],
    }
  },
  components:{

  },
  computed: {
    currentRouteName() {
      console.log(this.$route.name);
      return this.$route.name;
    },
  },
  methods:{
    logOut(){
      this.$router.push('/')
      localStorage.removeItem('token');
      localStorage.removeItem('tokenAdmin');
    },
    async  getCompanies(){
      const options = {
        headers: {
          "x-admin": true,
          "x-admin-token": localStorage.getItem('tokenAdmin'),
        },
        params: {
          "searchText":this.searchText,
          "sortByProperty":this.sortBy,
          "sortOrder":this.sortOrder,
        },
      }
      await this.axios.get(this.url('getCompanies'),options)
        .then((response) => {
          console.log(response.data);
          this.companies = response.data.objects;
        })
    },
  },
  mounted() {
    this.getCompanies();
    this.$router.push('/admin/company-list')
  },

}
</script>

<style scoped>
body{
  overflow-y: overlay!important;
}
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
.contentWrapper{
  margin:30px 30px;
}
</style>