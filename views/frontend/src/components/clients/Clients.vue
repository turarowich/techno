<template>
  <div class="client">
    <div class="searchAndButtons">
      <div class="d-flex justify-content-between app-buttons">
        <div class="d-flex align-items-center">
          <!-- <button v-if="check()" class="app-buttons-item adding-btns" data-toggle="modal"
            data-target="#add-client-category"><span>+ Добавить категорию</span></button>
          <button v-if="check()" class="app-buttons-item" data-toggle="modal" data-target="#push-notification "><img
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

            <div class="move-category animate slideIn dropdown-menu" aria-labelledby="dropdownMenuTotal">
              <div class="move-category-item" v-for="cat in clientCategory.slice(1)" :key="cat._id"
                @click="moveCategory(cat._id)">{{ cat.name }}</div>
            </div>
          </div>
          <div class="dropdown filter">
            <button class="dropdown-toggle app-buttons-item mr-0" id="dropdownFilterClient" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false"><img
                src="../../assets/icons/filter.svg"><span>Фильтр</span></button>
            <div class="dropdown-menu animate slideIn  filter-box" aria-labelledby="dropdownFilterClient">
              <form id="form">
                <div class="filter-header">
                  <h3>Фильтры</h3>
                </div>

                <div class="row">
                  <div class="col-lg-6">
                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#register-collapse" role="button"
                        aria-expanded="false" aria-controls="multiCollapseExample1">
                        Дата регистрации
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="register-collapse">
                        <div class="filter-body d-flex">
                          <div class="d-flex align-items-center mr-2">
                            <label>От</label>
                            <div class="calendar d-flex align-items-center">
                              <input v-model="from_register_date" class="calendar-input" id="from-date">
                              <img src="../../assets/icons/Calendar.svg">
                            </div>
                          </div>

                          <div class="d-flex align-items-center">
                            <label>До</label>
                            <div class="calendar d-flex align-items-center">
                              <input v-model="to_register_date" class="calendar-input" id="to-date">
                              <img src="../../assets/icons/Calendar.svg">
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>




                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#last_scaned-collapse" role="button"
                        aria-expanded="false" aria-controls="last_scaned-collapse">
                        Last Scanned
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="last_scaned-collapse">
                        <div class="filter-body d-flex">
                          <div class="d-flex align-items-center mr-2">
                            <label>From</label>
                            <div class="calendar d-flex align-items-center">
                              <input v-model="from_last_scanned_date" class="calendar-input" id="from-date_scan">
                              <img src="../../assets/icons/Calendar.svg">
                            </div>
                          </div>

                          <div class="d-flex align-items-center">
                            <label>To</label>
                            <div class="calendar d-flex align-items-center">
                              <input v-model="to_last_scanned_date" class="calendar-input" id="to-date_scan">
                              <img src="../../assets/icons/Calendar.svg">
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>





                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#purchase-collapse" role="button"
                        aria-expanded="false" aria-controls="multiCollapseExample1">
                        Количество покупок
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="purchase-collapse">
                        <div class="filter-body d-flex">
                          <div class="d-flex align-items-center mr-2">
                            <label>От</label>
                            <input v-model="from_number_purchase" class="cashback-input">
                          </div>

                          <div class="d-flex align-items-center">
                            <label>До</label>
                            <input class="cashback-input" v-model="to_number_purchase">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="collapse" id="category-collapse">
                        <div class="filter-body">
                          <select v-model="category" class="filter-form  form-control long-form-control  form-control-lg"
                            aria-label=".form-select-lg example">
                            <option :value="cat._id" v-for="cat in clientCategory" :key="cat._id">{{ cat.name }}</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#birthday-collapse" role="button"
                        aria-expanded="false" aria-controls="multiCollapseExample1">
                        Дата рождения
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="birthday-collapse">
                        <div class="filter-body">
                          <div class="category"><label class="custom-checkbox"><input ref="client-filter"
                                @click="selectBirthday" id="client-birthday" type="checkbox"><span
                                class="checkmark"></span></label>Show only birthday people</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#recommendation-collapse" role="button"
                        aria-expanded="false" aria-controls="multiCollapseExample1">
                        Number of recommendations
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="recommendation-collapse">
                        <div class="filter-body d-flex">
                          <div class="d-flex align-items-center mr-2">
                            <label>From</label>
                            <input v-model="from_number_purchase" class="cashback-input">
                          </div>

                          <div class="d-flex align-items-center">
                            <label>To</label>
                            <input v-model="to_number_purchase" class="cashback-input">
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#gender-collapse" role="button"
                        aria-expanded="false" aria-controls="multiCollapseExample1">
                        Пол
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="gender-collapse">
                        <div class="filter-body">
                          <div class="radio-toolbar-gender">
                            <div class="d-flex align-items-center mb-2 mr-5">
                              <input ref="client-filter" type="radio" id="radioMen" name="radioGender"
                                @click="gender_client = 'men'">
                              <label for="radioMen"></label>
                              <span class="male">Male</span>
                            </div>
                            <div class="d-flex align-items-center">
                              <input ref="client-filter" type="radio" id="radioWoman" name="radioGender"
                                @click="gender_client = 'woman'">
                              <label for="radioWoman"></label>
                              <span class="male">Female</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#discount-collapse" role="button"
                        aria-expanded="false" aria-controls="multiCollapseExample1">
                        Скидка
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="discount-collapse">
                        <div class="filter-body">
                          <select v-model="discount" class="filter-form  form-control long-form-control  form-control-lg"
                            aria-label=".form-select-lg example">
                            <option v-for="discount in discountList" :key="discount._id"
                              :value="discount.discount_percentage">{{ discount.name }} {{ discount.discount_percentage }} %
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="filter-list" data-toggle="collapse" data-target="#last-collapse" role="button"
                        aria-expanded="false" aria-controls="multiCollapseExample1">
                        Последняя покупка
                        <img src="../../assets/icons/down.svg" class="filter-img">
                      </div>
                      <div class="collapse" id="last-collapse">
                        <div class="filter-body last-filter-body d-flex">
                          <div class="d-flex align-items-center mr-2">
                            <label>From</label>
                            <div class="calendar d-flex align-items-center">
                              <input v-model="from_purchase_date" class="calendar-input" id="from-purchase">
                              <img src="../../assets/icons/Calendar.svg">
                            </div>
                          </div>

                          <div class="d-flex align-items-center">
                            <label>to</label>
                            <div class="calendar d-flex align-items-center">
                              <input v-model="to_purchase_date" class="calendar-input" id="to-purchase">
                              <img src="../../assets/icons/Calendar.svg">
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end align-items-center">
                  <div @click="resetFilter()" class="reset">Стереть</div>
                  <button class="save" @click.prevent="filterSubmit" type="submit">Найти</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div v-if="showMainSearch" class="main-search d-flex align-items-center">
        <img src="../../assets/icons/search-icon.svg">
        <input class="main-input" type="text" placeholder="Поиск..." v-model="search">
      </div>
      <div class="d-flex align-items-center flex-wrap">
        <span class="show-properties" v-if="f_from_register_date !== ''">Register from: {{ f_from_register_date }} <img
            @click="f_from_register_date = ''; from_register_date = ''" src="../../assets/icons/xreset.svg"></span>
        <span class="show-properties" v-if="f_to_register_date !== ''">Register to: {{ f_to_register_date }} <img
            @click="f_to_register_date = ''; to_register_date = ''" src="../../assets/icons/xreset.svg"></span>
        <span class="show-properties" v-if="f_from_last_scanned_date !== ''">Last scanned from:
          {{ f_from_last_scanned_date }} <img @click="f_from_last_scanned_date = ''; from_last_scanned_date = ''"
            src="../../assets/icons/xreset.svg"></span>
        <span class="show-properties" v-if="f_to_last_scanned_date !== ''">Last scanned to: {{ f_to_last_scanned_date }} <img
            @click="f_to_last_scanned_date = ''; to_last_scanned_date = ''" src="../../assets/icons/xreset.svg"></span>
        <span class="show-properties" v-if="f_from_number_purchase !== ''">Number of purchase from:
          {{ f_from_number_purchase }} <img @click="f_from_number_purchase = ''; from_number_purchase = ''"
            src="../../assets/icons/xreset.svg"></span>
        <span class="show-properties" v-if="f_to_number_purchase !== ''">Number of purchase from: {{ f_to_number_purchase }}
          <img @click="f_to_number_purchase = ''; to_number_purchase = ''" src="../../assets/icons/xreset.svg"></span>
        <span class="show-properties" v-if="f_from_purchase_date !== ''">Last purchase from: {{ f_from_purchase_date }} <img
            @click="f_from_purchase_date = ''; from_purchase_date = ''" src="../../assets/icons/xreset.svg"></span>
        <span class="show-properties" v-if="f_to_purchase_date !== ''">Last purchase to: {{ f_to_purchase_date }} <img
            @click="f_to_purchase_date = ''; to_purchase_date = ''" src="../../assets/icons/xreset.svg"></span>
        <span class="show-properties" v-if="f_birthday !== ''">Birthday: {{ f_birthday.slice(5, 10) }} <img
            @click="f_birthday = ''; birthday = ''" src="../../assets/icons/xreset.svg"></span>
        <span class="show-properties" v-if="f_discount !== ''">Discount: {{ f_discount }} % <img
            @click="f_discount = ''; discount = ''" src="../../assets/icons/xreset.svg"></span>
        <span class="show-properties" style="text-transform: capitalize;" v-if="f_gender_client !== ''">Gender:
          {{ f_gender_client }} <img @click="f_gender_client = ''; gender_client = ''"
            src="../../assets/icons/xreset.svg"></span>
        <span v-if="!showMainSearch" @click="resetFilter()" class="reset"
          style="margin-bottom:10px; color:#616cf5 !important;">Reset all</span>
      </div>
    </div>
    <div class="d-flex">
      <!-- <div class="client-category-menu" style="width:24%">

        <div class="category-box">
          <h3 class="category-title">Client category  </h3>
          <input v-model="search_category" placeholder="Search" style="height:35px; margin-bottom:15px"
            class="cashback-input">


          <ul class="list-group">
            <li class="catalog-list" :ref="`menu` + index" v-for="(category, index) in filterCategory" :key="category._id"
              :class="{ active: f_category === category._id }" @click="f_category = category._id">
              <p class="category-text tool-tip" data-toggle="tooltip" data-placement="right" :title="category.name">
                {{ category.name }}
              </p>
              <div class="dropdown dropMenu">
                <div class="dropdown-toggle" id="dropdownMenu" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false">
                  <img v-if="category._id !== '' && category._id !== null" src="../../assets/icons/three-dots.svg">
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownMenu">
                  <ul class="list-group">
                    <li class="list-group-item" data-toggle="modal" data-target="#edit-client-category"
                      @click="selectCategory(category._id)">Edit</li>
                    <li class="list-group-item" @click="deleteCategory(category._id)">Delete</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>


        </div>
      </div> -->
