<template>
  <div class="parent-modal">
    <div class="modal myModal fade" id="send-push" tabindex="-1" role="dialog" aria-labelledby="send-push" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content category-content" >
          <div class="modal-header category-header align-items-center">
            <h3 class="modal-title">Send push</h3>
              <button type="button" data-dismiss="modal" aria-label="Close" class="close">
              <span aria-hidden="true">
                <img src="../../assets/icons/xBlack.svg" alt="">
              </span>
            </button>
          </div>
          <div class="modal-body category-body">
            <form class="modal-form">
              <label>News</label><br>
              <input  class="cashback-input mb-3"  placeholder="Select news">
              <label>Custom text</label><br>
              <input  class="cashback-input mb-2"  placeholder="Title">
              <textarea class="general-area p-2" placeholder="Description"></textarea>
              <button  class="save">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SendPush"
}
</script>

<style scoped>

.cashback-input{
  width: 100%;
}
.general-area{
  margin-bottom: 30px;
}
.save{
  width: 120px;
}
.under-title{
  color: #8C94A5;
  font-size: 16px;
}
</style>