/**
 * Created by Administrator on 2/23/2016.
 */

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

$(document).ready(function () {
    $('#txtfr').datetimepicker({
        timepicker: true,
        format: 'Y-m-d H:i'
    });

    $('#txtto').datetimepicker({
        timepicker: true,
        format: 'Y-m-d H:i'
    });





    var to=new Date();
    var predate=new Date();
    predate.setDate(predate.getDate()-30);


    $('#txtfr').val(predate.getFullYear()+"-"+addZero(predate.getMonth()+1)+"-"+addZero(predate.getDate())+" "+addZero(predate.getHours())+":00");
    $('#txtto').val(to.getFullYear()+"-"+addZero(to.getMonth()+1)+"-"+addZero(to.getDate())+" "+addZero(to.getHours())+":00");

    fetchdata($('#txtfr').val(),$('#txtto').val());
    $('#btn').click(function(){
        fetchdata($('#txtfr').val(),$('#txtto').val());
    });


});
var a= 1,a1=1;
function fetchdata(frm,to) {
    var f = new Date(Date.parse(frm));
    var t = new Date(Date.parse(to));

    f= f.getTime()/1000;//converting into unix timestamp
    t= t.getTime()/1000;//converting into unix timestamp
//console.log("From "+frm+"  To  "+to);
    if (f > t) {
        alert('Make sure From Date not be greater than To Date');
    }
    else {



            $('#loading').show();
            $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: '/api/matlab/hist_cht/'+ f + '/' + t,
                success: function (data) {

                    a++;
                    JSON.stringify(data);
                    var str_cate1 = "", Ac = "", Mn = "",fld2="",fld3="",fld4="",dt="";


                    if(data.message.length!=0) {
                        $.each(data.message, function (idx, value) {

                            dt = new Date(value.insert_tmestmp);
                            str_cate1 += dt.toString("dd-MM-yyyy") + " " + dt.toString("HH:mm:ss") + '|';
                            Ac += value.field0 + '|';
                            Mn += value.field1 + '|';
                            fld2 += value.field2 + '|';
                            fld3 += value.field3 + '|';
                            fld4 += value.field4 + '|';

                        });

                         FusionCharts.ready(function () {
                         var visitChart = new FusionCharts({
                         type: 'zoomline',
                         renderAt: 'bop',
                         width: '100%',
                         height: '105%',
                         dataFormat: 'json',
                         dataSource: {
                         "chart": {
                        // "caption": "PRESSURE vs TIME",
                         "paletteColors": "#0075c2,#1aaf5d",
                         "captionFontSize": "16",
                         "subcaptionFontSize": "14",
                         "subcaptionFontBold": "0",
                         "showBorder": "0",
                         "bgColor": "#ffffff",
                         "baseFont": "Helvetica Neue,Arial",
                         "showCanvasBorder": "0",
                         "exportEnabled" :"1",
                         "showShadow": "0",
                         "showAlternateHGridColor": "0",
                         "canvasBgColor": "#ffffff",
                         "outCnvBaseFontSize": "12",
                         "yaxisname": "Pressure",
                         "xaxisname": "Date Time",
                         "yaxisminValue": "1",
                         "yaxismaxValue": "5",
                         "forceAxisLimits" : "1",
                         "pixelsPerPoint": "0",
                         "pixelsPerLabel": "30",
                         "lineThickness": "2",
                         "compactdatamode" : "1",
                         "dataseparator" : "|",
                         "labelHeight": "30",
                         "scrollheight": "10",
                         "flatScrollBars": "1",
                         "scrollShowButtons": "0",
                         "scrollColor": "#cccccc",
                         "legendBgAlpha": "0",
                         "legendBorderAlpha": "0",
                         "legendShadow": "0",
                         "legendPosition":"top",
                         "legendItemFontSize": "14",
                         "legendItemFontColor": "#666666",
                          "chartBottomMargin":"20"
                         },
                         "categories": [{
                         "category":  str_cate1
                         }],
                         "dataset": [
                         {
                         "seriesname": "Temperature",
                          "color":"29abe2",
                          "dashed":"1",
                         "data": Ac

                         },
                         {
                         "seriesname": "pH",
                         "color":"699590",
                         "dashed":"0",
                         "data": Mn
                         },
                         {
                         "seriesname": "Flow Rate(LPM)",
                         "color":"4d4dff",
                         "dashed":"1",
                         "data": fld2
                         },
                         {
                         "seriesname": "Methane Concentration",
                         "color":"1aff1a",
                         "dashed":"0",
                         "data": fld3
                         },
                         {
                             "seriesname": "Volume",
                             "color":"000",
                             "dashed":"1",
                             "visible":"1",//hide 0/show 1 dataset
                             "data": fld4
                         }

                         ]
                         }
                         }).render();
                         });


                    }
                    else
                    {
                        alert('Data not available in selected range. Please check another date range.');
                    }


                    $('#loading').hide();

                }
            });



    }
}
