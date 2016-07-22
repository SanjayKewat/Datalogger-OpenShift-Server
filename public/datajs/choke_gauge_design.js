/**
 * Created by Administrator on 2/23/2016.
 */
//here set all guage maximum value
var max_guage=1000;
var tmp_min=0,tmp_max=100,ph_min= 0,ph_max=15,flw_min= 0,flw_max=600,me_min= 0,me_max=100;

//here display total guage digit
var digit=4;//


//    Drill Pipe Guage Inner
var svg = d3.select("#speedometer")
    .append("svg:svg")
    .attr("width", 500)
    .attr("height", 450);


var gauge = iopctrl.arcslider()
    .radius(125)
    .events(false)
    .indicator(iopctrl.defaultGaugeIndicator);
gauge.axis().orient("out")
    .normalize(true)
    .ticks(10)
    .tickSubdivide(7)
    .tickSize(20, 10, 5)
    .tickPadding(15)
    .scale(d3.scale.linear()
        .domain([tmp_min, tmp_max])
        .range([-2.6 * Math.PI / 3.4, 2.6 * Math.PI / 3.4]));

var segDisplay = iopctrl.segdisplay()
    .width(95)
    .digitCount(digit)
    .negative(true)
    .decimals(1);

svg.append("g")
    .attr("class", "segdisplay")
    .attr("transform", "translate(148, 280)")
    .call(segDisplay);

svg.append("g")
    .attr("class", "rampSweep")
    .style("fill", "#7bdeff");



svg.append("g")
    .attr("class", "gauge")
    .call(gauge);



//  small  Drill Pipe Guage Inner
var svg_s1 = d3.select("#speedometer_s1")
    .append("svg:svg")
    .attr("width", 400)
    .attr("height", 350);


var gauge_s1 = iopctrl.arcslider()
    .radius(100)
    .events(false)
    .indicator(iopctrl.defaultGaugeIndicator);
gauge_s1.axis().orient("out")
    .normalize(true)
    .ticks(10)
    .tickSubdivide(7)
    .tickSize(20, 10, 5)
    .tickPadding(15)
    .scale(d3.scale.linear()
        .domain([tmp_min, tmp_max])
        .range([-2.6 * Math.PI / 3.4, 2.6 * Math.PI / 3.4]));

var segDisplay_s1 = iopctrl.segdisplay()
    .width(77)
    .digitCount(digit)
    .negative(true)
    .decimals(1);

svg_s1.append("g")
    .attr("class", "segdisplay")
    .attr("transform", "translate(130, 240)")
    .call(segDisplay_s1);

svg_s1.append("g")
    .attr("class", "rampSweep")
    .style("fill", "#7bdeff");



svg_s1.append("g")
    .attr("class", "gauge")
    .call(gauge_s1);


//   Casing Guage Inner
//    Second Guage Inner
var svg_2 = d3.select("#speedometer2")
    .append("svg:svg")
    .attr("width", 500)
    .attr("height", 450);



var gauge_2 = iopctrl.arcslider()
    .radius(125)
    .events(false)
    .indicator(iopctrl.defaultGaugeIndicator);
gauge_2.axis().orient("out")
    .normalize(true)
    .ticks(12)
    .tickSubdivide(7)
    .tickSize(20, 10, 5)
    .tickPadding(18)
    .scale(d3.scale.linear()
       .domain([ph_min, ph_max])
        .range([-2.6 * Math.PI / 3.4, 2.6 * Math.PI / 3.4]));

var segDisplay_2 = iopctrl.segdisplay()
    .width(95)
    .digitCount(digit)
    .negative(true)
    .decimals(1);

svg_2.append("g")
    .attr("class", "segdisplay")
    .attr("transform", "translate(148, 280)")
    .call(segDisplay_2);

svg_2.append("g")
    .attr("class", "rampSweep")
    .style("fill", "#7bdeff");



svg_2.append("g")
    .attr("class", "gauge")
    .call(gauge_2);


//  small Casing Guage Inner

var svg_2_s2 = d3.select("#speedometer2_s2")
    .append("svg:svg")
    .attr("width", 400)
    .attr("height", 350);



