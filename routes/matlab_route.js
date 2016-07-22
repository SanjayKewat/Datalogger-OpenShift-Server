/**
 * Created by Administrator on 6/10/2016.
 */
var express = require('express');
var router = express.Router();
var mysql = require('mysql'),
    db_confg=require('./mysql_dbconfig'),
    connectionpool  = mysql.createPool({
       
        host: db_confg.DB.host,
        user: db_confg.DB.user,
        password: db_confg.DB.password,
        database: db_confg.DB.database,
        port: db_confg.DB.port

    });

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/:field0/:field1/:field2/:field3/:field4', function(req, res) {
//router.get('/:field0/:field1/:field2/:field3/:field4', function(req, res) {
//router.get('/:field0', function(req, res) {
    // Use the Beer model to find a specific beer

 /*   //reading url
    var url=req.url;
    url=url.replace('/','');
    var arr=url.split('&');*/

       //reading parameter
     var url=req.params.field4,percnt;
     var arr=url.split('&');
      var   field4=arr[0];
    if(arr[1]==''){
        percnt=0;
    }else{
        percnt=arr[1];
    }

    //console.log('req.params.field0 '+req.params.field0);
  /*  console.log('arr  '+arr[0]);
    console.log('arr1  '+arr[1]);
    console.log('percnt : '+percnt); */

    percnt=Math.round(percnt*3.235);


    var qrysql="insert into matlab_tab(field0,field1,field2,field3,field4,field5)values('"+req.params.field0+"','"+req.params.field1+"','"+req.params.field2+"','"+req.params.field3+"','"+field4+"','"+percnt+"')";

    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query(qrysql, function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'error',
                        err: err.code
                    });
                }

                res.statusCode = 200;
                res.json({
                    result: 'New Data add successfully',
                    err:    '',
                    fields: fields,
                    json:   rows
//                    length: rows.length

                });
                connection.release();

            });

        }
    });


});

router.get('/hist_cht/:from/:to', function(req, res) {

    var from=req.params.from;
    var to=req.params.to;

    //  console.log(req.params);
    var countQuery = "call sp_count_matlab("+from+","+to+")";
    var tot= 0,intrvl=0;

    var strQuery = function(itvl){
        if(itvl<2)
        {
            itvl=1;
        }

        // console.log("call sp_bop_ptrend("+rigid+",'"+from+"','"+to+"',"+itvl+")");
        return "call sp_matlab("+from+","+to+","+itvl+")";
    };
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'pressure trend page error',
                err:    err.code
            });
        } else {
            connection.query(countQuery, function (err, rows) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'error',
                        err: err.code
                    });
                }
                try {

                    tot = rows[0].length;
                    console.log('count Total Rows : ' + tot);
                    //connection.release();
                }
                catch (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'Error in Pressure Log page ',
                        err: err.code
                    });
                }

                //Round a number downward to its nearest integer:
                intrvl = Math.floor(tot / 1000);
                console.log('Interval Rows : ' + intrvl);


                connection.query(strQuery(intrvl), function (err, rows) {
                    //    console.log('next Total Rows : ' + tot);
                    //   console.log('Interval Rows : ' + intrvl);
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.json({
                            result: 'Error in Pressure Log page ',
                            err: err.code
                        });
                    }
                    try {
                        res.statusCode = 200;
                        res.json({ message: rows[0] });
                        console.log('Total data Rows : ' + rows[0].length);
                        connection.release();
                    }
                    catch (err) {

                        console.error(err);
                        res.statusCode = 500;
                        res.json({
                            result: 'Error in Pressure Log page ',
                            err: err.code
                        });
                        connection.release();
                    }

                });

            });
        }
    });

});

router.put('/update_matlab_tab/:id',function(req,res){


    var qrysql="update matlab_tab set field5=0 where id="+req.params.id;

    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query(qrysql, function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'error',
                        err: err.code
                    });
                }

                res.statusCode = 200;
                res.json({
                    result: 'Row updated successfully',
                    err:    '',
                    fields: fields,
                    json:   rows
//                    length: rows.length

                });
                connection.release();

            });

        }
    });
});

module.exports = router;