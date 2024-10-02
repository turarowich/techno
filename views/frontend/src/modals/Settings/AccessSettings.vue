<template>
<div class="modal fade right"  id="edit-access-settings" tabindex="-1" role="dialog" aria-labelledby="edit-access-settings" aria-hidden="true">
    <div class="modal-dialog modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100" style="max-width: calc(100% - 250px);" role="document" >
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-start">
          <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/x.svg" alt="">
              </span>
          </button>
          <h3 class="modal-title">Настройки доступа</h3>
        </div>
        <div class=" myModal-body">
        <div class="access-settings">
        <p class="warning-text">
            Влючив данные опции вы даете
            доступ только к<br> просматриванию разделов. Если хотите дать полный доступ<br> отметьте галочку ”разрешить редактирование”
        </p>
        <div class="row" v-if="employee">
            <div class="col-lg-4" v-if="employee.orders">
                <div class="settings-box d-flex align-items-center justify-content-between" >
                    <div class="d-flex align-items-center"  >
                        <img class="settings-icon" src="../../assets/icons/setting-icon/Plus.svg">
                        <div>
                            <h4 class="settings-title" :class="employee.orders.active ? '' : 'unactive' ">Доступ к всем заказам</h4>
                            <div class="d-flex">
                            <label class="custom-checkbox mr-2" v-if="employee.orders.active"><input type="checkbox" v-model="employee.orders.canEdit"><span class="checkmark"></span></label>
                            <label class="custom-checkbox mr-2" v-else ><input type="checkbox" value="false" onclick="return false;"><span class="checkmark"></span></label>
                            <div class="edit-access">Доступ изменения</div>
                            </div>
                        </div>
                    </div>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.orders.active">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-4" v-if="employee.settings">
                <div class="settings-box d-flex align-items-center justify-content-between" >
                    <div class="d-flex align-items-center"  >
                        <img class="settings-icon" src="../../assets/icons/setting-icon/Setting.svg">
                        <div>
                            <h4 class="settings-title" :class="employee.settings.active ? '' : 'unactive' ">Доступ к настройкам компании</h4>
                            <div class="d-flex">
                            <label class="custom-checkbox mr-2" v-if="employee.settings.active"><input type="checkbox" v-model="employee.settings.canEdit"><span class="checkmark"></span></label>
                            <label class="custom-checkbox mr-2" v-else ><input type="checkbox" value="false" onclick="return false;"><span class="checkmark"></span></label>
                            <div class="edit-access">Доступ изменения</div>
                            </div>
                        </div>
                    </div>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.settings.active">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-4" v-if="employee.analytics">
                <div class="settings-box d-flex align-items-center justify-content-between" >
                    <div class="d-flex align-items-center"  >
                        <img class="settings-icon" src="../../assets/icons/setting-icon/Chart.svg">
                        <div>
                            <h4 class="settings-title" :class="employee.analytics.active ? '' : 'unactive' ">Доступ к аналитике</h4>
                            <div class="d-flex">
                            <label class="custom-checkbox mr-2" v-if="employee.analytics.active"><input type="checkbox" v-model="employee.analytics.canEdit"><span class="checkmark"></span></label>
                            <!-- <label class="custom-checkbox mr-2" v-else ><input type="checkbox" value="false" onclick="return false;"><span class="checkmark"></span></label>
                            <div class="edit-access">Edit access</div> -->
                            </div>
                        </div>
                    </div>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.analytics.active">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-4" v-if="employee.clients">
                <div class="settings-box d-flex align-items-center justify-content-between" >
                    <div class="d-flex align-items-center"  >
                        <img class="settings-icon" src="../../assets/icons/setting-icon/Document.svg">
                        <div>
                            <h4 class="settings-title" :class="employee.clients.active ? '' : 'unactive' ">Доступ к базе клиентов</h4>
                            <div class="d-flex">
                            <label class="custom-checkbox mr-2" v-if="employee.clients.active"><input type="checkbox" v-model="employee.clients.canEdit"><span class="checkmark"></span></label>
                            <label class="custom-checkbox mr-2" v-else ><input type="checkbox" value="false" onclick="return false;"><span class="checkmark"></span></label>
                            <div class="edit-access">Доступ изменения</div>
                            </div>
                        </div>
                    </div>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.clients.active">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-4" v-if="employee.news">
                <div class="settings-box d-flex align-items-center justify-content-between" >
                    <div class="d-flex align-items-center"  >
                        <img class="settings-icon" src="../../assets/icons/setting-icon/VolumeUp.svg">
                        <div>
                            <h4 class="settings-title" :class="employee.news.active ? '' : 'unactive' ">Доступ к новостям</h4>
                            <div class="d-flex">
                            <label class="custom-checkbox mr-2" v-if="employee.news.active"><input type="checkbox" v-model="employee.news.canEdit"><span class="checkmark"></span></label>
                            <label class="custom-checkbox mr-2" v-else ><input type="checkbox" value="false" onclick="return false;"><span class="checkmark"></span></label>
                            <div class="edit-access">Доступ изменения</div>
                            </div>
                        </div>
                    </div>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.news.active">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-4" v-if="employee.catalog">
                <div class="settings-box d-flex align-items-center justify-content-between" >
                    <div class="d-flex align-items-center"  >
                        <img class="settings-icon" src="../../assets/icons/setting-icon/Discovery.svg">
                        <div>
                            <h4 class="settings-title" :class="employee.catalog.active ? '' : 'unactive' ">Доступ к каталогу</h4>
                            <div class="d-flex">
                            <label class="custom-checkbox mr-2" v-if="employee.catalog.active"><input type="checkbox" v-model="employee.catalog.canEdit"><span class="checkmark"></span></label>
                            <label class="custom-checkbox mr-2" v-else ><input type="checkbox" value="false" onclick="return false;"><span class="checkmark"></span></label>
                            <div class="edit-access">Доступ изменения</div>
                            </div>
                        </div>
                    </div>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.catalog.active">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-4" v-if="employee.chat">
                <div class="settings-box d-flex align-items-center justify-content-between" >
                    <div class="d-flex align-items-center"  >
                        <img class="settings-icon" src="../../assets/icons/setting-icon/MoreSquare.svg">
                        <div>
                            <h4 class="settings-title" :class="employee.chat.active ? '' : 'unactive' ">Доступ к чатам</h4>
                            <div class="d-flex">
                            <label class="custom-checkbox mr-2" v-if="employee.chat.active"><input type="checkbox" v-model="employee.chat.canEdit"><span class="checkmark"></span></label>
                            <label class="custom-checkbox mr-2" v-else ><input type="checkbox" value="false" onclick="return false;"><span class="checkmark"></span></label>
                            <div class="edit-access">Доступ отправке сообщения</div>
                            </div>
                        </div>
                    </div>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.chat.active">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <!-- <div class="col-lg-4" v-if="employee.loyalty">
                <div class="settings-box d-flex align-items-center justify-content-between" >
                    <div class="d-flex align-items-center"  >
                        <img class="settings-icon" src="../../assets/icons/setting-icon/Game.svg">
                        <div>
                            <h4 class="settings-title" :class="employee.loyalty.active ? '' : 'unactive' ">Access to loyalty programs</h4>
                            <div class="d-flex">
                            <label class="custom-checkbox mr-2" v-if="employee.loyalty.active"><input type="checkbox" v-model="employee.loyalty.canEdit"><span class="checkmark"></span></label>
                            <label class="custom-checkbox mr-2" v-else ><input type="checkbox" value="false" onclick="return false;"><span class="checkmark"></span></label>
                            <div class="edit-access">Edit access</div>
                            </div>
                        </div>
                    </div>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.loyalty.active">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div> -->
            <!-- <div class="col-lg-4" v-if="employee.logs">
                <div class="settings-box d-flex align-items-center justify-content-between" >
                    <div class="d-flex align-items-center"  >
                        <img class="settings-icon" src="../../assets/icons/setting-icon/paper.svg">
                        <div>
                            <h4 class="settings-title" :class="employee.logs.active ? '' : 'unactive' ">Access to operations</h4>
                            <div class="d-flex">
                            <label class="custom-checkbox mr-2" v-if="employee.logs.active"><input type="checkbox" v-model="employee.logs.canEdit"><span class="checkmark"></span></label>
                            <label class="custom-checkbox mr-2" v-else ><input type="checkbox" value="false" onclick="return false;"><span class="checkmark"></span></label>
                            <div class="edit-access">Edit access</div>
                            </div>
                        </div>
                    </div>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.logs.active">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div> -->
        </div>

        <!-- <h2 class="cashback-sub-title mt-3 mb-3">Loyalty settings</h2> -->

        <div class="row mb-5" v-if="employee">
            <div class="col-lg-4">
                <div class="loyalty-box d-flex justify-content-between align-items-center">
                    <h3 class="cashback-sub-title" :class="employee.canAddPoint ? '' : 'unactive' ">Начисление бонусов</h3>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.canAddPoint">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="loyalty-box d-flex justify-content-between align-items-center">
                    <h3 class="cashback-sub-title"  :class="employee.canDeductPoint ? '' : 'unactive' ">Удаления бонусов</h3>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.canDeductPoint">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="loyalty-box d-flex justify-content-between align-items-center">
                    <h3 class="cashback-sub-title"  :class="employee.canChangeOrderStatus ? '' : 'unactive' ">Измнения статуса заказа</h3>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.canChangeOrderStatus">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <!-- <div class="col-lg-4">
                <div class="loyalty-box d-flex justify-content-between align-items-center">
                    <h3 class="cashback-sub-title"  :class="employee.canSendPush ? '' : 'unactive' ">Push notification</h3>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.canSendPush">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="loyalty-box d-flex justify-content-between align-items-center">
                    <h3 class="cashback-sub-title"  :class="employee.canScanQR ? '' : 'unactive' ">Scan QR</h3>
                    <label class="switch d-flex">
                        <input type="checkbox" v-model="employee.canScanQR">
                        <span class="slider round"></span>
                    </label>
                </div>
            </div> -->
        </div>
        <button class="save mb-5" @click="editAccess">Save</button>
        </div>
    </div>
    </div>
