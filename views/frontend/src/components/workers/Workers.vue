<template>
  <div class="client">
    <div class="searchAndButtons">
      <div class="d-flex justify-content-between app-buttons">
        <div class="d-flex align-items-center">
          <button v-if="check()" class="app-buttons-item adding-btns" data-toggle="modal"
            data-target="#add-worker"><span>+ Добавить работника</span></button>
          <!-- <button v-if="check()" class="app-buttons-item" data-toggle="modal" data-target="#push-notification "><img
              src="../../assets/icons/bgNotification.svg"><span>Push notification</span></button>
          <button v-if="check()" class="app-buttons-item" data-toggle="modal" data-target="#individual-push"><img
              src="../../assets/icons/send-individual.svg"><span>Schedule push</span></button> -->

        </div>
        <div class="d-flex align-items-center">
          <button v-if="check()" class="app-buttons-item" @click="deleteAllClient"><img
              src="../../assets/icons/trash_empty.svg"><span>Удалить</span></button>
          <div class="dropdown">
            <!-- <button v-if="check()" class="dropdown-toggle app-buttons-item" id="dropdownMenuTotal" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false">
              <img src="../../assets/icons/moveto.svg"><span>Перенести</span>
            </button> -->
          </div>
        </div>
      </div>
      <div v-if="showMainSearch" class="main-search d-flex align-items-center">
        <img src="../../assets/icons/search-icon.svg">
        <input class="main-input" type="text" placeholder="Поиск..." v-model="search">
      </div>
    </div>
    <div class="d-flex">
      <div class="client-content" style="width:100%">
        <div class="main-content">
          <div class="d-flex main-content-header justify-content-between">
            <div class="table-head d-flex align-items-center client-names">
              <div class="table-head"><label class="custom-checkbox"><input type="checkbox" @change="selectAllClient"
                    class="main_select" v-model="selectAll"><span class="checkmark"></span></label></div>
              Имя
            </div>
            <div v-if="data_check.phone_checked" class="table-head client-phone" style="width:14%">Номер телефона</div>
            <div v-if="data_check.total_checked" class="table-head table-link d-flex align-item-center" style="width: 8%;"
              @click="sortByTotal"><span>Зарботал</span> <img class="total-pol total" style="margin-left:5px"
                src="../../assets/icons/polygon.svg"></div>
            <div style="width:3%" class="dropdown dropdown-settings pl-3">
              <div class="table-head text-right dropdown-toggle" id="dropdownBlue" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false" style="width:5%"><img src="../../assets/icons/BlueSetting.svg">
              </div>
              <div class="dropdown-menu general-dropdown settings-dropdown" aria-labelledby="#dropdownBlue">
                <form @change="updatelistFilter">
                  <div><label class="custom-checkbox"><input id="phone_f" v-model="data_check.phone_checked"
                        type="checkbox"><span class="checkmark"></span></label><label class="show-fields"
                      for="phone_f">Номер телефона</label></div>
                  <div><label class="custom-checkbox"><input id="total_f" v-model="data_check.total_checked"
                        type="checkbox"><span class="checkmark"></span></label><label class="show-fields"
                      for="total_f">Зарботал</label></div>
                </form>
              </div>
            </div>

          </div>
          <div class="table-content">
            <div style="height:100%; " class="d-flex align-items-center" v-if="spinner">
              <Spinner />
            </div>
            <div v-else>
              <WorkerItem v-on:checkSelection="checkSelection" v-on:selectClient="selectClient"
                v-on:deleteClient="deleteClient" :clientList="clientToDisplay"
                :data_check="data_check" :scannerStatus="scannerStatus" />
            </div>


          </div>
          <AddWorker />
          <EditWorker v-bind:getClients="getClients" v-bind:select_client="select_client"/>

          <div class="pagination d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <span>Rows per page</span>
              <select class="form-control pagination-select" v-model='perPage'>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
              </select>

            </div>
            <div class="d-flex align-items-center"><span>{{ current_page }}</span> <span class="mr-1 ml-1">of</span> <span
                class="mr-2">{{ totalPages }}</span>
              <div v-if='showPrev' @click.stop.prevent='currentPage -= 1' class=" pagination-btns"><img
                  class="pagination-img" src="../../assets/icons/prevArrow.svg"></div>
              <div v-else class="pagination-btns " style="opacity: 0.5;"><img class="pagination-img"
                  src="../../assets/icons/prevArrow.svg"></div>
              <div class=" pagination-btns" v-if='showNext' @click.stop.prevent='currentPage += 1'> <img
                  class="pagination-img" src="../../assets/icons/side-arrow.svg"></div>
              <div v-else class=" pagination-btns" style="opacity: 0.5;"> <img class="pagination-img"
                  src="../../assets/icons/side-arrow.svg"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Spinner from "../Spinner";
