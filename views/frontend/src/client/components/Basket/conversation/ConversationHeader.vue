<template>
  <div class="conversation-header d-flex align-items-center">
    <div class="d-flex align-items-center" style="height:60px">
     <svg
      @click="$router.go(-1)"
        style="margin-right: 20px;"
        enable-background="new 0 0 15 26" height="24px" id="Layer_1" version="1.1" viewBox="0 0 15 26" width="12px"
        xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <polygon fill="#616CF5"
          points="12.885,0.58 14.969,2.664 4.133,13.5 14.969,24.336 12.885,26.42 2.049,15.584 -0.035,13.5 " />
      </svg>
      <!-- <img class="user-picture" v-if="contact.avatar" :src="makeImg(contact.avatar)" alt=""> -->
      <img class="user-picture" src="https://cdn-icons-png.flaticon.com/512/925/925025.png">
      <h5 class="contact-name">Mенеджер</h5>
    </div>
    <!-- <h5 class="contact-name" v-else>Select a contact</h5> -->
  </div>
</template>

<script>
export default {
  name: "ConversationHeader",
  props: {
    contact: {
      type: Object
    },
  },
  methods: {
    makeImg(name) {
      return this.img(name)
    }
  },
}
</script>

<style scoped>
.conversation-header {
  border-bottom: 1px solid #e8e8e8;
  padding: 0 20px;
  height: 60px !important;
}

.conversation-header img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  margin-right: 10px;
}

h5 {
  margin: 0;
  font-size: 18px;
  line-height: 38px;
  font-weight: normal;
  height: 41px;
}
</style>