</div>
</div>
</template>

<script>
import $ from "jquery"
export default {
    name: "AccessSettings",
    props: ['selectedEmployee'],
    data(){
        return{
            employee:{},
            newImage: false
        }
    },
    watch: {
        selectedEmployee: function (val) {
            this.employee = Object.assign({}, val)
        }
    },
  methods:{
        editAccess(){
            this.axios.put(this.url('updateEmployee', this.employee._id), this.employee)
                .then(() => {
                    setTimeout(()=>{ 
                        this.$emit('getEmployees')
                        $('#edit-access-settings').modal("hide")    
                    }, 300);
                    this.$successAlert('Successfull')
                }).catch((error) => {
                    console.log("fail", error.response)
                })
        }


    }
}
</script>

<style scoped>
.save{
  width: 120px;
}
.warning-text{
  font-size: 14px;
  color:#858585;
  margin-bottom: 24px;
}

.cashback-sub-title{
  font-weight: 400;
  font-size: 15px;
}

.unactive.cashback-sub-title{
  color: #858585;
}

.settings-box, .loyalty-box{
  padding: 15px;
  border: 1.5px solid #D3D3D3;
  border-radius:10px;
  margin-bottom: 15px;
}
.settings-box{
  height: 80px;
}

.settings-icon{
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.settings-title{
  font-size: 15px;
  margin-bottom: 7px;
}
.unactive.settings-title{
    color: #858585;
}
.edit-access{
  color:#999;
}

</style>