var gauge_2_s2 = iopctrl.arcslider()
    .radius(100)
    .events(false)
    .indicator(iopctrl.defaultGaugeIndicator);
gauge_2_s2.axis().orient("out")
    .normalize(true)
    .ticks(12)
    .tickSubdivide(7)
    .tickSize(20, 10, 5)
    .tickPadding(15)
    .scale(d3.scale.linear()
       .domain([ph_min, ph_max])
        .range([-2.6 * Math.PI / 3.4, 2.6 * Math.PI / 3.4]));

var segDisplay_2_s2 = iopctrl.segdisplay()
    .width(77)
    .digitCount(digit)
    .negative(true)
    .decimals(1);

svg_2_s2.append("g")
    .attr("class", "segdisplay")
    .attr("transform", "translate(130, 240)")
    .call(segDisplay_2_s2);

svg_2_s2.append("g")
    .attr("class", "rampSweep")
    .style("fill", "#7bdeff");



svg_2_s2.append("g")
    .attr("class", "gauge")
    .call(gauge_2_s2);


//   Casing Guage Inner
//    Third Guage Inner
var svg_3 = d3.select("#speedometer3")
    .append("svg:svg")
    .attr("width", 500)
    .attr("height", 450);



var gauge_3 = iopctrl.arcslider()
    .radius(125)
    .events(false)
    .indicator(iopctrl.defaultGaugeIndicator);
gauge_3.axis().orient("out")
    .normalize(true)
    .ticks(10)
    .tickSubdivide(7)
    .tickSize(20, 10, 5)
    .tickPadding(18)
    .scale(d3.scale.linear()
    .domain([flw_min, flw_max])
        .range([-2.6 * Math.PI / 3.4, 2.6 * Math.PI / 3.4]));

var segDisplay_3 = iopctrl.segdisplay()
    .width(95)
    .digitCount(digit)
    .negative(true)
    .decimals(1);

svg_3.append("g")
    .attr("class", "segdisplay")
    .attr("transform", "translate(148, 280)")
    .call(segDisplay_3);

svg_3.append("g")
    .attr("class", "rampSweep")
    .style("fill", "#7bdeff");



svg_3.append("g")
    .attr("class", "gauge")
    .call(gauge_3);


//  small Casing Guage Inner

var svg_3_s3 = d3.select("#speedometer3_s3")
    .append("svg:svg")
    .attr("width", 400)
    .attr("height", 350);



var gauge_3_s3 = iopctrl.arcslider()
    .radius(100)
    .events(false)
    .indicator(iopctrl.defaultGaugeIndicator);
gauge_3_s3.axis().orient("out")
    .normalize(true)
    .ticks(10)
    .tickSubdivide(7)
    .tickSize(20, 10, 5)
    .tickPadding(15)
    .scale(d3.scale.linear()
       .domain([flw_min, flw_max])
        .range([-2.6 * Math.PI / 3.4, 2.6 * Math.PI / 3.4]));

var segDisplay_3_s3 = iopctrl.segdisplay()
    .width(77)
    .digitCount(digit)
    .negative(true)
    .decimals(1);

svg_3_s3.append("g")
    .attr("class", "segdisplay")
    .attr("transform", "translate(130, 240)")
    .call(segDisplay_3_s3);

svg_3_s3.append("g")
    .attr("class", "rampSweep")
    .style("fill", "#7bdeff");



svg_3_s3.append("g")
    .attr("class", "gauge")
    .call(gauge_3_s3);


//   Casing Guage Inner
//    IV Guage Inner
var svg_4 = d3.select("#speedometer4")
    .append("svg:svg")
    .attr("width", 500)
    .attr("height", 450);



var gauge_4 = iopctrl.arcslider()
    .radius(125)
    .events(false)
    .indicator(iopctrl.defaultGaugeIndicator);
gauge_4.axis().orient("out")
    .normalize(true)
    .ticks(10)
    .tickSubdivide(7)
    .tickSize(20, 10, 5)
    .tickPadding(18)
    .scale(d3.scale.linear()
       .domain([me_min, me_max])
        .range([-2.6 * Math.PI / 3.4, 2.6 * Math.PI / 3.4]));