import WorkerItem from "@/components/workers/WorkerItem";
import Swal from "sweetalert2";
import $ from 'jquery'
import AddWorker from "../../modals/workers/AddWorker.vue";
import EditWorker from "../../modals/workers/EditWorker.vue";

export default {
  name: "Clients",
  components: {
    WorkerItem,
    AddWorker,
    EditWorker,
    Spinner
  },


  data() {
    return {
      spinner: true,
      clientList: [],
      movedCategories: [],
      scannerStatus: false,
      customFields: false,
      data_check: {
        phone_checked: false,
        total_checked: false,
      },
      clientCategory: [
        { _id: '', name: 'All' }
      ],
      discountList: [],
      select_category: '',
      selectAll: false,
      search: '',
      sorting: true,
      search_category: '',
      select_client: '',
      deletedClients: [],
      /*---------Sumbit values after choosing then ------------*/

      gender_client: '',
      birthday: '',
      category: '',
      discount: '',
      from_register_date: '',
      from_last_scanned_date: '',
      to_register_date: '',
      to_last_scanned_date: '',
      from_purchase_date: '',
      to_purchase_date: '',
      from_number_purchase: '',
      to_number_purchase: '',

      /*-------- initial values filtered first--------*/

      f_category: null,
      f_gender_client: '',
      f_birthday: '',
      f_discount: '',
      f_from_register_date: '',
      f_from_last_scanned_date: '',
      f_to_register_date: '',
      f_to_last_scanned_date: '',
      f_from_purchase_date: '',
      f_to_purchase_date: '',
      f_from_number_purchase: '',
      f_to_number_purchase: '',
      currentPage: 1,
      perPage: 8,



    }
  },
  computed: {
    filteredList: function () {
      return this.clientList
        .filter(client => {
          return (client.name && client.name.toLowerCase().includes(this.search.toLowerCase())) || (client.phone && client.phone.includes(this.search))
        })
    },
    showMainSearch() {
      if (
        this.f_from_register_date || 
        this.f_to_register_date || 
        this.f_from_last_scanned_date || 
        this.f_to_last_scanned_date || 
        this.f_from_purchase_date || 
        this.f_to_purchase_date || 
        this.f_gender_client || 
        this.f_birthday || 
        this.f_discount || 
        this.f_from_number_purchase || 
        this.f_to_number_purchase
        ) {
        return false
      }
      return true;
    },
    // filterCategory() {
    //   return this.clientCategory.filter((cat) => {
    //     return cat.name.toLowerCase().includes(this.search_category.toLowerCase())
    //   })
    // },
    current_page() {
      if (this.currentPage > this.totalPages) {
        return Math.ceil(this.filteredList.length / this.perPage)
      }

      return this.currentPage
    },

    clientToDisplay: function () {
      let start = (this.current_page - 1) * this.perPage
      let end = this.current_page * this.perPage
      this.filteredList.map((value, index) => {
        value.index = index
        return value
      })
      return this.filteredList.slice(start, end)
    },
    totalPages: function () {
      return Math.ceil(this.filteredList.length / this.perPage)
    },
    showNext() {
      return this.currentPage < this.totalPages;
    },
    showPrev() {
      return this.currentPage > 1;
    },
  },

  methods: {
    updatelistFilter() {
      let that = this;
      this.axios.post(this.url('updateClientFilter'), { filters: that.data_check }).then(() => {
      }).catch((error) => {
        if (error.response && error.response.data) {
          this.$warningAlert(error.response.data.msg)
        }
      });
    },
    check(access = "clients", parametr = "active", parametr2 = "canEdit") {
      return this.checkAccess(access, parametr, parametr2)
    },
    selectAllClient() {
      this.clientToDisplay.map(client => client['selected'] = this.selectAll)
    },
    checkSelection() {
      let selected = this.clientToDisplay.filter(employee => {
        return employee.selected
      })
      this.selectAll = selected.length === this.filteredList.length
    },
    sortByTotal() {
      this.clientList.sort((a, b) => this.sorting ? (parseInt(a.total) - parseInt(b.total)) : (parseInt(b.total) - parseInt(a.total)));
      this.sorting = !this.sorting;
      $('.total-pol').toggleClass('active')
      $('.date-pol').removeClass('active')
      $('.total-scans-pol').removeClass('active')
    },
    selectClient(id) {
      this.clientList.map((item) => {
        if (item._id === id) {
          this.select_client = item;
        }
      })

    },
    deleteClient(id) {
      Swal.fire({
        showConfirmButton: true,
        html: 'Вы точно хотите удалить <br>работника',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: 'Delete',
        buttonsStyling: false,
        customClass: {
          popup: 'sweet-delete',
          confirmButton: 'confirm-btn',
          cancelButton: 'cancel-btn',
          actions: 'btn-group',
          content: 'content-sweet',
          closeButton: 'close-btn'

        },
        showClass: {
          popup: 'animate__animated animate__slideInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }

      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete(this.url('deleteWorker', id))
            .then(() => {
              this.socket.emit('user_deleted', { id })
              this.getClients()
              Swal.fire({
                title: 'Success',
                timer: 1500,
                text: 'Работник был успешно удален',
                showConfirmButton: false,
                position: 'top-right',
                customClass: {
                  popup: 'success-popup',
                  content: 'success-content',
                  title: 'success-title',
                  header: 'success-header',
                  image: 'success-img'
                },
              }
              )
            }).catch((error) => {
              if (error.response && error.response.data) {
                this.$warningAlert(error.response.data.msg)
              }
            });
        }
      })
    },
    deleteAllClient() {
      this.clientList.forEach((user) => {
        if (user.selected) {
          this.deletedClients.push(user._id)
        }
      });
      if (this.deletedClients.length > 0) {
        Swal.fire({
          showConfirmButton: true,
          html: 'Вы точно хотите удалить этих<br>работников?',
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: 'Delete',
          buttonsStyling: false,
          customClass: {
            popup: 'sweet-delete',
            confirmButton: 'confirm-btn',
            cancelButton: 'cancel-btn',
            actions: 'btn-group',
            content: 'content-sweet',
            closeButton: 'close-btn'
          },

          showClass: {
            popup: 'animate__animated animate__slideInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.axios.delete(this.url('deleteWorkers'), { data: { objects: this.deletedClients } })
              .then(() => {
                this.deletedClients = []
                this.getClients()
                this.selectAll = false
                this.$successAlert('Все выбранные клиенты были успешно удалены')
              }).catch((error) => {
                if (error.response && error.response.data) {
                  this.$warningAlert(error.response.data.msg)
                }
              });
          }
          else {
            this.deletedClients = []
          }

        })
      }
      else {
        this.$warningAlert('Choose clients to delete')
      }

    },
    getClients() {
      this.axios.get(this.url('getWorkers'))
        .then((res) => {
          this.clientList = res.data.objects;
          this.spinner = false;
        })

    },
    getSettings() {
      let that = this;
      this.axios.get(this.url('getSettings'))
        .then((response) => {
          let settings = response.data.object;
          console.log(JSON.stringify(settings))
          if (response.data.clientsFilter) {
            that.data_check = response.data.clientsFilter;
            that.scannerStatus = response.data.scannerStatus;
          }
        }).catch(function (error) {
          if (error.response) {
            console.log('setCatalog_settings EERRRor', error.response)
          }
        })
    },

  },
  mounted() {
    this.getSettings();
    this.getClients();
  },


}
</script>

