/**
 * Created by Administrator on 2/23/2016.
 */
var socket = io();
var cond=true,fld5= 0,con_sec= 0,i= 0,k=0;
var drill=0,casing=0,Id_prev=0,field2=0,field3=0,field4=0,field5=0;
$(document).ready(function(){
    socket.on('current_data', function (data) {
//            JSON.stringify(data);

//k++;

        $.each(data.curr_data,function(idx,val){

            //Temperature(0C)
                if(val.field0<0)
                {
                    drill=0;
                }
                else
                {
                    drill=val.field0;
                }


            //pH
                if(val.field1<0)
                {
                    casing=0;
                }
                else
                {
                    casing=val.field1;
                }

                //Flow Rate(LPM)
                if(val.field2<0)
                {
                    field2=0;
                }
                else
                {
                    field2=val.field2;
                }

            //Methance Concentration
                if(val.field3<0)
                {
                    field3=0;
                }
                else
                {
                    field3=val.field3;
                }


                field4=val.field4;
                field5=val.field5;
                con_sec=val.con_sec;
                Id_prev=val.id_prev;

        //console.log('Value '+drill);

        });

      //  fld5=con_sec;

        if(con_sec==0)
        {
            i++;
            if(i==1)
            {
                cond=true;
            }
            else
            {
                cond=false;
            }
        }
        else
        {
            i=0;
        }


/*console.log('K : '+k);
        if(k==60)
        {
            alert('60 sec call');
            k=0;
        }*/

        gauge1.set(parseFloat(drill));gauge1_s1.set(parseFloat(drill));
        gauge2.set(parseFloat(casing)); gauge2_s2.set(parseFloat(casing));
        gauge3.set(parseFloat(field2)); gauge3_s3.set(parseFloat(field2));
        gauge4.set(parseFloat(field3)); gauge4_s4.set(parseFloat(field3));


        segDisplay.value(drill);segDisplay_s1.value(drill);
        gauge.value(drill);gauge_s1.value(drill);

        segDisplay_2.value(casing);segDisplay_2_s2.value(casing);
        gauge_2.value(casing);gauge_2_s2.value(casing);

        segDisplay_3.value(field2);segDisplay_3_s3.value(field2);
        gauge_3.value(field2);gauge_3_s3.value(field2);

        segDisplay_4.value(field3);segDisplay_4_s4.value(field3);
        gauge_4.value(field3);gauge_4_s4.value(field3);


        $('#vlm').text(field4);
        gauge_sgnl.set(parseFloat(field5));
        $('#sgn_text').text(field5+'%');

      //  console.log('cond : '+cond);


            if(cond){
                update_tab(Id_prev);
                cond=false;
                alert('Data Logger Connectivity Lost');

             }


    });
});

function update_tab(id)
{
    $.ajax({
        type: 'PUT',
        contentType: 'application/json',
        url: "/api/matlab/update_matlab_tab/"+id,
        success: function (data) {
           console.log(data.result);
        }
    });

}