var segDisplay_4 = iopctrl.segdisplay()
    .width(95)
    .digitCount(digit)
    .negative(true)
    .decimals(1);

svg_4.append("g")
    .attr("class", "segdisplay")
    .attr("transform", "translate(148, 280)")
    .call(segDisplay_4);

svg_4.append("g")
    .attr("class", "rampSweep")
    .style("fill", "#7bdeff");



svg_4.append("g")
    .attr("class", "gauge")
    .call(gauge_4);


//  small Casing Guage Inner

var svg_4_s4 = d3.select("#speedometer4_s4")
    .append("svg:svg")
    .attr("width", 400)
    .attr("height", 350);



var gauge_4_s4 = iopctrl.arcslider()
    .radius(100)
    .events(false)
    .indicator(iopctrl.defaultGaugeIndicator);
gauge_4_s4.axis().orient("out")
    .normalize(true)
    .ticks(10)
    .tickSubdivide(7)
    .tickSize(20, 10, 5)
    .tickPadding(15)
    .scale(d3.scale.linear()
       .domain([me_min, me_max])
        .range([-2.6 * Math.PI / 3.4, 2.6 * Math.PI / 3.4]));

var segDisplay_4_s4 = iopctrl.segdisplay()
    .width(77)
    .digitCount(digit)
    .negative(true)
    .decimals(1);

svg_4_s4.append("g")
    .attr("class", "segdisplay")
    .attr("transform", "translate(130, 240)")
    .call(segDisplay_4_s4);

svg_4_s4.append("g")
    .attr("class", "rampSweep")
    .style("fill", "#7bdeff");



svg_4_s4.append("g")
    .attr("class", "gauge")
    .call(gauge_4_s4);

//    First Guage Outer
var opts = {
    lines: 12, // The number of lines to draw
    angle: 0.25, // The length of each line
    lineWidth: 0.06, // The line thickness
    pointer: {
        length: 0.82, // The radius of the inner circle
        strokeWidth: 0.071, // The rotation offset
        color: '#000000' // Fill color
    },
    limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
    colorStart: '#000000',   // Colors
    colorStop: '#29abe2',    // Stoke color INCREASED with needle
    strokeColor: '#fff',   // Rest of color IN arc
    generateGradient: true

};
var target = document.getElementById('myCanvas'); // your canvas element
var gauge1 = new Donut(target).setOptions(opts); // create sexy gauge!
gauge1.maxValue = tmp_max; // set max gauge value
gauge1.minValue = tmp_min;
gauge1.animationSpeed = 12; // set animation speed (32 is default value)


//small First Guage Outer
var opts_s1 = {

    lines: 12, // The number of lines to draw
    angle: 0.25, // The length of each line
    lineWidth: 0.06, // The line thickness
    pointer: {
        length: 0.82, // The radius of the inner circle
        strokeWidth: 0.071, // The rotation offset
        color: '#000000' // Fill color
    },
    limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
    colorStart: '#000000',   // Colors
    colorStop: '#29abe2',    // Stoke color INCREASED with needle
    strokeColor: '#fff',   // Rest of color IN arc
    generateGradient: true

};
var target_s1 = document.getElementById('myCanvas_s1'); // your canvas element
var gauge1_s1 = new Donut(target_s1).setOptions(opts_s1); // create sexy gauge!
gauge1_s1.maxValue = tmp_max; // set max gauge value
gauge1_s1.minValue = tmp_min;
gauge1_s1.animationSpeed = 12; // set animation speed (32 is default value)


//   II Guage Outer
var opts2 = {
    lines: 12, // The number of lines to draw
    angle: 0.26, // The length of each line
    lineWidth: 0.06, // The line thickness
    pointer: {
        length: 0.82, // The radius of the inner circle
        strokeWidth: 0.071, // The rotation offset
        color: '#000000' // Fill color
    },
    limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
    colorStart: '#000000',   // Colors
    colorStop: '#69959c',    // Stoke color INCREASED with needle
    strokeColor: '#fff',   // Rest of color IN arc
    generateGradient: true

};
var target2 = document.getElementById('myCanvas2'); // your canvas element
var gauge2 = new Donut(target2).setOptions(opts2); // create sexy gauge!
gauge2.maxValue = ph_max; // set max gauge value
gauge2.minValue = ph_min; // set min gauge value
gauge2.animationSpeed = 12; // set animation speed (32 is default value)

