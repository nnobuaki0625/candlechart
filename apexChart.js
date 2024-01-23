
let list;
const jsonFilePath = 'edit.json';

fetch(jsonFilePath)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        list = data;

        /// ApexChartsに適合する配列に変換
const ohlcList = []
for (let i = 0; i < list.length; ++i) {
    const rawOhlc = list[i]
    ohlcList.unshift({
        x: new Date(rawOhlc['date']),
        y: [
            rawOhlc['open'],
            rawOhlc['high'],
            rawOhlc['low'],
            rawOhlc['close']
        ]
    })
}

    // オプションの記述
const options = {
    series: [{
        data: ohlcList
    }],
    chart: {
        type: 'candlestick',
        height: 350
    },
    title: {
        text: 'USDJPY Chart',
        align: 'left'
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        tooltip: {
            enabled: true
        },
        min: 147.932,
        max: 148.490
    }
}

// 最終出力の記述
const chart = new ApexCharts(
    document.querySelector("#chart"), options
)
chart.render()




    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
