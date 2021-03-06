export const planetChartData = {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Ocr'],
        datasets: [
            { // one line graph
                label: 'Number of Moons',
                data: [10, 12, 5, 50, 10, 28, 17, 15, 23, 6],

                borderColor: [
                    '#616CF5',

                ],
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
                }
            }]
        },
        elements: {
            point: {
                radius: 0
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