//Small II guage
var opts2_s2 = {
    lines: 12, // The number of lines to draw
    angle: 0.26, // The length of each line
    lineWidth: 0.06, // The line thickness
    pointer: {
        length: 0.82, // The radius of the inner circle
        strokeWidth: 0.071, // The rotation offset
        color: '#000000' // Fill color
    },
    limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
    colorStart: '#000000',   // Colors
    colorStop: '#69959c',    // Stoke color INCREASED with needle
    strokeColor: '#fff',   // Rest of color IN arc
    generateGradient: true

};
var target2_s2 = document.getElementById('myCanvas2_s2'); // your canvas element
var gauge2_s2 = new Donut(target2_s2).setOptions(opts2_s2); // create sexy gauge!
gauge2_s2.maxValue = ph_max; // set max gauge value
gauge2_s2.minValue = ph_min; // set min gauge value
gauge2_s2.animationSpeed = 12; // set animation speed (32 is default value)


//   III Guage Outer
var opts3 = {
    lines: 12, // The number of lines to draw
    angle: 0.26, // The length of each line
    lineWidth: 0.06, // The line thickness
    pointer: {
        length: 0.82, // The radius of the inner circle
        strokeWidth: 0.071, // The rotation offset
        color: '#000000' // Fill color
    },
    limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
    colorStart: '#000000',   // Colors
    colorStop: '#4d4dff',    // Stoke color INCREASED with needle
    strokeColor: '#fff',   // Rest of color IN arc
    generateGradient: true

};
var target3 = document.getElementById('myCanvas3'); // your canvas element
var gauge3 = new Donut(target3).setOptions(opts3); // create sexy gauge!
gauge3.maxValue = flw_max; // set max gauge value
gauge3.minValue = flw_min; // set min gauge value
gauge3.animationSpeed = 12; // set animation speed (32 is default value)

//Small III guage
var opts3_s3 = {
    lines: 12, // The number of lines to draw
    angle: 0.26, // The length of each line
    lineWidth: 0.06, // The line thickness
    pointer: {
        length: 0.82, // The radius of the inner circle
        strokeWidth: 0.071, // The rotation offset
        color: '#000000' // Fill color
    },
    limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
    colorStart: '#000000',   // Colors
    colorStop: '#4d4dff',    // Stoke color INCREASED with needle
    strokeColor: '#fff',   // Rest of color IN arc
    generateGradient: true

};
var target3_s3 = document.getElementById('myCanvas3_s3'); // your canvas element
var gauge3_s3 = new Donut(target3_s3).setOptions(opts3_s3); // create sexy gauge!
gauge3_s3.maxValue = flw_max; // set max gauge value
gauge3_s3.minValue = flw_min; // set min gauge value
gauge3_s3.animationSpeed = 12; // set animation speed (32 is default value)

//   IV Guage Outer
var opts4 = {
    lines: 12, // The number of lines to draw
    angle: 0.26, // The length of each line
    lineWidth: 0.06, // The line thickness
    pointer: {
        length: 0.82, // The radius of the inner circle
        strokeWidth: 0.071, // The rotation offset
        color: '#000000' // Fill color
    },
    limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
    colorStart: '#000000',   // Colors
    colorStop: '#1aff1a',    // Stoke color INCREASED with needle
    strokeColor: '#fff',   // Rest of color IN arc
    generateGradient: true

};
var target4 = document.getElementById('myCanvas4'); // your canvas element
var gauge4 = new Donut(target4).setOptions(opts4); // create sexy gauge!
gauge4.maxValue = me_max; // set max gauge value
gauge4.minValue = me_min; // set max gauge value
gauge4.animationSpeed = 12; // set animation speed (32 is default value)

