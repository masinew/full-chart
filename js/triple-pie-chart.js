function handleTriplePieChart(elementId) {
    var mainElem = document.getElementById(elementId);
    var pie1Elem = document.createElement('div');
    var pie2Elem = document.createElement('div');
    var pie3Elem = document.createElement('div');

    // pie1Elem.style = 'position: relative;';
    pie1Elem.id = 'innerChart';
    pie2Elem.style = "position: absolute;";
    pie3Elem.style = "position: absolute;";

    mainElem.appendChild(pie1Elem);
    mainElem.appendChild(pie2Elem);
    mainElem.appendChild(pie3Elem);

    var pie1 = new google.visualization.PieChart(pie1Elem);
    var pie2 = new google.visualization.PieChart(pie2Elem);
    var pie3 = new google.visualization.PieChart(pie3Elem);


    var innerElem = document.createElement('div');
    mainElem.appendChild(innerElem);
    innerElem.style = "position: absolute;";
    var innerPie = new google.visualization.PieChart(innerElem);
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'name');
    data.addColumn('number', 'count');
    data.addRow(['Champ1', 11]);
    var options = Object.assign({}, getDefaultOptions(), {
        width: '100%',
        height: '100%',
        backgroundColor: {
            fill: 'transparent'
        },
        pieSliceText: 'value',
        tooltip:{
            isHtml: true,
            trigger: 'selection'
        },
        legend: 'none',
        chartArea: {
            left:20,top:65,width:'80%',height:'75%'
        },
        enableInteractivity: false,
        slices: [{color: 'gray'}]
    });
    worker(innerPie, data, options);

    getData(function(result) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'name');
        data.addColumn('number', 'count');
        // data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
        // var data = setupData(data, result);
        data.addRow(['Champ1', 11]);
        data.addRow(['Champ2', 51]);
        var options = Object.assign({}, getDefaultOptions(), {
            pieHole: 0.4,
            width: '100%',
            height: '100%',
            tooltip:{
                isHtml: true,
                trigger: 'selection'
            },
            legend: 'none',
            chartArea: {
                left:20,top:65,width:'80%',height:'75%'
            },
            enableInteractivity: false,
            pieSliceText: 'none'
        });

        function placeMarker(dataTable) {
            var cli = this.getChartLayoutInterface();
            var chartArea = cli.getChartAreaBoundingBox();
            // document.querySelector('#chart_div4').style.top = '10px';
            // document.querySelector('#chart_div4').style.left = '390px';
            // document.querySelector('#chart_div5').style.top = '10px';
            // document.querySelector('#chart_div5').style.left = '200px';
            pie2Elem.style.top = '10px';
            pie2Elem.style.left = '390px';
            pie3Elem.style.top = '10px';
            pie3Elem.style.left = '200px';
            innerElem.style.top = chartArea.top + 'px';
            innerElem.style.left = chartArea.left  + 'px';
        }

        google.visualization.events.addListener(pie1, 'ready',
            placeMarker.bind(pie1, data)
        );
        worker(pie1, data, options);
    });

    getData(function(result) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'name');
        data.addColumn('number', 'count');
        data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
        var data = setupData(data, result);
        var options = Object.assign({}, getDefaultOptions(), {
            pieHole: 0.4,
            width: '100%',
            height: '100%',
            backgroundColor: {
                fill: 'transparent'
            },
            tooltip:{
                isHtml: true,
                trigger: 'selection'
            },
            legend: 'none',
            chartArea: {
                left:20,top:65,width:'80%',height:'75%'                    
            },
            enableInteractivity: false
        });

        worker(pie2, data, options);
    });

    getData(function(result) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'name');
        data.addColumn('number', 'count');
        data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
        var data = setupData(data, result);
        var options = Object.assign({}, getDefaultOptions(), {
            pieHole: 0.4,
            width: '100%',
            height: '100%',
            backgroundColor: {
                fill: 'transparent'
            },
            tooltip:{
                isHtml: true,
                trigger: 'selection'
            },
            legend: 'none',
            chartArea: {
                backgroundColor: 'red',
                left:20,top:65,width:'80%',height:'75%'
            },
            enableInteractivity: false
        });

        worker(pie3, data, options);
    });

    
}