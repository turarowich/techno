<template>
    <div class="parent-modal">
      <div class="modal myModal fade" id="add-prepay" tabindex="-1" role="dialog" aria-labelledby="add-prepay"
        aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content category-content">
            <div class="modal-header category-header align-items-center">
              <div>
                <h3 class="modal-title">Аванс</h3>
                <!-- <span class="under-title">Текущее количество бонусов {{client.points}}</span> -->
              </div>
              <button type="button" data-dismiss="modal" aria-label="Close" class="close">
                <span aria-hidden="true">
                  <img src="../../assets/icons/xBlack.svg" alt="">
                </span>
              </button>
            </div>
            <div class="modal-body category-body">
              <label>Сумма</label><br>
              <input type="number" v-model="count" class="cashback-input mb-3" placeholder="Введите количество бонусов">
              <label>Коментарий</label><br>
              <textarea v-model="comments" class="general-area p-2" placeholder="Описание"></textarea>
              <button class="save" @click.prevent="onSubmit">Добавить</button>
              <!-- </form> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import $ from "jquery";
  export default {
    name: "AddPrePay",
    props: ['client', 'getClient'],
    data() {
      return {
        count: '',
        comments: '',
      }
    },
    methods: {
      onSubmit() {
        if(!this.count.length) {
          this.$warningAlert('Напишитие количество')
        }
        this.axios.post(this.url('addPrepay'), {
          worker: this.client._id,
          sum: this.count,
          comments: this.comments,
        })
          .then(() => {
            this.$informationAlert("Аванс успешно выдан")
            this.getClient()
            $('#add-prepay').modal("hide")
            this.count = '';
          }).catch((error) => {
            if (error.response && error.response.data) {
              this.$warningAlert(error.response.data.msg)
            }
          });
  
      },
    },
  }
  </script>
  
  <style scoped>
  .enter-name-input {
    border: 1px solid #616CF5;
    border-radius: 5px;
    height: 45px;
    width: 100%;
    padding: 0 30px;
    margin-bottom: 20px;
  
  }
  
  .cashback-input {
    width: 100%;
  }
  
  .category-content {
    margin-top: 20%;
  }
  
  .general-area {
    margin-bottom: 30px;
    font-size: 14px;
  }
  
  .save {
    width: 120px;
  }
  
  .under-title {
    color: #8C94A5;
    font-size: 16px;
  }
  </style>