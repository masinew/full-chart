// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});
google.charts.load('current', {'packages':['line']});
google.charts.load('current', {'packages':['table']});
google.charts.load('current', {'packages':['gauge']});

function getData(cb) {
    // $.ajax({
    //     url: "https://my.api.mockaroo.com/chart.json?key=e86ebea0",
    //     method: "GET",
    //     success: function(result) {
    //         cb(result);
    //     }
    // });
    cb(
        [
            {
                "id": 1,
                "name": "Location 1",
                "count": 178,
                "desc": "Location 1"
            },
            {
                "id": 2,
                "name": "Location 2",
                "count": 149,
                "desc": "Location 2"
            },
            {
                "id": 3,
                "name": "Location 3",
                "count": 175,
                "desc": "Location 3"
            }
        ]
    );
}

function worker(chart, data, options) {
    getData(function(result) {
        chart.draw(data, options);
        // setInterval(function() {
        //     getData(function(result) {
        //         var data = setupData(result);
        //         var options = getDefaultOptions();
        //         chart.draw(data, options);
        //     });
        // }, 10000);
    });
}

function setAlwayVisibleTooptip(chart, data) {
    function setAllSelection() {
        chart.setSelection([{row:0,column:null}, {row:1,column:null}, {row:2,column:null}]);
    }

    google.visualization.events.addListener(chart, 'ready', function(e) {
        var numberOfRows = data.getNumberOfRows();
        setAllSelection();
    });

    google.visualization.events.addListener(chart, 'select', function(e) {
        setAllSelection();
    });
}

function getDefaultOptions() {
    return  {
        // title :'People counting',
        width: 600,
        height: 400,
        animation:{
            duration: 700,
            easing: 'out',
        }
    };
}

// function setupData(data, result) {
//     // var data = new google.visualization.DataTable();
//     // data.addColumn('string', 'Topping');
//     // data.addColumn('number', 'Slices');
//     // data.addColumn('number', 'Cost');
//     var colors = getDefaultColor(result.length);
//     for (var index in result) {
//         var row = result[index];
//         // data.addRow([row.colName, row.slices, row.cost]);
//         data.addRow([row.name, row.count, createCustomTooltip(row.desc, colors[index], index)]);
//     }
    
//     return data;
// }

function getDefaultColor(range) {
    var colors = [
        /*"#82b4e0", "#92c4ef", "#b2d0ea", */"#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262","#5574a6","#3b3eac","#b77322","#16d620","#b91383","#f4359e","#9c5935","#a9c413","#2a778d","#668d1c","#bea413","#0c5922","#743411"
    ];

    return colors.filter(function(color, index) {
        if (index >= range) return false;

        return true;
    });
}

// function createCustomTooltip(des, color, index) {
//     return `
//         <div id="tooltip_${index}" style="padding: 8px 8px 8px 8px; width: 110px; border-style: solid; border-color: ${color}; left: 10px !important;">
//             <svg height="1em" width="1em">
//                 <circle cx="5" cy="7" r="5"  fill="${color}" />
//                 Sorry, your browser does not support inline SVG.  
//             </svg> 
//             <font size="2em">${des}</font>
//         </div>
//     `;
// }


// Prepare to handle all charts
function GoogleChart() {
    var defaultOptions = {

    }

    this.getDonutChart = function(elementId) {
        var elem = document.getElementById(elementId);
        return new google.visualization.PieChart(elem);
    }

    this.gethandleComboChart = function(elementId) {
        var elem = document.getElementById(elementId);
        return new google.visualization.ComboChart(elem);
    }

    this.getGaugeChart = function(elementId) {
        var elem = document.getElementById(elementId);
        return new google.visualization.Gauge(elem);
    }
}