<!--      table-->
      <div class="client-content" style="width:100%">
        <div class="main-content">
          <div class="d-flex main-content-header justify-content-between">
            <div class="table-head d-flex align-items-center client-names">
              <div class="table-head"><label class="custom-checkbox"><input type="checkbox" @change="selectAllClient"
                    class="main_select" v-model="selectAll"><span class="checkmark"></span></label></div>
              ФИО
            </div>
            <div v-if="data_check.birthday_checked" class="table-head" style="width: 12%;">Дата рождения</div>
            <div v-if="data_check.discount_checked" class="table-head" style="width: 10%;">Скидка</div>
            <div v-if="data_check.register_date_checked" class="table-head" style="width: 18%;">Дата регистрации</div>
            <div v-if="data_check.phone_checked" class="table-head client-phone" style="width:14%">Номер телефона</div>
            <div v-if="data_check.total_checked" class="table-head table-link d-flex align-item-center" style="width: 8%;"
              @click="sortByTotal"><span>Total</span> <img class="total-pol total" style="margin-left:5px"
                src="../../assets/icons/polygon.svg"></div>
            <div v-if="data_check.bonus_checked" class="table-head table-link d-flex align-items-center"
              style="width: 8%;" @click="sortByBonus">Бонусы <img class="date-pol" style="margin-left:5px"
                src="../../assets/icons/polygon.svg"></div>
            <div v-if="data_check.last_purchase_checked" class="table-head">Последняя покупка</div>
            <div v-if="data_check.last_scan_checked && scannerStatus" class="table-head" style="width: 5%;">Last Scan
            </div>
            <div  v-if="data_check.number_of_scans_checked && scannerStatus" class="table-head" style="width: 5%;"
              @click="sortByTotalScans"><span>Number of Scans</span> <img class="total-scans-pol" style="margin-left:5px"
                src="../../assets/icons/polygon.svg">
            </div>

            <div v-if="data_check.custom_field_0" class="table-head table-link d-flex align-item-center" style="width: 8%;"
                 @click="sortByCustomField(0)"><span>{{ custom_field_0.fieldName }}</span>
              <img class="custom-field0-pol total" style="margin-left:5px"
                   src="../../assets/icons/polygon.svg">
            </div>
            <div v-if="data_check.custom_field_1" class="table-head table-link d-flex align-item-center" style="width: 8%;"
                 @click="sortByCustomField(1)"><span>{{ custom_field_1.fieldName }}</span>
              <img class="custom-field1-pol total" style="margin-left:5px"
                   src="../../assets/icons/polygon.svg">
            </div>
            <div v-if="data_check.custom_field_2" class="table-head table-link d-flex align-item-center" style="width: 8%;"
                 @click="sortByCustomField(2)"><span>{{ custom_field_2.fieldName }}</span>
              <img class="custom-field2-pol total" style="margin-left:5px"
                   src="../../assets/icons/polygon.svg">
            </div>

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
                      for="total_f">Общий</label></div>
                  <div><label class="custom-checkbox"><input id="last" v-model="data_check.last_purchase_checked"
                        type="checkbox"><span class="checkmark"></span></label><label class="show-fields" for="last">Последняя покупка</label></div>
                  <div><label class="custom-checkbox"><input v-model="data_check.bonus_checked" type="checkbox"
                        id="show-bonus"><span class="checkmark"></span></label> <label class="show-fields"
                      for="show-bonus">Бонусы</label></div>
                  <div><label class="custom-checkbox"><input v-model="data_check.register_date_checked" id="date"
                        type="checkbox"><span class="checkmark"></span></label> <label class="show-fields"
                      for="date">Дата регистрации</label></div>
                  <div><label class="custom-checkbox"><input v-model="data_check.discount_checked" type="checkbox"
                        id="discount"><span class="checkmark"></span></label> <label class="show-fields"
                      for="discount">Скидка</label></div>
                  <div><label class="custom-checkbox"><input v-model="data_check.birthday_checked" id="birthday"
                        type="checkbox"><span class="checkmark"></span></label> <label class="show-fields"
                      for="birthday">Дата рождения</label></div>
                  <div v-if="customFields && custom_field_0.fieldName"><label class="custom-checkbox">
                    <input v-model="data_check.custom_field_0" id="custom_field_0"
                        type="checkbox"><span class="checkmark"></span></label> <label class="show-fields"
                      for="custom_field_0">{{ custom_field_0.fieldName }}</label></div>

                  <div v-if="customFields && custom_field_1.fieldName"><label class="custom-checkbox">
                    <input v-model="data_check.custom_field_1" id="custom_field_1"
                        type="checkbox"><span class="checkmark"></span></label> <label class="show-fields"
                      for="custom_field_1">{{ custom_field_1.fieldName }}</label></div>

                  <div v-if="customFields && custom_field_2.fieldName"><label class="custom-checkbox">
                    <input v-model="data_check.custom_field_2" id="custom_field_2"
                        type="checkbox"><span class="checkmark"></span></label> <label class="show-fields"
                      for="custom_field_2">{{ custom_field_2.fieldName }}</label></div>

                  <div v-if="scannerStatus"><label class="custom-checkbox"><input id="last_scan_f"
                        v-model="data_check.last_scan_checked" type="checkbox"><span
                        class="checkmark"></span></label><label class="show-fields" for="last_scan_f">Last Scan</label>
                  </div>
                  <div v-if="scannerStatus" class="mb-0"><label class="custom-checkbox"><input id="number_of_scans_f"
                        v-model="data_check.number_of_scans_checked" type="checkbox"><span
                        class="checkmark"></span></label><label class="show-fields" for="number_of_scans_f">Number of
                      Scans</label></div>

                </form>
              </div>
            </div>

          </div>
          <div class="table-content">
            <div style="height:100%; " class="d-flex align-items-center" v-if="spinner">
              <Spinner />
            </div>
            <div v-else>
              <ClientItem v-on:checkSelection="checkSelection" v-on:selectClient="selectClient"
                v-on:deleteClient="deleteClient" v-on:viewDetails="viewDetails" :clientList="clientToDisplay"
                :data_check="data_check" :scannerStatus="scannerStatus" />
            </div>


          </div>
          <IndividualPush />
          <PushNotification v-bind:clientList="clientList" />
          <EditClient v-bind:getClients="getClients" v-bind:select_client="select_client" />
          <AddCategory :getCategories="getCategories" />

          <EditCategory :select_category="select_category" :getCategories="getCategories" />

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

  <div class="parent-modal">
    <div class="modal myModal fade" id="clientScanDetailsModal" tabindex="-1" role="dialog"
      aria-labelledby="clientScanDetailsModal" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body ">
            <!-- <button class="btn" style="margin-left: auto;" @click="closeClientDetailsModal">x</button> -->
            <div class="detailsContent">
              <div class="d-flex">
                <span class="scanDetailsFor">Scan details for</span>
                <span class="scanDetailsForName"> {{ clientScanDetailsName }}</span>
                <button class="btn" style="margin-left: auto;margin-top: -5;" @click="closeClientDetailsModal">x</button>
              </div>

              <div class="clientScanDetailsRowHeader">
                <div style="margin-left: 13%;">Client</div>
                <div style="margin-right: 10%;">Date used</div>
              </div>
              <div class="clientScanDetailsRow" v-for="(scan, index) in clientScanDetails" :key="scan._id">
                <div class="clientScanDetailsRow0">
                  <div class="mr-5">{{ index + 1 }} </div>
                  <div>{{ clientScanDetailsName }}</div>
                </div>
                <div>{{ formattedDate(scan.createdAt) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Spinner from "../Spinner";
import ClientItem from "@/components/clients/ClientItem";
import EditClient from "@/modals/client/EditClient";
import AddCategory from "@/modals/client/AddCategory";
import EditCategory from "@/modals/client/EditCategory";
import PushNotification from "@/modals/client/PushNotification";
import IndividualPush from "@/modals/client/IndividualPush";
import Swal from "sweetalert2";
import $ from 'jquery'
export default {
  name: "Clients",
  components: {
    EditClient,
    ClientItem,
    AddCategory,
    EditCategory,
    PushNotification,
    IndividualPush,
    Spinner
  },


  data() {
    return {
      clientScanDetails: [],
      clientScanDetailsName: "",
      spinner: true,
      clientList: [],
      movedCategories: [],
      scannerStatus: false,
      customFields: false,
      custom_field_0:{
        required: false,
        fieldName: '',
        values: ['']
      },
      custom_field_1:{
        required: false,
        fieldName: '',
        values: ['']
      },
      custom_field_2:{
        required: false,
        fieldName: '',
        values: ['']
      },
      data_check: {
        bonus_checked: false,
        last_purchase_checked: false,
        register_date_checked: true,
        birthday_checked: false,
        discount_checked: false,
        phone_checked: false,
        total_checked: false,
        last_scan_checked: false,
        number_of_scans_checked: false,
        custom_field_0: false,
        custom_field_1: false,
        custom_field_2: false,
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
        .filter(client => {
          if (this.f_category) {
            return client.category && client.category._id.includes(this.f_category)
          }
          return true
        })
        .filter(client => {
          if (this.f_birthday) {
            return client.birthDate && client.birthDate.slice(5, 10).includes(this.f_birthday.slice(5, 10))
          }
          return true
        })
        .filter(client => {
          if (this.f_to_register_date === '' && this.f_from_register_date === '') {
            return client
          }
          else if (this.f_from_register_date === '') {
            return new Date(client.createdAt) <= new Date(this.f_to_register_date)
          }
          else if (this.f_to_register_date === '') {
            return new Date(client.createdAt) >= new Date(this.f_from_register_date)
          }
          else if (this.f_to_register_date !== '' && this.f_from_register_date !== '') {
            return (new Date(client.createdAt) >= new Date(this.f_from_register_date) &&
              new Date(client.createdAt) <= new Date(this.f_to_register_date))
          }


        })
        .filter(client => {
          return client.gender.includes(this.f_gender_client)
        })
        .filter(client => {
          if (this.f_to_purchase_date === '' && this.f_from_purchase_date === '') {
            return client
          }
          else if (this.f_from_purchase_date === '') {
            if (client.last_purchase) {
              return new Date(client.last_purchase) <= new Date(this.f_to_purchase_date)
            }
          }
          else if (this.f_to_purchase_date === '') {
            return new Date(client.last_purchase) >= new Date(this.f_from_purchase_date)
          }
          else if (this.f_to_purchase_date !== '' && this.f_from_purchase_date !== '') {
            return (new Date(client.last_purchase) >= new Date(this.f_from_purchase_date) &&
              new Date(client.last_purchase) <= new Date(this.f_to_purchase_date))
          }
        })
        .filter(client => {
          if (this.f_to_number_purchase.length > 0) {
            return +client.number_of_purchase >= this.f_from_number_purchase && +client.number_of_purchase <= this.f_to_number_purchase
          }
          else if (this.f_to_number_purchase === '') {
            return +client.number_of_purchase >= this.f_from_number_purchase;
          }
          else {
            return client
          }
        })
        .filter(client => {
          if (client.discount === null) {
            client.discount = 0;
          }
          return client.discount.toString().includes(this.f_discount.toString())
        })
        .filter(client => {
          if (this.f_to_last_scanned_date === '' && this.f_from_last_scanned_date === '') {
            return client
          }
          else if (this.f_from_last_scanned_date === '') {
            return new Date(client.last_scanned_date) <= new Date(this.f_to_last_scanned_date)
          }
          else if (this.f_to_last_scanned_date === '') {
            return new Date(client.last_scanned_date) >= new Date(this.f_from_last_scanned_date)
          }
          else if (this.f_to_last_scanned_date !== '' && this.f_from_last_scanned_date !== '') {
            return (new Date(client.last_scanned_date) >= new Date(this.f_from_last_scanned_date) &&
              new Date(client.last_scanned_date) <= new Date(this.f_to_last_scanned_date))
          }
        })
        .filter(client => {
          if (this.f_category === "") {
            return client.category === null
          }
          return true
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
    filterCategory() {
      return this.clientCategory.filter((cat) => {
        return cat.name.toLowerCase().includes(this.search_category.toLowerCase())
      })
    },
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
    formattedDate(unformatedDate) {
      const date = new Date(unformatedDate);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');

      return `${day}.${month}.${year} ${hours}:${minutes}`;
    },
    viewDetails(details, name) {
      $('#clientScanDetailsModal').modal('show');
      this.clientScanDetails = details;
      this.clientScanDetailsName = name;
      console.log(details, "===", name)
    },
    closeClientDetailsModal() {
      $('#clientScanDetailsModal').modal('hide');
      this.clientScanDetails = [];
      this.clientScanDetailsName = "";
    },
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
    selectCategory(id) {
      this.clientCategory.map((item) => {
        if (item._id === id) {
          this.select_category = item
        }
      })
    },
    resetFilter() {
      this.category = '';
      this.birthday = '';
      this.gender_client = '';
      this.from_purchase_date = '';
      this.to_purchase_date = '';
      this.from_register_date = '';
      this.from_last_scanned_date = '';
      this.to_register_date = '';
      this.to_last_scanned_date = '';
      this.from_number_purchase = '';
      this.to_number_purchase = '';
      this.discount = '';
      this.filterSubmit()
      document.getElementById('form').reset()
    },
    filterSubmit() {
      this.f_discount = this.discount;
      this.f_category = this.category;
      this.f_gender_client = this.gender_client;
      this.f_birthday = this.birthday;
      this.f_to_register_date = this.to_register_date;
      this.f_to_last_scanned_date = this.to_last_scanned_date;
      this.f_from_register_date = this.from_register_date
      this.f_from_last_scanned_date = this.from_last_scanned_date
      this.f_from_purchase_date = this.from_purchase_date;
      this.f_to_purchase_date = this.to_purchase_date;
      this.f_from_number_purchase = this.from_number_purchase;
      this.f_to_number_purchase = this.to_number_purchase;
      $('.filter-box').removeClass('show')
    },
    selectBirthday() {
      if (document.getElementById('client-birthday').checked) {
        this.birthday = this.$moment().format('YYYY-MM-DD')
      }
      else {
        this.birthday = ''
      }
    },
    sortByBonus() {
      this.clientList.sort((a, b) => this.sorting ? (parseInt(a.points) - parseInt(b.points)) : (parseInt(b.points) - parseInt(a.points)));
      this.sorting = !this.sorting;
      $('.date-pol').toggleClass('active')
      $('.total-pol').removeClass('active')
      $('.total-scans-pol').removeClass('active')
    },
    sortByTotal() {
      this.clientList.sort((a, b) => this.sorting ? (parseInt(a.total) - parseInt(b.total)) : (parseInt(b.total) - parseInt(a.total)));
      this.sorting = !this.sorting;
      $('.total-pol').toggleClass('active')
      $('.date-pol').removeClass('active')
      $('.total-scans-pol').removeClass('active')
    },
    sortByTotalScans() {
      this.clientList.sort((a, b) => this.sorting ? (parseInt(a.scans.length) - parseInt(b.scans.length)) : (parseInt(b.scans.length) - parseInt(a.scans.length)));
      this.sorting = !this.sorting;
      $('.total-scans-pol').toggleClass('active')
      $('.date-pol').removeClass('active')
      $('.total-pol').removeClass('active')
    },
    sortByCustomField(fieldN) {
      const objectFieldName = `custom_field_${fieldN}`
      this.clientList.sort((a, b) =>
          this.sorting ?
              (parseInt(a[objectFieldName] || 0) - parseInt(b[objectFieldName] || 0))
              :
              (parseInt(b[objectFieldName] || 0) - parseInt(a[objectFieldName] || 0))
      );
      this.sorting = !this.sorting;

      $(`.custom-field${fieldN}-pol`).toggleClass('active')
      $('.total-scans-pol').removeClass('active')
      $('.date-pol').removeClass('active')
      $('.total-pol').removeClass('active')
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
        html: 'Are you sure to remove this <br>client',
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
          this.axios.delete(this.url('deleteClient', id))
            .then(() => {
              this.socket.emit('user_deleted', { id })
              this.getClients()
              Swal.fire({
                title: 'Success',
                timer: 1500,
                text: 'Order has been removed',
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
          html: 'Are you sure to remove these<br>clients',
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
            this.axios.delete(this.url('deleteClients'), { data: { objects: this.deletedClients } })
              .then(() => {
                this.deletedClients = []
                this.getClients()
                this.selectAll = false
                this.$successAlert('All clients have been removed')
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
      this.axios.get(this.url('getClients'))
        .then((res) => {
          this.clientList = res.data.objects;
          this.spinner = false;
          console.log(this.clientList, "====================");
          this.clientList.map((item) => {
            item['total'] = item.orders.reduce((acc, it) => acc + it.totalPrice, 0);
            item['number_of_purchase'] = item.orders.length;
            if (item.orders.length > 0) {
              item['last_purchase'] = new Date(Math.max(...item.orders.map(e => new Date(e.createdAt))));
              //new Date(Math.max(...item.orders.map(e => new Date(e.createdAt))))
            }
            if (!item.category) {
              item['category'] = null
            }
            return item;
          })
        })

    },
    getSettings() {
      let that = this;
      this.axios.get(this.url('getSettings'))
        .then((response) => {
          let settings = response.data.object;
          console.log(JSON.stringify(settings))
          that.customFields = settings.customFields || false;
          that.custom_field_0 = settings.custom_field_0;
          that.custom_field_1 = settings.custom_field_1;
          that.custom_field_2 = settings.custom_field_2;
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
    getCategories() {
      this.axios.get(this.url('getCategories') + '?type=client')
        .then((response) => {
          this.clientCategory = response.data.objects;
          this.clientCategory.unshift({ _id: "", name: 'Without category' })
          this.clientCategory.unshift({ _id: null, name: 'All' })
        })
    },
    getDiscounts() {
      this.axios.get(this.url('getDiscounts'))
        .then((res) => {
          this.discountList = res.data.discounts;
        })
    },
    deleteCategory(id) {
      Swal.fire({
        showConfirmButton: true,
        html: 'Are you sure to remove this <br>category',
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
          this.axios.delete(this.url('deleteCategory', id))
            .then(() => {
              this.$successAlert('Category has been deleted')
              this.getCategories()
              const idx = this.clientCategory.findIndex(el => el._id === id);
              this.$refs[`menu${idx - 1}`].click()


            })
        }
      })
    },
    moveCategory(id) {
      this.clientList.forEach((user) => {
        if (user.selected) {
          this.movedCategories.push(user._id)
        }
      });
      if (this.movedCategories.length === 0) {
        this.$warningAlert('Please choose a clients');
      }
      else {

        const submitObj = {
          objects: this.movedCategories,
          category: id
        }
        if (id === "") {
          submitObj['category'] = null;
        }

        this.axios.put(this.url('updateClientsCategory'), submitObj)
          .then(() => {
            this.getClients()
            this.movedCategories = []
            this.$informationAlert("Categories changed")
            this.selectAll = false
          })
      }
    }
  },
  mounted() {
    this.getSettings();
    this.getClients();
    this.getCategories();
    this.getDiscounts();
    $('.filter-list').addClass('collapsed')
    new this.$lightpick({
      field: document.getElementById('from-date'),
      format: 'YYYY-MM-DD',
      autoclose: false,
      onSelect: (date) => {
        this.from_register_date = date.format('YYYY-MM-DD')
      }

    });
    new this.$lightpick({
      field: document.getElementById('to-date'),
      format: 'YYYY-MM-DD',
      autoclose: false,
      onSelect: (date) => {
        this.to_register_date = date.format('YYYY-MM-DD')
      }
    });


    new this.$lightpick({
      field: document.getElementById('from-date_scan'),
      format: 'YYYY-MM-DD',
      autoclose: false,
      onSelect: (date) => {
        this.from_last_scanned_date = date.format('YYYY-MM-DD')
      }

    });
    new this.$lightpick({
      field: document.getElementById('to-date_scan'),
      format: 'YYYY-MM-DD',
      autoclose: false,
      onSelect: (date) => {
        this.to_last_scanned_date = date.format('YYYY-MM-DD')
      }
    });


    new this.$lightpick({
      field: document.getElementById('from-purchase'),
      orientation: 'top',
      format: 'YYYY-MM-DD',
      autoclose: false,
      onSelect: (date) => {
        this.from_purchase_date = date.format('YYYY-MM-DD')
      }
    });
    new this.$lightpick({
      field: document.getElementById('to-purchase'),
      orientation: 'top',
      format: 'YYYY-MM-DD',
      autoclose: false,
      onSelect: (date) => {
        this.to_purchase_date = date.format('YYYY-MM-DD')
      }
    });
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
