<template>
  <div class="modal fade right" id="add-order" tabindex="-1" role="dialog" aria-labelledby="add-order"
    aria-hidden="true">
    <div class="modal-dialog  modal-full-height myModal-dialog mr-0 mt-0 mb-0 mr-0 h-100"
      style="max-width: calc(100vw - 250px);" role="document">
      <div class="modal-content myModal-content h-100">
        <div class="modal-header justify-content-between align-items-start">
          <div class="justify-content-start align-items-start">
            <img data-dismiss="modal" aria-label="Close" class="close" src="../../assets/icons/x.svg" alt="">
            <div v-if="!['Cancelled', 'Done'].includes(selected_order.status)">
              <h3 v-if="!editState" class="modal-title">Новый заказ</h3>
              <h3 v-else class="modal-title">Изменить заказ</h3>
              <span class="detail-date">{{ today }}</span>
            </div>
            <div v-else>
              <h3 class="modal-title">Посмотреть заказ</h3>
              <span class="detail-date">{{ today }}</span>
            </div>
          </div>
          <div>
            <label class="product-label">Статус заказа</label>
            <select @change="changeStatus" style="width: 200px;" id="change-discount"
              class="form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
              <option v-for="status, k in orderStatuses" :key="k"
                :selected="selectedStatus == k" :value="k">
                {{ status }}</option>
            </select>
          </div>
        </div>
        <div class=" myModal-body">
          <div class="row">
            <div class="col-lg-8 ">
              <h3 class="detail-product" style="font-size: 18px;">Образец {{ new_order.sample?.name }}</h3>
              <input v-if="!new_order.sample" v-model="search_product" class="enter-name-input"
                placeholder="Введите название образца">
              <div class="left-order">
                <div v-if="search_product.length !== 0" class="search-product ">
                  <div class="pl-4 pt-3 pb-3" v-if="filteredProducts.length === 0">
                    Не найдено
                  </div>
                  <div v-else v-for="product in filteredProducts" :key="product._id" class="product-order ">
                    <div v-if="!product.hasMultipleTypes" @click="selectProduct(product)"
                      class="d-flex align-items-center justify-content-between">
                      <div class="table-child d-flex align-items-center">
                        <div class="table-img">
                          <img v-if="product.img" :src="imgSrc + '/' + product.img">
                          <img v-else src="../../assets/icons/no-catalog.svg">
                        </div>
                        {{ product.name }}
                      </div>
                      <div>
                        <span>{{ product._id }}</span>
                      </div>
                    </div>

                    <div v-else class="d-flex align-items-center">
                      <div class="table-child d-flex align-items-center" style="width: 50%;">
                        <div class="table-img">
                          <img v-if="product.img" :src="imgSrc + '/' + product.img">
                          <img v-else src="../../assets/icons/no-catalog.svg">
                        </div>
                        {{ product.name }}
                      </div>
                      <div style="width: 25%;">
                        <span>{{ product.price }} $</span>
                      </div>
                      <div style="width: 25%;text-align: right;">
                        <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" v-bind:id="product._id"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Select size
                          </button>
                          <div class="dropdown-menu" v-bind:aria-labelledby="product._id">
                            <div style="display: flex; flex-direction: column;">
                              <span @click="selectProduct(product, size)" style="border: 1px solid grey;padding: 2px;"
                                v-for="size in product.sizes" :key="size._id" v-bind:value="size._id">Size:{{ size.size
                                }}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="table" style="height: 180px">
                <div v-if="new_order.sample" class="d-flex main-content-header">
                  <div class="table-head" style="width: 40%;">Образец</div>
                  <div class="table-head" style="width: 20%;">Себестоимость</div>
                  <div class="table-head" style="width: 20%;">Маржа</div>
                  <div class="table-head" style="width: 20%;">Итого</div>
                </div>
                <div class="">
                  <div v-if="!new_order.sample"
                    class="mt-3 d-flex align-items-center h-full justify-content-center flex-column">
                    <img class="empty-img mb-2" src="../../assets/img/emp-product.svg">
                    <p class="empty-page-text">Добавьте образец для продолжения</p>
                  </div>

                  <div v-else class="table-item d-flex align-items-center">
                    <div class="d-flex align-items-center" style="width: 40%;">
                      <div class="table-img">
                        <img v-if="new_order.sample.img" :src="imgSrc + '/' + new_order.sample.img">
                        <img v-else src="../../assets/icons/no-catalog.svg">
                      </div>
                      <div style="overflow: hidden;text-overflow: ellipsis;">
                        <div style="display: flex;flex-direction: column;">
                          <span>{{ new_order.sample.name }}</span>
                        </div>
                      </div>
                    </div>

                    <div style="width:20%">
                      <span> {{ totalSample.total }}{{ currency }}</span>
                    </div>
                    <div style="width:20%">
                      <span> {{ totalSample.incomeOne }}{{ currency }}</span>
                    </div>
                    <div style="width:20%">
                      <span>
                        {{ totalSample.result }}{{ currency }}
                      </span>
                    </div>
                  </div>
                  <div v-if="new_order.sample" class="btn-center-container">
                    <button class="cancel" @click="canelSample">Отмена</button>
                  </div>
                </div>
              </div>
              <div class=" product-calendar d-flex">
                <div class="quantity-category mr-2" style="width: 100%;">
                  <label class="product-label">Количество</label><br>
                  <input v-model="new_order.quantity" type="number" min="1" class="cashback-input">
                </div>
                <div class="quantity-category" style="width: 100%;">
                  <label class="product-label">Опалата</label><br>
                  <input v-model="new_order.prepay" type="number" min="1" class="cashback-input">
                </div>
              </div>
              <div class="d-flex mb-3">
                <label class="custom-checkbox">
                  <input v-model="new_order.hasMultipleTypes" type="checkbox">
                  <span class="checkmark"></span>
                </label>
                <span class="pl-3">Есть размеры</span>
              </div>
              <div v-if="new_order.hasMultipleTypes" class="mb-3">
                <div class="d-flex" style="justify-content: space-between;gap: 5px;">
                  <div style="flex: 1 1 0px">Размер</div>
                  <div style="flex: 1 1 0px">Количество</div>
                  <div style="width: 22px;"></div>
                </div>
                <div v-for="(size, index) in new_order.sizes" :key="index" class="d-flex"
                  style="justify-content: space-between;gap: 5px;">
                  <div style="flex: 1 1 0px">{{ size.size }}</div>
                  <div style="flex: 1 1 0px">{{ size.quantity }}</div>
                  <div>
                    <img @click="removeSize(index)" style="cursor: pointer;" src="../../assets/icons/greyX.svg">
                  </div>
                </div>

                <div class="mt-1">
                  <div class="d-flex newSizeBlock" style="gap:15px;">
                    <div style="flex: 1 1 0px">
                      <input placeholder="Размер" v-model="sizeObject.size" type="text"
                        class="form-input cashback-input" name="size_size">
                    </div>
                    <div style="flex: 1 1 0px">
                      <input placeholder="Количество" v-model="sizeObject.quantity" type="text"
                        class="form-input cashback-input" name="size_quantity">
                    </div>
                    <div style="width: 22px;"></div>
                  </div>
                  <div class="fill-fields" v-if="addSizeError.length > 0">
                    {{ addSizeError }}
                  </div>
                  <span class="save" style="cursor: pointer;width: 220px;" @click="addNewSize">Добавить размер</span>
                </div>
              </div>
              <label class="valid-label mt-2">Периуд договора</label>
              <div class=" product-calendar d-flex">
                <div class="mr-2" style="width: 100%">
                  <label>Начало</label>
                  <div class="calendar d-flex align-items-center">
                    <input autocomplete="off" name="dateStart" v-model="new_order.dateStart.formatted"
                      class="calendar-input" id="dateStart">
                    <img src="../../assets/icons/Calendar.svg">
                  </div>
                </div>
                <div style="width: 100%">
                  <label>Окончание</label>
                  <div class="calendar d-flex align-items-center">
                    <input autocomplete="off" name="dateEnd" v-model="new_order.dateEnd.formatted"
                      class="calendar-input" id="dateEnd">
                    <img src="../../assets/icons/Calendar.svg">
                  </div>
                </div>
              </div>
              <label>Менеджер</label>
              <div class="client-box d-flex align-items-center">
                <div v-if="!new_order.manager" class="client-search d-flex align-items-center">
                  <img src="../../assets/icons/search-icon.svg" class="search-client-icon">
                  <input v-model="search_manager" placeholder="Выберите менеджера" class="search-client">
                </div>
                <div v-else class="d-flex align-items-center">
                  <img class="client-avatar" v-if="new_order.manager.avatar"
                    :src="imgSrc + '/' + new_order.manager.avatar">
                  <img class="client-avatar" v-else src="../../assets/icons/chat.svg">
                  <div class="position-relative">
                    <h2 class="name-client">{{ new_order.manager.name }}</h2>
                  </div>
                  <img @click="removeManager" class="close-client" src="../../assets/icons/deleteClient.svg">
                </div>
              </div>
              <div class="parent-order-client">
                <div v-if="search_manager.length !== 0" class="child-order-client">
                  <div v-if="filteredManager.length === 0">
                    <div class="pl-3">Не найдено</div>
                  </div>
                  <div v-else v-for="manager in filteredManager" :key="manager._id" @click="selectManager(manager._id)"
                    class="table-child d-flex align-items-center">
                    <div class="table-img">
                      <img v-if="manager.avatar" :src="imgSrc + '/' + manager.avatar">
                      <img v-else src="../../assets/icons/chat.svg">
                    </div>
                    <div>
                      <h4 class="general-title">{{ manager.name }}</h4>
                      <span class="client-phone-order">{{ manager.phone }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <label class="product-label">Примичание к заказу</label>
                <input class="cashback-input" v-model="new_order.notes">
              </div>
            </div>
            <!------------------------------------------Right Side-------------------------->
            <div class="col-lg-4">
              <h3 class="client-sub-title">Клиент</h3>

              <div class="d-flex guest-name">
                <label class="switch d-flex">
                  <input v-model="guestMode" type="checkbox">
                  <span class="slider round"></span>
                </label>
                <span>Гость</span>
              </div>

              <div v-if="!guestMode" class="client-box d-flex align-items-center">
                <div v-if="Object.keys(client.clientObj).length === 0" class="client-search d-flex align-items-center">
                  <img src="../../assets/icons/search-icon.svg" class="search-client-icon">
                  <input v-model="search_client" placeholder="Введите имя или номер клиента" class="search-client">
                </div>
                <div v-else class="d-flex align-items-center">
                  <img class="client-avatar" v-if="client.clientObj.avatar"
                    :src="imgSrc + '/' + client.clientObj.avatar">
                  <img class="client-avatar" v-else src="../../assets/icons/chat.svg">
                  <div class="position-relative">
                    <h2 class="name-client">{{ client.clientObj.name }}</h2>
                    <!-- <div class="category">
                      {{ client.client_status_name ? client.client_status_name : 'Discount' }}:
                      <span>
                        {{client.client_status_discount}}%
                      </span>

                    </div> -->
                  </div>
                  <img @click="removeClient" class="close-client" src="../../assets/icons/deleteClient.svg">
                </div>
              </div>
              <div v-else>
                <label>Имя</label>
                <input class="cashback-input" v-model="guest.name">
                <label>Номер телефона</label>
                <input class="cashback-input" v-model="guest.phone">
              </div>

              <div class="parent-order-client">
                <div v-if="search_client.length !== 0" class="child-order-client">
                  <div v-if="filteredClients.length === 0">
                    <div class="pl-3">Не найдено</div>
                  </div>
                  <div v-else v-for="client in filteredClients" :key="client._id" @click="selectClient(client._id)"
                    class="table-child d-flex align-items-center">
                    <div class="table-img">
                      <img v-if="client.avatar" :src="imgSrc + '/' + client.avatar">
                      <img v-else src="../../assets/icons/chat.svg">
                    </div>
                    <div>
                      <h4 class="general-title">{{ client.name }}</h4>
                      <span class="client-phone-order">{{ client.phone }}</span>
                    </div>
                  </div>

                </div>
              </div>
              <h3 class="client-sub-title">Метод доставки</h3>
              <div class="selects">
                <select @change="checkMinimumSum" v-model="new_order.deliveryType"
                  class=" form-control long-form-control  form-control-lg" aria-label=".form-select-lg example">
                  <option value="self">Забрать</option>
                  <option value="delivery">Доставка</option>
                </select>
              </div>

              <div v-if="new_order.deliveryType == 'self'">
                <label>Выберите адрес, по которому будет принят заказ</label>
                <div @click="setBranch(branch)" v-for="branch in all_branches" :key="branch._id"
                  :class="{ active_branch: branch._id === selectedBranchObject._id }" class="d-flex pick_up_block_item">
                  <div>
                    <img src="../../assets/icons/location.svg" class="mr-2">
                  </div>
                  <div>
                    <div class="pick_up_block_item_address">
                      {{ branch.address }}
                    </div>
                    <div class="pick_up_block_item_wh">
                      Mn-Fr 08:00 - 19:00
                    </div>
                  </div>
                </div>
              </div>
              <div v-else style="position: relative;">
                <label class="cashback-label">Адрес доставки</label><br>
                <input v-model="new_order.address" type="text" class="cashback-input"
                  placeholder="Введите адрес доставки" />
                <label class="cashback-label">Служба доставки</label><br>
                <div class="selected_delivery_option w-100 d-flex" @click="showDeliveryOption = !showDeliveryOption">
                  <div style="flex: 1;">
                    {{ selectedDeliveryOptionObject.name }}
                  </div>
                  <div>
                    {{ selectedDeliveryOptionObject.price }}
                  </div>
                </div>
                <div v-if="showDeliveryOption" class="delivery_option_wrapper_class">
                  <div v-if="delivery_options.length">
                    <div @click="setSelectedDeliveryOption(opt)" v-for="opt in delivery_options" :key="opt._id"
                      class="d-flex delivery_option_class">
                      <div style="flex:1;">{{ opt.name }}</div>
                      <div>{{ opt.price }}{{ currency }}</div>
                    </div>
                  </div>
                  <div v-else class="delivery_option_class">
                    Добавьте службу доставки
                  </div>
                </div>

              </div>

              <div class="line"></div>
              <h3 class="client-sub-title">Персональная скидка</h3>
              <div style="margin-bottom: 12px; display:flex">

                <span class="cashback-input  d-flex align-items-center mr-3" style="width: 28%">
                  <input class="numb" style="border: none;width: 100%;height: 100%;" type="number" min="0" max="100"
                    v-model="new_order.personalDiscount.sum" placeholder="Введите сумму или процент">
                  <span v-if="new_order.personalDiscount.sum" style="margin-right: 11px;">
                    <img @click="unSetPersonalDiscount" src="../../assets/icons/x_round_grey.svg"
                      style="cursor: pointer;margin-top: -4px;">
                  </span>
                </span>

                <div>
                  <div style="display: flex;flex:1; margin-bottom:3px">
                    <label class="custom-checkbox mr-2">
                      <input v-model="new_order.personalDiscount.percent" type="checkbox">
                      <span class="checkmark">
                      </span>

                    </label>
                    <span>Вывод в %</span>
                  </div>
                  <span style="color:#8C94A5">Проверьте, вводится ли ввод в процентах</span>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <label class="custom-checkbox mr-2">
                    <input v-model="client.points.used" type="checkbox" :disabled="client.clientObj.points < 0">
                    <span class="checkmark">
                    </span>
                  </label>Использовать бонусы
                </div>
                <h3 class="point-number">{{ client.clientObj.points || 0 }}</h3>
              </div>
              <div class="">
                <div class="line"></div>
                <h3 class="client-sub-title">Финансы</h3>
                <ul class="p-0">
                  <!-- <li class="payment-list d-flex justify-content-between">
                    Итого<span>{{ totalNonDiscounted }}{{ currency }}</span></li> -->
                  <li class="payment-list d-flex justify-content-between">
                    Доставка<span>{{ selectedDeliveryOptionObject.price || 0 }}{{ currency }}</span></li>
                  <li class="payment-list d-flex justify-content-between">
                    <span style="color:#606877">Персональная скидка</span>
                    <span>
                      <span>{{ totalDiscount }}</span>
                      <span v-if="!new_order.personalDiscount.percent">%</span>
                      <span v-else>{{ currency }}</span>
                    </span>

                  </li>
                  <li class="payment-list d-flex justify-content-between">
                    Остаток<span>{{ totalPrice - new_order.prepay }}{{ currency }}</span></li>
                  <li class="payment-list d-flex justify-content-between">
                    Бонусы<span>{{ client.points.quantity }}{{ currency }}</span></li>
                </ul>

                <div class="line"></div>
                <div class="d-flex mb-2 justify-content-between align-items-center">
                  <h3 class="total-price">Итого</h3>
                  <h3 class="total-price">{{ totalPrice }} {{ currency }}</h3>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex">
            <button v-if="!['Cancelled', 'Done'].includes(selected_order.status)" class="save mr-2 mb-5" type="button"
              @click="save">
              <span v-if="!editState">Добавить заказ</span>
              <span v-else>Изменить заказ</span>
            </button>
            <button class="cancel" @click="cancel">Отмена</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import $ from "jquery";

export default {
  name: "AddOrder",
  props: ['getOrders', 'selected_order'],

  data() {
    return {
      guestMode: false,
      addSizeError: "",
      sizeObject: {
        size: "",
        quantity: "",
      },
      guest: {
        name: '',
        phone: ''
      },
      editOrderId: '',
      editState: false,
      totalNonDiscounted: 0,
      totalDiscount: 0,
      client: {
        clientObj: {},
        client_status_discount: 0,
        client_status_name: "",
        points: {
          used: false,
          quantity: 0,
        },
      },
      selectedBranchObject: {},
      showDeliveryOption: false,
      selectedDeliveryOptionObject: {
        name: '',
        price: 0,
      },
      all_delivery_options: [],
      all_branches: [],
      currency: '',
      imgSrc: '',
      products: [],
      clients: [],
      searchPromoText: '',
      search_product: '',
      search_client: '',
      search_manager: '',
      managers: [],
      orderStatuses: [],
      selectedStatus: 0,
      dateStartForm: null,
      dateEndForm: null,
      totalPriceData: 0,
      new_order: {
        manager: null,
        hasMultipleTypes: false,
        sample: null,
        address: '',
        client: '',
        status: 'New',
        deliveryType: 'self',
        notes: '',
        sizes: [],
        name: '',
        quantity: 1,
        prepay: 0,
        dateStart: {
          obj: '',
          formatted: '',
        },
        dateEnd: {
          obj: '',
          formatted: '',
        },
        personalDiscount: {
          percent: true,
          sum: 0,
        }
      }
    }
  },
  computed: {
    totalPrice() {
      let sample = null
      let totalSample = 0
      let resultPrice = 0;
      if (this.new_order.sample) {
        sample = this.new_order.sample.details[0]
        totalSample = parseInt(sample.sewing) + parseInt(sample.kroy) + parseInt(sample.overlok) + parseInt(sample.rasposhivalka) + parseInt(sample.vengerka) + parseInt(sample.beltclipper) + parseInt(sample.petla) + parseInt(sample.iron) + parseInt(sample.otk) + parseInt(sample.package) + parseInt(sample.buttons) + parseInt(sample.technolog) + parseInt(sample.consumption) + parseInt(sample.furnitura)
        resultPrice = (totalSample + +sample.income)
      }
      let subTotal = resultPrice
      subTotal = subTotal * this.new_order.quantity

      let nonDiscountedTotal = resultPrice

      this.setTotalNonDiscounted(nonDiscountedTotal);
      let subDiscount = 0
      // subDiscount = subDiscount * this.new_order.quantity
      // console.log(subDiscount);

      //delivery
      if (['Delivery service', 'delivery'].includes(this.new_order.deliveryType)) {
        let delivery = this.selectedDeliveryOptionObject.price || 0;
        subTotal = (subTotal + parseFloat(delivery));
      }
      //clients points
      if (this.client.points.used) {
        let points = this.client.clientObj.points || 0;
        if (points >= subTotal) {
          this.setUsedPoints(subTotal);
          subTotal = 0;
        } else {
          subTotal = subTotal - parseFloat(points);
          this.setUsedPoints(points);
        }

      } else {
        this.unSetUsedPoints();
      }
      //personal discount
      let personalDiscountSum = parseFloat(this.new_order.personalDiscount.sum || 0)
      console.log(personalDiscountSum);

      if (this.new_order.personalDiscount.percent) {
        let discount = (subTotal- this.new_order.prepay) * personalDiscountSum / 100;
        subTotal = subTotal - discount
        subDiscount = subDiscount + discount
      } else {
        let discount = personalDiscountSum;
        subTotal = (subTotal - this.new_order.prepay) - (subTotal * personalDiscountSum / 100)
        subDiscount = subDiscount + discount
      }
      this.setTotalDiscount(subDiscount);
      this.setTotalPrice(subTotal)
      return subTotal.toFixed(2);//type string
    },
    today() {
      let date = new Date();
      return this.$moment(String(date)).format('MMMM Do YYYY, h:mm');
    },
    delivery_options() {
      let that = this;
      let options = this.all_delivery_options.filter(function (option) {
        return option.minPrice <= that.totalPrice || 0;
      })
      return options;
    },
    filteredProducts() {
      return this.products.filter((product) => {
        return product.name.toLowerCase().includes(this.search_product.toLowerCase())
      })
    },
    filteredClients() {
      return this.clients.filter((client) => {
        return client.name.toLowerCase().includes(this.search_client.toLowerCase())
      })
    },
    filteredManager() {
      return this.managers.filter((manager) => {
        return manager.name.toLowerCase().includes(this.search_manager.toLowerCase())
      })
    },
    dateOffset() {
      if (!(this.new_order.dateStart.formatted && this.new_order.dateEnd.formatted)) return
      const start = new Date(this.new_order.dateStart.formatted);
      const end = new Date(this.new_order.dateEnd.formatted);

      return end.getDate() - start.getDate()
    },
    totalSample() {
      if (!this.new_order.sample) return {
        total: 0,
        income: 0,
        result: 0
      }
      const sample = this.new_order.sample.details[0]
      const totalSample = parseInt(sample.sewing) + parseInt(sample.kroy) + parseInt(sample.overlok) + parseInt(sample.rasposhivalka) + parseInt(sample.vengerka) + parseInt(sample.beltclipper) + parseInt(sample.petla) + parseInt(sample.iron) + parseInt(sample.otk) + parseInt(sample.package) + parseInt(sample.buttons) + parseInt(sample.technolog) + parseInt(sample.consumption) + parseInt(sample.furnitura)
      return {
        total: totalSample,
        income: sample.income * this.new_order.quantity,
        incomeOne: sample.income,
        result: totalSample + +sample.income
      }
    },
  },
  methods: {
    changeStatus(e) {
      this.selectedStatus = e.target.value;
    },
    setTotalPrice(totalPrice) {
      this.totalPriceData = totalPrice
    },
    removeSize(index) {
      this.new_order.sizes.splice(index, 1);
    },
    isNumeric(str) {
      if (typeof str != "string") return false // we only process strings!
      return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    },
    addNewSize() {
      if (this.sizeObject.size.length < 1) {
        this.addSizeError = "Заполните поле Размер";
        return;
      }

      if (this.sizeObject.quantity.length < 1 || !this.isNumeric(this.sizeObject.quantity)) {
        this.addSizeError = "Заполните поле Количество";
        return;
      }

      this.new_order.sizes.push({ ...this.sizeObject });
      let quantityResult = 0
      this.new_order.sizes.map((item) => quantityResult += +item.quantity)
      this.new_order.quantity = quantityResult
      for (const property in this.sizeObject) {
        this.sizeObject[property] = "";
      }
      this.addSizeError = "";
    },
    canelSample() {
      this.new_order.sample = null
    },
    unSetPersonalDiscount() {
      this.new_order.personalDiscount = {
        percent: true,
        sum: 0,
      }
    },
    setTotalNonDiscounted(totalNonDiscounted) {
      this.totalNonDiscounted = totalNonDiscounted.toFixed(2);
    },
    setTotalDiscount(discount) {
      this.totalDiscount = discount.toFixed(2);
    },
    setUsedPoints(points) {
      this.client.points.quantity = points.toFixed(2);
    },
    unSetUsedPoints() {
      this.client.points.quantity = 0;
    },
    setBranch(obj) {
      if (obj) {
        this.selectedBranchObject = obj;
      }
    },
    setSelectedDeliveryOption(obj) {
      if (obj) {
        this.selectedDeliveryOptionObject = obj;
        this.showDeliveryOption = false;
      }
    },
    unSetSelectedDeliveryOption() {
      this.selectedDeliveryOptionObject = {};
      this.showDeliveryOption = false;
    },
    cancel() {
      $('#add-order').modal("hide")
      this.resetData();
    },
    save() {
      //validate
      if (!this.new_order.sample) {
        this.$warningAlert('Выберите образец');
        return;
      }
      if ((Object.keys(this.client.clientObj).length === 0) && (!this.guestMode)) {
        this.$warningAlert('Выберите клиента');
        return;
      }
      if (!this.new_order.manager) {
        this.$warningAlert('Выберите менеджера');
        return;
      }
      if (this.new_order.deliveryType === "self") {
        if (Object.keys(this.selectedBranchObject).length === 0) {
          this.$warningAlert('Выберите пункт выдачи');
          return;
        }
      } else {
        if (Object.keys(this.selectedDeliveryOptionObject).length < 3) {
          this.$warningAlert('Добавьте метод доставки');
          return;
        }
        if (this.new_order.address.length < 1) {
          this.$warningAlert('Напишите адрес');
          return;
        }
      }

      if (this.editState) {
        let order = this.selected_order;
        let sizes = this.new_order.sizes.length ? this.sizes : null;
        let data = {
          client: this.client.clientObj._id,
          manager: this.new_order.manager._id,
          delivery: this.selectedDeliveryOptionObject._id,
          sample: this.new_order.sample,
          points: this.client.points.quantity,
          status: this.selectedStatus,
          address: this.new_order.address,
          deliveryType: this.new_order.deliveryType,
          notes: this.new_order.notes,
          branch: this.selectedBranchObject._id,
          personalDiscount: this.new_order.personalDiscount,
          guest: this.guest,
          dateStart: this.new_order.dateStart.obj,
          dateEnd: this.new_order.dateEnd.obj,
          deliveryPrice: this.selectedDeliveryOptionObject.price,
          totalDiscount: this.totalDiscount,
          totalPrice: this.totalPriceData,
          quantity: this.new_order.quantity,
          sizes: sizes,
          old_order: order,
          prepay: this.new_order.prepay
        }

        this.axios.put(this.url('updateOrder', this.editOrderId), data)
          .then(() => {
            this.getOrders();
            this.$successAlert('Заказ успешно изменен');
            $('#add-order').modal("hide");
            this.resetData();
          }).catch((error) => {
            console.log(error);
            if (error.response && error.response.data) {
              this.$warningAlert(error.response.data.msg)
            }
          });
      } else {
        let sizes = this.new_order.sizes.length ? this.new_order.sizes : null;
        let data = {
          client: this.client.clientObj._id,
          manager: this.new_order.manager._id,
          delivery: this.selectedDeliveryOptionObject._id,
          sample: this.new_order.sample,
          points: this.client.points.quantity,
          status: this.selectedStatus,
          address: this.new_order.address,
          deliveryType: this.new_order.deliveryType,
          notes: this.new_order.notes,
          branch: this.selectedBranchObject._id,
          personalDiscount: this.new_order.personalDiscount,
          guest: this.guest,
          dateStart: this.new_order.dateStart.obj,
          dateEnd: this.new_order.dateEnd.obj,
          deliveryPrice: this.selectedDeliveryOptionObject.price,
          totalDiscount: this.totalDiscount,
          totalPrice: this.totalPriceData,
          quantity: this.new_order.quantity,
          sizes: sizes,
          prepay: this.new_order.prepay
        }

        this.axios.post(this.url('addOrder'), data)
          .then(() => {
            this.getOrders();
            this.$successAlert('Заказ успешно добавлен');
            $('#add-order').modal("hide");
            this.resetData();
          }).catch((error) => {
            console.log(error);
            if (error.response && error.response.data) {
              this.$warningAlert(error.response.data.msg)
            }
          });
      }

    },
    resetData() {
      this.guestMode = false;
      this.guest = {
        name: '',
        phone: ''
      };
      this.editOrderId = '';
      this.editState = false;
      this.totalNonDiscounted = 0;
      this.totalDiscount = 0;
      this.client = {
        clientObj: {},
        client_status_discount: 0,
        client_status_name: "",
        points: {
          used: false,
          quantity: 0,
        },
      };
      this.selectedBranchObject = {};
      this.showDeliveryOption = false;
      this.selectedDeliveryOptionObject = {
        name: '',
        price: 0,
      };
      this.search_manager = ''
      this.managers = []
      this.orderStatuses = []
      this.new_order = {
        sample: null,
        manager: null,
        address: '',
        sizes: [],
        client: '',
        status: 'New',
        deliveryType: 'self',
        notes: '',
        name: '',
        quantity: 1,
        prepay: 0,
        dateStart: {
          obj: '',
          formatted: '',
        },
        dateEnd: {
          obj: '',
          formatted: '',
        },
        personalDiscount: {
          percent: true,
          sum: 0,
        }
      }
    },
    selectProduct(selected) {
      if (this.new_order.sample) {
        this.$warningAlert('Образец уже добавлен');
        return;
      }
      let that = this
      let deliveryType = selected.deliveryType;
      if (deliveryType == "Pick-up") {
        deliveryType = "self";
      }
      that.new_order.name = selected.name;
      that.new_order.deliveryType = deliveryType;
      that.setSelectedDeliveryOption(selected.deliveryObject);
      that.new_order.address = selected.address;
      that.guest.name = selected.client_name;
      that.guest.phone = selected.client_phone;
      if (selected.client) {
        that.client.clientObj = selected.client;
        that.client.client_status_discount = selected.statusDiscount.discount_percentage || 0;
        that.client.client_status_name = selected.statusDiscount.name || '';
        that.client.points.used = !!selected.points;
        that.client.clientObj.points += selected.points || 0;
      } else {
        that.guestMode = true;
      }
      this.new_order.sample = selected
      this.search_product = '';
    },
    selectClient(id) {
      let that = this;
      this.clients.filter((client) => {
        if (client._id === id) {
          // that.new_order.client = client._id;
          that.client.clientObj = client;
        }
      })
      this.search_client = '';
      ///
      let url = this.url('getClient', id);

      this.axios.get(url).then(function (response) {
        if (response.data.discount) {
          that.client.client_status_discount = response.data.discount.discount_percentage || 0;
          that.client.client_status_name = response.data.discount.name || '';
        } else {
          that.client.client_status_discount = 0;
          that.client.client_status_name = '';
        }
      }).catch(function (error) {
        if (error.response) {
          that.$warningAlert(Object.values(error.response.data.errors))
        }
      });

      ///
    },
    selectManager(id) {
      let that = this;
      this.managers.filter((m) => {
        if (m._id === id) {
          // that.new_order.client = client._id;
          that.new_order.manager = m;
        }
      })
      this.search_manager = '';
    },
    removeManager() {
      this.new_order.manager = null;
    },
    removeClient() {
      // this.new_order.client = {};
      this.client.clientObj = {};
      this.client.client_status_discount = 0;
      this.client.client_status_name = '';
    },
    getProducts() {
      this.axios.get(this.url('getSamplesAll'))
        .then((res) => {
          this.products = res.data.objects;
        })

    },
    getClients() {
      this.axios.get(this.url('getClients'))
        .then((res) => {
          this.clients = res.data.objects;
        })
    },
    getManagers() {
      this.axios.get(this.url('getEmployees'))
        .then((res) => {
          this.managers = res.data.objects;
        })
    },
    getSettings() {
      let that = this;
      this.axios.get(this.url('getSettings'))
        .then((response) => {
          that.all_delivery_options = response.data.deliveries;
          that.all_branches = response.data.branches;
          that.currency = response.data.object.currency;
          that.orderStatuses = response.data.object.orderStatuses
        }).catch(function (error) {
          if (error.response) {
            console.log('setCatalog_settings EERRRor', error.response)
          }
        })
    }
  },
  watch: {
    selected_order: {
      handler(val) {
        //Check if products,delivery,branch still exist
        let that = this;
        if (val !== '') {
          this.editOrderId = val._id;
          this.editState = true;
          that.new_order.notes = val.notes;
          that.new_order.manager = val.manager;
          that.new_order.personalDiscount = val.personalDiscount ? val.personalDiscount : { percent: true, sum: 0, };
          that.searchPromoText = val.promoCodeObject ? val.promoCodeObject.code : '';
          that.setBranch(val.branchObject);
          let deliveryType = val.deliveryType;
          if (deliveryType == "Pick-up") {
            deliveryType = "self";
          }
          that.new_order.deliveryType = deliveryType;
          that.setSelectedDeliveryOption(val.deliveryObject);
          that.new_order.address = val.address;
          that.new_order.name = val.name;
          that.guest.name = val.client_name;
          that.guest.phone = val.client_phone;
          that.new_order.sample = val.sample
          that.new_order.quantity = val.quantity
          that.new_order.prepay = val.prepay
          that.new_order.sizes = val.sizes || []
          that.new_order.hasMultipleTypes = val.sizes ? true : false
          that.selectedStatus = val.status
          if (this.dateStartForm && this.dateEndForm) {
            this.dateStartForm.setDate(new Date(val.dateStart))
            this.dateEndForm.setDate(new Date(val.dateEnd))
          }

          if (val.client) {
            // that.new_order.client = val.client._id;
            that.client.clientObj = val.client;
            that.client.client_status_discount = val.statusDiscount?.discount_percentage || 0;
            that.client.client_status_name = val.statusDiscount?.name || '';
            that.client.points.used = !!val.points;
            that.client.clientObj.points += val.points || 0;
          } else {
            that.guestMode = true;
          }

        } else {
          this.editState = false;
          this.resetData();
        }
      },
      // deep: true,
      immediate: true,
    },
    totalPrice: {
      handler(val, old) {
        if (val < old) {
          this.unSetSelectedDeliveryOption()
        }
      },
      // deep: true,
      immediate: true,
    },
    guestMode: {
      handler(val) {
        if (val) {
          this.client = {
            clientObj: {},
            client_status_discount: 0,
            client_status_name: "",
            points: {
              used: false,
              quantity: 0,
            },
          };
        }
      },
      immediate: true,
    }
  },
  mounted() {
    this.getProducts();
    this.getClients();
    this.getSettings();
    this.getManagers();
    let that = this;
    this.dateStartForm = new this.$lightpick({
      field: document.getElementById('dateStart'),
      format: '',
      lang: 'ru',
      onSelect: (date) => {
        that.new_order.dateStart.obj = date;
        that.new_order.dateStart.formatted = date.format('YYYY-MM-DD');
      }
    });

    this.dateEndForm = new this.$lightpick({
      field: document.getElementById('dateEnd'),
      format: '',
      lang: 'ru',
      onSelect: (date) => {
        that.new_order.dateEnd.obj = date;
        that.new_order.dateEnd.formatted = date.format('YYYY-MM-DD');
      }
    });
    this.imgSrc = this.$server

  },
  beforeCreate() {

  }
}
</script>


<style scoped>
.info-block {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 100%;
  border: 2px solid #616CF5;
  border-radius: 20px;
  margin-right: 2px;
  margin-top: 5px;
}

.info-block span {
  font-size: 22px;
}

.info-block label {}

.btn-center-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.btn-secondary {
  color: #0c0c0c;
  background-color: #f3f6f8;
  border-color: #6c757d;
}

.table-item {
  padding: 10px 5px;
}

.lineThrough {
  text-decoration: line-through;
  font-size: 10px !important;
  color: #B0B0B0;
}

.general-title {
  margin-bottom: 3px;
}

.active_branch {
  border-color: #616CF5 !important;
}

.pick_up_block_item {
  border-radius: 7px;
  padding: 15px;
  margin-bottom: 10px;
  background: #F8F9FF;
  cursor: pointer;
  border: 1px solid #f0f0f0;
}

.pick_up_block_item_address {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #616CF5;
  line-height: 1;
  margin-bottom: 5px;
}

.empty_delivery {
  border-color: red;
}

.delivery_option_class:hover {
  color: #616cf5
}

.delivery_option_wrapper_class {
  position: absolute;
  border: 1px solid #d3d3d3;
  width: 100%;
  background-color: white;
  border-top: none;
  padding: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.pick_up_block_item_wh {
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: #8C94A5;
  line-height: 1;


}

.selected_delivery_option {
  display: flex;
  align-items: center;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;

}

.delivery_option_class {
  cursor: pointer;
  height: 35px;
}

.modal-header .close {
  margin: 0;
  padding: 0;
  margin-top: 7px;
  margin-right: 8px;
}

.client-search {
  width: 100%;
}

.client-search input {
  width: 100%;
  border: none;
  background: none;
}

.search-client-icon {
  margin-right: 10px;
  opacity: 0.5;
}

.empty-img {
  width: 67px;
  height: 54px;
}

.close-client {
  position: absolute;
  right: 30px;
}

.dropup .dropdown-toggle::after {
  display: none;
}

.selects:before {
  content: '';
  background: url("../../assets/clients/slideRight.svg") no-repeat;
  width: 20px;
  height: 20px;
  position: absolute;
  z-index: 88;
  right: 10px;
  transform: rotate(90deg);
  top: 25%;

}

.selects {
  position: relative;

}

.form-control {
  margin-bottom: 15px;
  background: #F8F9FB;
  border: none;

}

/*.promo-btn img{*/
/*  width: 11px;*/
/*  height: 12px;*/
/*}*/
.enter-name-input::placeholder {
  color: #616cf5;
  opacity: 1;
}

.promo-btn {
  background: #F4F4F4;
  /* Stroke */
  width: 40px;
  height: 33px;
  border: 1px solid #D3D3D3;
  box-sizing: border-box;
  border-radius: 5px;
}

.notes {
  margin-bottom: 38px;
}

.guest-name {
  margin-bottom: 15px;
}

.client-sub-title {
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 15px;
}

.point-number {
  font-size: 16px;
  color: #616cf5;
  font-weight: normal;
}

.detail-status span {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #F19C4B;
  margin-right: 5px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.detail-date {
  color: #8C94A5;
  font-size: 14px;

}

.detail-product {
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 24px;
}

.enter-name-input {
  border: 1px solid #616CF5;
  border-radius: 5px;
  height: 45px;
  width: 100%;
  padding: 0 30px;
  margin-bottom: 20px;

}

.main-content-header {
  padding: 5px 5px;
}

.table {
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  padding: 20px 30px;
  margin-bottom: 13px;
}

.quantity {
  border: 1px solid #D3D3D3;
  border-radius: 5px;
  height: 36px;
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.table-content {
  height: calc(100vh - 320px);

}

.cancel {
  width: 120px;
}

.client-box {
  padding: 0 20px;
  background: #F8F9FF;
  border-radius: 5px;
  margin-bottom: 19px;
  height: 80px;
}

.client-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 13px;
}

.name-client {
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 5px;
}

.category {
  color: #8C94A5;
}

.category span {
  color: #000;
  text-transform: capitalize;

}

.line {
  margin: 18px 0;
}

.cashback-input {
  width: 100%;
  margin-bottom: 12px;
}

.payment-list {
  color: #606877;
  margin-bottom: 5px;
}

.payment-list span {
  color: #000;
}

.total-price {
  font-size: 16px;
  font-weight: 600;
}

.reload-code {
  margin-bottom: 20px;
}

@media (max-width: 992px) {
  .modal-dialog {
    width: 100%;
    max-width: 100% !important;
  }
}
</style>