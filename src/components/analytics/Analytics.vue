<template>
  <div class="container-fluid analytics">
    <div class="d-flex justify-content-between app-buttons analytics-btn">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item"><img class="img-btn" src="../../assets/icons/set.svg"><span>Export to Excell </span></button>
      </div>
      <div>
        <button class="app-buttons-item"><img src="../../assets/icons/yesterday.svg"><span>Yesterday</span></button>
        <button class="app-buttons-item"><img src="../../assets/icons/yesterday.svg"><span>Today</span></button>
        <button class="app-buttons-item"><img src="../../assets/icons/yesterday.svg"><span>1 Feb - 13 Feb</span></button>
      </div>
    </div>

    <div class="analytics-wrapper">
      <div class="analytics-box" v-for="item in analytics" :key="item.id">
        <p><img class="mr-2" src="../../assets/icons/coin.svg">{{item.title}}</p>
        <h2 class="analytics-title">{{item.number}}</h2>
      </div>
    </div>

    <div class="graph">
      <h3 class="graph-title">Number and amount of orders</h3>
        <div class="canvas-graph">
            <canvas ref="canvas" id="planet-chart" width="100%"></canvas>
        </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'

export default {
  name: "Analytics",
  data(){
    return{
      analytics:[
        {id:1,title:'The amount of profit', number:4000},
        {id:2,title:'The amount of profit', number:1020},
        {id:3,title:'The amount of profit', number:2000},
        {id:4,title:'The amount of profit', number:12000},
        {id:5,title:'The amount of profit', number:12445},
        {id:6,title:'The amount of profit', number:111234},
        {id:7,title:'The amount of profit', number:44444},
        {id:8,title:'The amount of profit', number:11111},
      ]
    }
  },

  methods: {
   createChart(){
     var ctx = document.getElementById('planet-chart').getContext("2d");

     var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
     gradientStroke.addColorStop(0, '#80b6f4');
     gradientStroke.addColorStop(1, '#f49080');

     var gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
     gradientFill.addColorStop(0, "rgba(97, 108, 245, 1)");
     gradientFill.addColorStop(1, "rgba(255, 255, 255, 0)");

     new Chart(ctx, {
       type: 'line',
       data: {
         labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Ocr','Nov' , 'Dec'],
         datasets: [{
           label: "Data",
           borderColor: '#616CF5',
           pointBorderColor: '#616cf5',
           pointBackgroundColor: '#fff',
           pointHoverBackgroundColor: '#616CF5',
           pointHoverBorderColor: '#616CF5',
           pointBorderWidth: 5,
           pointHoverRadius: 5,
           pointHoverBorderWidth: 1,
           pointRadius: 3,
           lineTension:0,
           fill: true,
           backgroundColor: gradientFill,
           borderWidth: 3,
           data: [2, 15, 12 ,5, 7.5, 15, 2.3, 18.3, 8.9, 15,5,20]
         }]
       },
       options: {
         legend: {
           position: "top"
         },
         padding:{
            top:20
         },
         scales: {
           yAxes: [{
             ticks: {
               fontColor: "rgba(0,0,0,0.5)",
               fontStyle: "bold",
               beginAtZero: true,
               maxTicksLimit: 5,
               padding: 20
             },
             gridLines: {
               drawTicks: false,
               display: true,
               beginAtZero: false
             }

           }],
           xAxes: [{
             time: {

               unit: 'day',
               tooltipFormat: 'lll',
             },
             gridLines: {
               zeroLineColor: "transparent",
               display:false
             },
             ticks: {
               padding: 20,
               fontColor: "rgba(0,0,0,0.5)",
               fontStyle: "bold"
             }
           }]
         }
       }
     });
   }
  },
  mounted() {
    this.createChart();
  }


}
</script>

<style scoped>
.analytics{
  padding-right: 30px;
  padding-left: 30px;
  padding-bottom: 120px;
}
.analytics-wrapper{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
}
.analytics-box{
  width: 25%;
  margin-bottom: 50px;
  position: relative;

}
.analytics-box:nth-child(4):before,
.analytics-box:nth-child(8):before{
  display: none;

}
.analytics-box:before{
  content:'';
  left: 65%;
  top: 50%;
  border: 1px solid #d3d3d3;
  transform: rotate(90deg);
  width: 70px;
  height: 0;
  position: absolute;
}
.analytics-box p{
  color: #8C94A5;
  font-size: 15px;
  margin-bottom: 15px;
}
.analytics-box h2{
  color: #222222;
  font-size: 26px;
}

.analytics-btn{
  margin-bottom: 44px;
}
.graph-title{
  font-size: 20px;
}
.canvas-graph{
  width: 100%;
  height: 400px;
}
@media(max-width:1200px){
  .analytics-box:before{
    display: none;
  }
}

</style>



