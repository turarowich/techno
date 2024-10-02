<template>
  <div class="parent-modal">
    <div class="modal myModal fade" id="add-work" tabindex="-1" role="dialog" aria-labelledby="add-work"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content">
          <div class="modal-header category-header align-items-center">
            <div>
              <h3 class="modal-title">Добавить работу</h3>
              <!-- <span class="under-title">Текущее количество бонусов {{client.points}}</span> -->
            </div>
            <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/xBlack.svg" alt="">
              </span>
            </button>
          </div>
          <div class="modal-body category-body">
            <!-- <form class="modal-form"> -->
            <input v-if="!order" v-model="search_product" class="enter-name-input"
              placeholder="Введите название или ID заказа">
            <div v-if="!order" class="left-order">
              <div v-if="search_product.length !== 0" class="search-product">
                <div class="pl-4 pt-3 pb-3" v-if="filteredProducts.length === 0">
                  Не найдено
                </div>
                <div v-else v-for="product in filteredProducts" @click="selectOrder(product)" :key="product._id"
                  class="product-order ">
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="table-child d-flex align-items-center">
                      <div class="table-img">
                        <img v-if="product.sample.img" :src="imgSrc + '/' + product.sample.img">
                        <img v-else src="../../assets/icons/no-catalog.svg">
                      </div>
                      {{ product.sample.name }}
                    </div>
                    <div>
                      <span>{{ product.sample.details[0][client.role] }} {{ currency }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="product-order mb-4 border">
              <div class="d-flex align-items-center justify-content-between">
                <div class="table-child d-flex align-items-center">
                  <div class="table-img">
                    <img v-if="order.sample.img" :src="imgSrc + '/' + order.sample.img">
                    <img v-else src="../../assets/icons/no-catalog.svg">
                  </div>
                  {{ order.sample.name }}
                </div>
                <div class="d-flex align-items-center">
                  <span>{{ order.sample.details[0].iron }} {{ currency }}</span>
                  <div @click="order=null" class="ml-2">
                    <img src="../../assets/icons/xBlack.svg" alt="">
                  </div>
                </div>
              </div>
            </div>

            <label>Количество</label><br>
            <input type="number" v-model="count" class="cashback-input mb-3" placeholder="Введите количество бонусов">
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
  name: "AddWork",
  props: ['client', 'getClient'],
  data() {
    return {
      count: '',
      comments: '',
      search_product: '',
      orders: [],
      imgSrc: '',
      currency: '',
      order: null
    }
  },
  computed: {
    filteredProducts() {
      return this.orders.filter((product) => {
        return product.sample.name.toLowerCase().includes(this.search_product.toLowerCase()) || product.code.toLowerCase().includes(this.search_product.toLowerCase())
      })
    },
  },
  methods: {
    selectOrder(product) {
      this.order = product
    },
    getOrders() {
      this.axios.get(this.url('getOrdersAll') + '?populate=client')
        .then((res) => {
          this.orders = res.data.objects
        }).catch((error) => {
          if (error.response && error.response.data) {
            this.$warningAlert(error.response.data.msg)
          }
        });
    },
    getSettings() {
      let that = this;
      this.axios.get(this.url('getSettings'))
        .then((response) => {
          that.currency = response.data.object.currency;
        }).catch(function (error) {
          if (error.response) {
            console.log('setCatalog_settings EERRRor', error.response)
          }
        })
    },
    onSubmit() {
      if(!this.count.length) {
        this.$warningAlert('Напишитие количество')
      }
      if(!this.order) {
        this.$warningAlert('Выберите заказ')
      }
      this.axios.post(this.url('addWork'), {
        worker: this.client._id,
        count: this.count,
        sample: this.order.sample._id,
        order: this.order._id,
        sum: (parseFloat(this.order.sample.details[0][this.client.role]) * parseFloat(this.count)).toFixed(2)
      })
        .then(() => {
          this.$informationAlert("Работа была успешно добавлено")
          this.getClient()
          $('#add-work').modal("hide")
          this.count = '';
        }).catch((error) => {
          if (error.response && error.response.data) {
            this.$warningAlert(error.response.data.msg)
          }
        });

    },
  },
  mounted() {
    this.getOrders()
    this.getSettings()
    this.imgSrc = this.$server
  }
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