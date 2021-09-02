<template>
  <div class="container-fluid analytics">
    <div class="d-flex justify-content-between app-buttons analytics-btn">
      <div class="d-flex align-items-center">
        <button class="app-buttons-item"><img class="img-btn" src="../../assets/icons/set.svg"><span>Export to Excell </span></button>
      </div>
      <div>
        <button class="app-buttons-item" @click="selectDate(new Date(), -1)"><img src="../../assets/icons/yesterday.svg"><span>Yesterday</span></button>
        <button class="app-buttons-item" @click="selectDate(new Date())"><img src="../../assets/icons/yesterday.svg"><span>Today</span></button>
        <button class="app-buttons-item"><img src="../../assets/icons/yesterday.svg"><input :value="between_value"  class="date-pick" id="datepicker" readonly></button>
      </div>
    </div>

    <div v-if="spinner">
      <Spinner/>
    </div>
    <div v-else>
      <div class="analytics-wrapper">
        <div class="analytics-box" >
          <p><img class="mr-2" src="../../assets/icons/analytics/spent.svg">Spent with bonuses</p>
          <h2 class="analytics-title">{{analyticsFiltered.spentPoints}}</h2>
        </div>
        <div class="analytics-box" >
          <p><img class="mr-2" src="../../assets/icons/analytics/customer.svg">The amount of discounts</p>
          <h2 class="analytics-title">{{analyticsFiltered.discounts.toFixed(2)}}</h2>
        </div>
        <div class="analytics-box" >
          <p><img class="mr-2" src="../../assets/icons/analytics/check.svg">Average check</p>
          <h2 class="analytics-title">{{analyticsFiltered.averageCheck.toFixed(4)}}</h2>
        </div>
        <div class="analytics-box" >
          <p><img class="mr-2" src="../../assets/icons/analytics/coin.svg">The amount of profit</p>
          <h2 class="analytics-title">{{analyticsFiltered.profit.toFixed(2)}}</h2>
        </div>
        <div class="analytics-box" >
          <p><img class="mr-2" src="../../assets/icons/analytics/numUser.svg">Number of clients</p>
          <h2 class="analytics-title">{{analyticsFiltered.clients}}</h2>
        </div>
        <div class="analytics-box" >
          <p><img class="mr-2" src="../../assets/icons/analytics/middle.svg">Mans</p>
          <h2 class="analytics-title">{{analyticsFiltered.mans}}</h2>
        </div>
        <div class="analytics-box" >
          <p><img class="mr-2" src="../../assets/icons/analytics/middle.svg">Women</p>
          <h2 class="analytics-title">{{analyticsFiltered.women}}</h2>
        </div>
        <div class="analytics-box" >
          <p><img class="mr-2" src="../../assets/icons/analytics/middle.svg">Middle age</p>
          <h2 class="analytics-title">{{analyticsFiltered.middleAge}}</h2>
        </div>

      </div>

      <div class="graph">
        <h3 class="graph-title mb-4">Number and amount of orders</h3>
        <div class="canvas-graph">
          <canvas ref="canvas" id="planet-chart" width="100%"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js'
