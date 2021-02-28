export const planetChartData = {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug','Sep','Ocr'],
        datasets: [
            { // one line graph
                label: 'Number of Moons',
                data: [0, 0, 1, 2, 67, 62, 27, 14],

                borderColor: [
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                    '#36495d',
                ],
                borderWidth: 3
            },
            { // another line graph
                label: 'Planet Mass (x1,000 km)',
                data: [4.8, 12.1, 12.7, 6.7, 139.8, 116.4, 50.7, 49.2],

                borderColor: [
                    '#47b784',
                ],
                borderWidth: 3
            }
        ]
    },
    options: {
        // responsive: true,
        // lineTension: 1,
        // scales: {
        //     yAxes: [{
        //         ticks: {
        //             beginAtZero: true,
        //             padding: 25,
        //         }
        //     }]
        // }
        layout: {
            padding: {
                left: 50,
                right: 0,
                top: 0,
                bottom: 0
            }
        }
    }
}

export default planetChartData;