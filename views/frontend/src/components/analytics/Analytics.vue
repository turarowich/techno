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

    <div class="row ">
      <div  class="col-lg-3 col-md-4 col-sm-4 col-xs-6 analytics-box">
          <p class="analtycs-desc"><img src="../../assets/icons/coin.svg"> The amount of profit</p>
          <h2 class="analytics-title">4000</h2>
      </div>

      <div  class="col-lg-3 col-md-4 col-sm-4 col-xs-6 analytics-box">
        <p class="analtycs-desc"><img src="../../assets/icons/numUser.svg"> The amount of profit</p>
        <h2 class="analytics-title">1020</h2>
      </div>

      <div  class="col-lg-3 col-md-4 col-sm-4 col-xs-6 analytics-box">
        <p class="analtycs-desc"><img src="../../assets/icons/new.svg"> The amount of profit</p>
        <h2 class="analytics-title">2000</h2>
      </div>

      <div  class="col-lg-3 col-md-4 col-sm-4 col-xs-6 analytics-box">
        <p class="analtycs-desc"><img src="../../assets/icons/middle.svg"> The amount of profit</p>
        <h2 class="analytics-title">12000</h2>
      </div>

      <div  class="col-lg-3 col-md-4 col-sm-4 col-xs-6 analytics-box">
        <p class="analtycs-desc"><img src="../../assets/icons/spent.svg"> The amount of profit</p>
        <h2 class="analytics-title">13445</h2>
      </div>

      <div  class="col-lg-3 col-md-4 col-sm-4 col-xs-6 analytics-box">
        <p class="analtycs-desc"><img src="../../assets/icons/customer.svg"> The amount of profit</p>
        <h2 class="analytics-title">111234</h2>
      </div>

      <div  class="col-lg-3 col-md-4 col-sm-4 col-xs-6 analytics-box">
        <p class="analtycs-desc"><img src="../../assets/icons/check.svg"> The amount of profit</p>
        <h2 class="analytics-title">444444</h2>
      </div>

      <div  class="col-lg-3 col-md-4 col-sm-4 col-xs-6 analytics-box">
        <p class="analtycs-desc"><img src="../../assets/icons/orders.svg"> The amount of profit</p>
        <h2 class="analytics-title">111111</h2>
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

  methods: {
   createChart(){
     var ctx = document.getElementById('planet-chart').getContext("2d");

     var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
     gradientStroke.addColorStop(0, '#80b6f4');
     gradientStroke.addColorStop(1, '#f49080');

     var gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
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
           pointBorderWidth: 7,
           pointHoverRadius: 7,
           pointHoverBorderWidth: 1,
           pointRadius: 3,
           lineTension:0,
           fill: true,
           backgroundColor: gradientFill,
           borderWidth: 3,
           data: [2, 15, 5 ,15, 5, 15, 5, 15, 5, 15,5,20]
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
               display: false
             }

           }],
           xAxes: [{
             gridLines: {
               zeroLineColor: "transparent"
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

    // this.renderChart({
    //   type: 'line',
    //   data: {
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Ocr','Nov' , 'Dec'],
    //     datasets: [
    //       { // one line graph
    //         label: 'Number of Moons',
    //         data: [2, 15, 5 ,30, 5, 15, 5, 15, 5, 15,5,20],
    //         borderColor: [
    //           '#616CF5'
    //         ],
    //         backgroundColor:'rgba(0,0,0,0)',
    //         pointBorderColor:'#616cf5',
    //         borderRadius: 0,
    //         lineTension: 0,
    //       }
    //     ]
    //   },
    //   options: {
    //     responsive: true,
    //     lineTension: 1,
    //     scales: {
    //       yAxes: [{
    //         ticks: {
    //           beginAtZero: true,
    //           padding:25,
    //         },
    //
    //       }]
    //     },
    //     elements: {
    //       point: {
    //         radius: 5,
    //         pointBackgroundColor:'#616cf5',
    //
    //       }
    //     },
    //     layout: {
    //       padding: {
    //         left: 0,
    //         right: 0,
    //         top: 10,
    //         bottom: 0
    //       },
    //
    //
    //     }
    //   }
    // })


    this.createChart();
  }


}
</script>

<style scoped>
.analytics{
  padding-right: 30px;
  padding-left: 30px;
  height:100vh;
  overflow-y: auto;
  padding-bottom: 120px;
}
.analtycs-desc{
  color: #8C94A5;
  font-size: 15px;
  margin-bottom: 17px;
}
.analytics-title{
  font-size: 26px;
  color:#222;
}
.analytics-box{
  margin-bottom: 62px;
  position: relative;
}
.row .analytics-box:nth-child(4):before,.row .analytics-box:nth-child(8):before{
  display: none;
}
.analytics-box:before{
  content:'';
  width: 70px;
  height: 0;
  border: 1px solid #D3D3D3;
  transform: rotate(90deg);
  position: absolute;
  bottom: 50%;
  right: 10%;
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



