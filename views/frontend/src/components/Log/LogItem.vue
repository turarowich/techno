<template>
  <div>
    <div v-for="log, index in logs" :key="index" class="table-item d-flex justify-content-between align-items-center">
      <div class="table-head d-flex align-items-center" style="width: 60%;">
        <img :src="getImgUrl(log.icon)" class="log-img">
        <div>
          <h5 class="operation-title">{{replaceText(log.title)}}</h5>
          <div class="d-flex">
              <span class="operation-desc">{{replaceText(log.description)}}</span>
              <span class="operation-status pl-2" :class="log.valueColor">{{replaceText(log.value)}}</span>
          </div>
        </div>
      </div>
      <div class="table-head" style="width: 20%;">{{log.user}}</div>
      <div class="table-head" style="width: 20%;">{{String(log.createdAt).slice(0,10)}}</div>
    </div>
  </div>
</template>

<script>
export default {
    props:['logs'],
    name: "LogItem",
    data(){
        return{
            icons:{
                add: "log-plus.svg",
                update: "log-edit.svg",
                delete: "log-minus.svg",
                addPoint: "log-point.svg"
            }
        }
    },
    methods:{
        replaceText(text){
            return this.replaceTxt(text, "ru")
        },
         getImgUrl(icon) {
            return require('../../assets/icons/'+this.icons[icon])
        }
    }
}
</script>

<style scoped>
.operation-status{
    font-weight: normal;
    font-size: 14px;
}
.operation-status.done{
    color: #5CBD85;
}
.operation-status.canceled{
    color: #E94A4A;
}
.operation-status.inproccess,.operation-status.inprogress{
    color: #F19C4B;
}
.log-img{
  margin-right: 20px;
  width:40px;
  height:40px;
}
.operation-title{
  font-size: 14px;
  margin-bottom: 3px;
}
.operation-desc{
  color:#858585;
}
.table-item{
  height: 77px;
}
</style>