//Small II guage
var opts4_s4 = {
    lines: 12, // The number of lines to draw
    angle: 0.26, // The length of each line
    lineWidth: 0.06, // The line thickness
    pointer: {
        length: 0.82, // The radius of the inner circle
        strokeWidth: 0.071, // The rotation offset
        color: '#000000' // Fill color
    },
    limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
    colorStart: '#000000',   // Colors
    colorStop: '#1aff1a',    // Stoke color INCREASED with needle
    strokeColor: '#fff',   // Rest of color IN arc
    generateGradient: true

};
var target4_s4 = document.getElementById('myCanvas4_s4'); // your canvas element
var gauge4_s4 = new Donut(target4_s4).setOptions(opts4_s4); // create sexy gauge!
gauge4_s4.maxValue = me_max; // set max gauge value
gauge4_s4.minValue = me_min; // set min gauge value
gauge4_s4.animationSpeed = 12; // set animation speed (32 is default value)


var opts_sgnl = {
    lines: 12, // The number of lines to draw
    angle: 0.5, // The length of each line
    lineWidth: 0.08, // The line thickness
    pointer: {
        length: 0.9, // The radius of the inner circle
        strokeWidth: 0.035, // The rotation offset
        color: '#000000' // Fill color
    },
    limitMax: 'false',   // If true, the pointer will not go past the end of the gauge
    colorStart: '#96390B',   // Colors
    colorStop: '#C0C0DB',    // just experiment with them
    strokeColor: '#EEEEEE',   // to see which ones work best for you
    generateGradient: true
};
var target_sgnl = document.getElementById('signal-strength'); // your canvas element
var gauge_sgnl = new Donut(target_sgnl).setOptions(opts_sgnl); // create sexy gauge!
gauge_sgnl.maxValue = 100; // set max gauge value
gauge_sgnl.animationSpeed = 12; // set animation speed (32 is default value)


function chart_plot() {
//    var ly = $(window).height();
//    var lx = $(window).width();
//
//    var chrtht=(440*ly)/1080;

    var dataXMLLine = "<chart formatnumberscale='0'  showRealTimeValue='0' showShadow='0'  showToolTip='1' tooltipbgcolor='fff' tooltipbordercolor='fff' connectNullData='1' dataStreamURL='/press' refreshInterval='1' drawAnchors='3' anchorRadius='3' showBorder='0' chartBottomMargin='30' showLegend='0' legendPosition='below' bgAlpha='0,0' numVDivLines='4' showValues='0' outcnvBaseFontColor='000000' alternateHGridAlpha='100' alternateHGridColor='f2f2f2' canvasBorderThickness='1' canvasBorderAlpha='100' canvasBorderColor='cccccc'  hoverCapBorderColor='f1f1f2' hoverCapBgColor='f1f1f2'  showAnchors='1' canvaspadding='0' showPlotBorder='0' plotborderthickness='1' divlineborderthickness='2' divlinecolor='f1f1f2' divlinealpha='100'><styles><definition><style name='myCaptionFont' type='font' font='Verdana' align='left' size='18' bold='1' underline='1'/></definition><application><apply toObject='Caption' styles='myCaptionFont' /></application></styles><categories><category label='Start'/></categories><dataset seriesName='Channel0' color='29abe2'  lineThickness='2'><set value='0'/></dataset><dataset seriesName='Channel1' color='69959c' dashed='1' lineThickness='2'><set value='0'/></dataset><dataset seriesName='Channel2' color='4d4dff' dashed='1' lineThickness='2'><set value='0'/></dataset><dataset seriesName='Channel3' color='1aff1a' dashed='1' lineThickness='2'><set value='0'/></dataset></chart>";

    /*  document.getElementsByName
     FusionCharts.setCurrentRenderer('javascript');

     var multiline = new FusionCharts('Charts/RealTimeLine.swf', 'chart-2', '100%','105%', '0', '1');
     multiline.setXMLData(dataXMLLine);
     multiline.setTransparent(true);
     multiline.render('multiline');*/

    var multiline = new FusionCharts({
        "type": "realtimeline",
        "renderAt": "multiline",
        "width": "100%",
        "height": "105%",
        "dataFormat": "xml",
        "dataSource": dataXMLLine

    });
    multiline.render();
}
var rig_id=1;
$(function(){



    chart_plot();




});

