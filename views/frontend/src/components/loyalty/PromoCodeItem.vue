<template>
  <div class="table-item d-flex align-items-center" >
    <div  style="width: 3%;"><label class="custom-checkbox"><input  type="checkbox"  ><span class="checkmark"></span></label></div>
    <div  class="d-flex align-items-center"  style="width: 24%;">
      <div class="table-img">
        <img src="../../assets/img/sneak.webp">
      </div>
      Tom Levins
    </div>

    <div  style="width: 18%;">20%</div>
    <div  style="width: 18%;">WERTGYHUGDLF</div>
    <div  style="width: 18%;">16.06.2020</div>
    <div  style="width: 16%;">12.06.2020</div>

    <div  style="width:3%">
      <div class="dropleft dropMenu">
        <div class="dropdown-toggle" id="dropdownMenuTotal" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img  src="../../assets/icons/three-dots.svg"
                class="three-dots">
        </div>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuTotal">
          <ul class="list-group " >
            <li class="list-group-item">Edit</li>
            <li class="list-group-item">Delete</li>

          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PromoCodeItem"
}
</script>

<style scoped>

</style>