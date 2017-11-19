function handleDonutChart(elemId) {
    // TODO: Link tooptip to its slice
    var chart = new google.visualization.PieChart(document.getElementById(elemId));
    getData(function(result) {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'name');
        data.addColumn('number', 'count');
        data.addColumn({type: 'string', role: 'tooltip', 'p': {'html': true}});
        var data = setupData(data, result);
        var colors = getDefaultColor(3);
        var options = {
            title :'Overview Report',
            titleTextStyle: {
                color: '#7bb8ed', 
                fontSize: 25
            },
            height: 400,
            width: '100%',
            colors: colors,
            pieHole: 0.4,
            tooltip:{
                isHtml: true,
                trigger: 'selection'
            },
            legend: 'none'
        };
        setAlwayVisibleTooptip(chart, data);
        

        google.visualization.events.addListener(chart, 'ready',
            TooltipLineLinkedToItsSlice.bind(chart, data, elemId)
        );

        google.visualization.events.addListener(chart, 'onmouseover',
            setTooptipLocation
        );

        google.visualization.events.addListener(chart, 'onmouseout',
        setTooptipLocation
    );
        worker(chart, data, options);
    });

    function setTooptipLocation() {
        var container  = document.querySelector('#chart_div');
        var tooltip = container.querySelector('#tooltip_pie_chart_2');
        var pTooltip = tooltip.parentElement;
        pTooltip.style.top = 0;
        pTooltip.style.left = 0;
    }

    function TooltipLineLinkedToItsSlice(dataTable, elemId) {
        var cli = this.getChartLayoutInterface();
        var chartArea = cli.getChartAreaBoundingBox();
        var parent = document.getElementById(elemId).parentElement;
        var newElem = document.createElement('div');
        var slice1 = cli.getBoundingBox('slice#2');
        var tooltip1 = document.getElementById('tooltip_pie_chart_2').getBoundingClientRect();
        for (var i=0; i<dataTable.getNumberOfRows(); i++) {
            var tooltip = document.getElementById('tooltip_pie_chart_' + i).getBoundingClientRect();
            var slice = cli.getBoundingBox('slice#' + i);
            calculatePointLinked(tooltip, slice);
        }

        // var container = document.querySelector('#' + elemId + '  > div:last-child');
        // var tooltip = container.querySelector('div.google-visualization-tooltip');
        // setTooptipLocation();

        parent.appendChild(newElem);
        newElem.style = 'position: absolute';

        var tooltipPointX = (tooltip1.left + tooltip1.width);
        var tooltipPointY = (tooltip1.top + (tooltip1.height / 2));
        
        newElem.style.top = tooltipPointY + 'px';
        newElem.style.left = tooltipPointX + 'px';
        newElem.id = 'champ';
        console.log('slice1');        
        console.log(slice1);
        console.log('tooltip1');
        console.log(tooltip1);
        newElem.innerHTML = `
            <svg height="120" width="120">
                <line x1="0" y1="0" x2="100" y2="100" style="stroke:rgb(255,0,0);stroke-width:2" />
            </svg>
        `;
    }

    function calculatePointLinked(tooltip, slice) {
        // var tooltipX = (tooltip.left + tooltip.width);
        // var tooltipY = (tooltip.top + (tooltip.height / 2));
        var str = calculateTooltipSide(tooltip.left, tooltip.top, slice.left, slice.top);
        console.log(str);

        function calculateTooltipSide(tooltipX, tooltipY, sliceX, sliceY) {
            var resultX = tooltipX - sliceX;
            var resultY = tooltipY - sliceY;
            if (resultX <= 0 && resultY <= 0) {
                return 'left';
            } else if (resultX <= 0 && resultY >= 0) {
                return 'left';
            } else if (resultX >= 0 && resultY <= 0) {
                return 'right';
            } else if (resultX >= 0 && resultY >= 0) {
                return 'right';
            }
        }
    }

    function createCustomTooltip(tooltipMessage, color, index) {
        return `
            <div id="tooltip_pie_chart_${index}" style="padding: 8px 8px 8px 8px; width: 110px; border-style: solid; border-color: ${color}; left: 10px !important;">
                <svg height="1em" width="1em">
                    <circle cx="5" cy="7" r="5"  fill="${color}" />
                    Sorry, your browser does not support inline SVG.  
                </svg> 
                <font size="2em">${tooltipMessage}</font>
            </div>
        `;
    }

    function setupData(data, result) {
        // var data = new google.visualization.DataTable();
        // data.addColumn('string', 'Topping');
        // data.addColumn('number', 'Slices');
        // data.addColumn('number', 'Cost');
        var colors = getDefaultColor(result.length);
        for (var index in result) {
            var row = result[index];
            // data.addRow([row.colName, row.slices, row.cost]);
            data.addRow([row.name, row.count, createCustomTooltip(row.desc, colors[index], index)]);
        }
        
        return data;
    }
}