<style scoped>
.main-search {
  margin-bottom: 11px;
}

.show-properties img {
  margin-bottom: 2px;
  margin-left: 5px;
}


.show-properties {
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  background: #F8F9FB;
  border: 1px solid #E3E3E3;
  margin-right: 10px;
  padding: 2px 10px;
  border-radius: 100px;
  color: #606877;
  transition: .3s;
  margin-bottom: 10px;

}

.total {
  width: 6px;
  height: 6px;
  margin-top: 8px;
}

.client-names {
  width: 33%;
}

.show-fields {
  cursor: pointer;
  margin-bottom: 0;
}

.category-box {
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0 15px;
  padding-top: 20px;
  margin-right: 20px;
}

.category-title {
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 10px;
}

.catalog-list {
  list-style-type: none;
  border: none;
  height: 35px;
  padding: 0 10px;
  border-radius: 5px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reset {
  color: #E94A4A !important;
}

.general-dropdown.settings-dropdown {
  transform: translate3d(-148px, 25px, 0px) !important;
  width: 190px;
  padding: 20px;
  font-size: 14px;
  font-weight: normal;


}

.general-dropdown.settings-dropdown div {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.general-dropdown.settings-dropdown .custom-checkbox {
  margin-right: 10px;
  width: 12px;
}

.last-filter-body {
  margin-bottom: 40px !important;
}

.filter-body {
  margin-bottom: 20px;
}

.filter-img {
  position: absolute;
  right: 0;
  top: 18%;
  transform: rotate(180deg);
  transition: 0.3s
}

.filter-list {
  font-weight: normal;
  font-size: 14px;
  border-bottom: 1px solid #F4F4F4;
  padding-bottom: 13px;
  position: relative;
  margin-bottom: 15px;
}

.filter-list:hover {
  color: #616cf5;
}

.client {
  margin: 0 30px;
  height: calc(100vh - 90px);
  overflow: hidden;
}

.adding-btns {
  background: #E9ECFF;
  color: #616CF5;
}

.filter-box {
  width: 662px;
  margin-right: 20px;
  margin-top: 44px;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 23px;
  padding-bottom: 30px;
  height: auto;
  overflow-y: auto;
  margin-left: -575px;
  position: relative;
}

.save {
  width: 120px;

}

.filter-header h3 {
  font-size: 16px;
}

.filter-header {
  margin-bottom: 30px;
}

.reset {
  margin-right: 30px;
  font-size: 14px;
  display: flex;
  align-items: center;
  color: #8C94A5;
  cursor: pointer;
}

.calendar {
  height: 27px;
  padding: 0 10px;
  margin-bottom: 0;
}

.calendar img {
  width: 14px;
  height: 14px;
}

.filter-body label {
  font-size: 12px;
  margin-bottom: 0;
  margin-right: 10px;
}

.calendar-input {
  font-size: 12px;
}

.cashback-input {
  height: 27px;
  width: 100%;
  font-size: 12px;
}

.category {
  font-size: 14px;
  display: flex;
  align-items: center;
}

.category:first-child {
  margin-bottom: 10px;
}

.filter-form {
  height: 27px;
  padding: 0 20px;
  font-size: 14px;
  background-position-y: 50%;
  background-position-x: 95%;
  ;

}


/*=========radio button==========*/



.radio-toolbar-gender input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar-gender label {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  width: 13px;
  height: 13px;
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius: 50%;
}

.radio-toolbar-gender input[type="radio"]:checked+label {
  background-color: #616cf5;
  border: none;
}

.male {
  font-size: 14px;
}

/*=====================Radio Toolbar Category=======================*/


.radio-toolbar-category input[type="radio"] {
  opacity: 0;
  position: fixed;
  width: 0;
}

.radio-toolbar-category label {
  display: inline-block;
  margin-bottom: 0;
  margin-right: 10px;
  width: 13px;
  height: 13px;
  border: 1px solid #E3E3E3;
  box-sizing: border-box;
  border-radius: 50%;
}

.radio-toolbar-category input[type="radio"]:checked+label {
  background-color: #616cf5;
  border: none;
}

.radio-toolbar-category .radio-checkbox {
  border-radius: 3px;
}

.clientScanDetailsRow,
.clientScanDetailsRowHeader {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #E4E4E4;
  padding: 10px 0;
  font-size: 14px;
  font-weight: 400;
}

.clientScanDetailsRowHeader {
  color: #787878;
}

#clientScanDetailsModal .modal-body {
  display: flex;
  flex-direction: column;
}

.clientScanDetailsRow0 {
  display: flex;
}

#clientScanDetailsModal .modal-dialog,
#clientScanDetailsModal .modal-content,
#clientScanDetailsModal .infoContent {
  height: 80%;
  overflow-y: auto;
}

.detailsContent {
  margin: 0 20px;
}

.scanDetailsFor {
  font-size: 21px;
  font-weight: 600;
  margin-right: 20px;
}

.scanDetailsForName {
  font-size: 21px;
  font-weight: 600;
  color: #616CF5;
}</style>
