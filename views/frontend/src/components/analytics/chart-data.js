
export const planetChartData = {

    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Ocr','Nov' , 'Dec'],
        datasets: [
            { // one line graph
                label: 'Number of Moons',
                data: [2, 15, 5 ,30, 5, 15, 5, 15, 5, 15,5,20],
                borderColor: [
                    '#616CF5'
                ],
                backgroundColor:'rgba(0,0,0,0)',
                pointBorderColor:'#616cf5',
                borderRadius: 0,
                lineTension: 0,
            }
            ]
    },
    options: {
        responsive: true,
        lineTension: 1,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    padding:25,
                },

            }]
        },
        elements: {
            point: {
                radius: 5,
                pointBackgroundColor:'#616cf5',

            }
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 10,
                bottom: 0
            },


        }
    }
}

export default planetChartData;