import Spinner from "../Spinner";
export default {
    name: "Analytics",
  components:{
      Spinner
  },
    data(){
        return{
            spinner: false,
            between_value:'',
            startDate:'',
            endDate:'',
            analytics:[],
            chart:[],
            profitChart: {}
        }
    },
    computed:{
        analyticsFiltered(){
            let new_analytics = {
                profit: 0,
                discounts: 0,
                spentPoints: 0,
                averageCheck: 0,
                clients: 0,
                mans: 0,
                middleAge: 0,
                women:0,
            }
            for(let analytic of this.analytics){
                new_analytics.profit += analytic.profit
                new_analytics.discounts += analytic.discounts
                new_analytics.spentPoints += analytic.spentPoints
                new_analytics.averageCheck += analytic.averageCheck
                new_analytics.clients += analytic.clients
                new_analytics.mans += analytic.mans
                new_analytics.women += analytic.women
                new_analytics.middleAge += analytic.middleAge
            }
            if(new_analytics.middleAge && new_analytics.clients){
                new_analytics.middleAge = parseInt(new_analytics.middleAge / new_analytics.clients);
            }
            return new_analytics
        }, 
        datesDiffArray(){
            let start = this.$moment(this.startDate);
            let end = this.$moment(this.endDate);
            let diff = end.diff(start, 'days')
            let datesValue = {
                dates: [],
                values: [],
            }
            for (let index = 0; index <= diff; index++) {
                let startFormat = start.add(index ? 1 : 0, 'days').format("YYYY-MM-DD")
                datesValue.dates.push(startFormat.slice(5,10))
                if(this.chart[startFormat]){
                    datesValue.values.push(this.chart[startFormat])
                }else{
                    datesValue.values.push(0)
                }
                
            }
            
            return datesValue;
        },
        getAnalyticsProfit(){
            return this.analytics.map(analytic => analytic.profit)
        },
        getAnalyticsMaxProfit(){
            return Math.max.apply(Math, this.datesDiffArray.values)
        }
    },
    methods: {
    updateChart(){
        let dates = this.datesDiffArray.dates 
        dates.unshift(0); dates.push("   ");
        let profit = this.datesDiffArray.values
        profit.unshift(0); profit.push(0);
        let maxProfit = this.getAnalyticsMaxProfit
        this.profitChart.data.labels = dates;
        this.profitChart.data.datasets[0].data = profit;
        console.log(maxProfit,this.profitChart.options)
        this.profitChart.options.scales.yAxes[0].ticks.max = maxProfit
        this.profitChart.update();
    },
    createChart(){
        var ctx = document.getElementById('planet-chart').getContext("2d");
        ctx.height = 500;
        var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, '#f49080');

        var gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
        gradientFill.addColorStop(0, "rgba(97, 108, 245, 0.2)");
        gradientFill.addColorStop(1, "rgba(255, 255, 255, 0)");

        let dates = this.datesDiffArray.dates 
        dates.unshift(0); dates.push("   ");
        let profit = this.datesDiffArray.values
        profit.unshift(0); profit.push(0);

        this.profitChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: "",
                borderColor: '#616CF5',
                pointBorderColor: '#616cf5',
                pointBackgroundColor: '#fff',
                pointHoverBackgroundColor: '#616CF5',
                pointHoverBorderColor: '#616CF5',
                pointBorderWidth: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 1,
                pointRadius: 3,
                fill: true,
                backgroundColor: gradientFill,
                borderWidth: 3,
                data: profit
            }]
        },
        options: {
            tooltips: {
                callbacks: {
                    label: function(tooltipItem) {
                            return tooltipItem.yLabel;
                    }
                }
            },
            responsive: true,
            legend: {
                position: "top",
                display: false
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
                        padding: 20,
                        maxTicksLimit: 5,
                        max: this.getAnalyticsMaxProfit,
                        min:0
                    },
                    gridLines: {
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
    },
    getDate(){
        this.axios.get(this.url('getAnalytics'),{ 
            params: {
                start: this.startDate,
                end: this.endDate
            }
        }).then((response)=>{

            this.analytics = response.data.objects;
            this.chart = response.data.chart;

            this.updateChart();
        }).catch((error)=>{
            if(error.response && error.response.data){
                this.$warningAlert(error.response.data.msg)
            }
        });
    },
    selectDate(date, add_day=0){
        this.startDate = this.$moment(date).add(add_day, "days").format("YYYY-MM-DD")
        this.endDate = this.$moment(date).add(add_day, "days").format("YYYY-MM-DD")
        this.between_value = this.startDate + ' to ' + this.endDate;
        this.getDate()
    }
  },
  mounted() {
    this.createChart();
    new this.$lightpick({
        field: document.getElementById('datepicker'),
        singleDate: false,
        numberOfMonths: 2,
        numberOfColumns:2,
        format:'YYYY-MM-DD',
        onSelect: (start,end)=>{
          var str = '';
          str += start ? start.format('YYYY-MM-DD') + ' to ' : '';
          str += end ? end.format('YYYY-MM-DD') : '...';
          this.between_value = str;
          
          this.startDate = start.format('YYYY-MM-DD')
          if(end){
              this.endDate = end.format('YYYY-MM-DD')
              this.getDate()
          }
      }
    });
    let to_date = this.$moment().subtract(1, "days").format("YYYY-MM-DD")
    let from_date = this.$moment().format('YYYY-MM-DD')
    if(localStorage.getItem('startDate')){
        to_date = localStorage.getItem('startDate')
    }
    if(localStorage.getItem('ednDate')){
        from_date = localStorage.getItem('ednDate')
    }
    this.between_value = to_date + ' to ' + from_date;
    this.startDate = to_date
    this.endDate = from_date
    this.getDate()
  }
}
</script>

<style scoped>
.date-pick{
  width:182px;
  height: 20px;
  background: none;
  border:none;
  cursor:pointer;
  color:#606877;
}
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
  left: 70%;
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



