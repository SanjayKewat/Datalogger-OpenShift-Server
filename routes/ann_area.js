/**
 * Created by Administrator on 4/25/2014.
 */

var mysql = require('mysql');
var db_confg=require('./mysql_dbconfig');

var mysqlPool  = mysql.createPool({
    
    host: db_confg.DB.host,
    user: db_confg.DB.user,
    password: db_confg.DB.password,
    database: db_confg.DB.database,
    port: db_confg.DB.port,
    multipleStatements:true

});


//,mani='',ann='',shr='',rigar='';



//Here to read data for Accumulator Pressure start
exports.acc = function(req, res,next){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var acc_arr='';
    var rig_id=req.params.rig_id;
    var strQuery = "SELECT * FROM current_table where rig_id='"+rig_id+"'";


    mysqlPool.getConnection(function(err, connection) {

        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'pressure trend page error',
                err:    err.code
            });
        } else {

            connection.query(strQuery, function (err, rows) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'pressure trend page error',
                        err: err.code
                    });
                }
                try {

                    acc_arr = rows[0].acc_pres_in;
                    connection.release();
                }
                catch (err) {
                    console.log("pressure trend page error :" + err);
                    connection.release();
                }
                res.send('&label=' + h + ':' + m + ':' + s + '&value=' + acc_arr + '&Update=1');
            });
        }
    });

};

//Here to read data for Manifold Pressure start
exports.mani = function(req, res){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var mani_arr='';
    var rig_id=req.params.rig_id;
    var strQuery = "SELECT * FROM current_table where rig_id='"+rig_id+"'";


    mysqlPool.getConnection(function(err, connection) {

        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'pressure trend page error',
                err:    err.code
            });
        } else {

            connection.query(strQuery, function (err, rows) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'pressure trend page error',
                        err: err.code
                    });
                }
                try {

                    mani_arr = rows[0].man_pres_in;
                    connection.release();
                }
                catch (err) {
                    console.log("Guage page error :" + err);
                    connection.release();
                }
                res.send('&label=' + h + ':' + m + ':' + s + '&value=' + mani_arr + '&Update=1');
            });
        }
    });
};

//Here to read data for Annular Pressure start
exports.ann = function(req, res){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var ann_arr='';
    var rig_id=req.params.rig_id;
    var strQuery = "SELECT * FROM current_table where rig_id='"+rig_id+"'";


    mysqlPool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'pressure trend page error',
                err:    err.code
            });
        } else {

            connection.query(strQuery, function (err, rows) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'pressure trend page error',
                        err: err.code
                    });
                }
                try {

                    ann_arr = rows[0].ann_pres_in;
                    connection.release();
                }
                catch (err) {
                    console.log("Guage page error :" + err);
                    connection.release();
                }
                res.send('&label=' + h + ':' + m + ':' + s + '&value=' + ann_arr + '&Update=1');
            });
        }
    });

//    console.log('Rig ID '+rig_id);
};


//Here to read data for Shear Boost Pressure start
exports.shear = function(req, res){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var shear_arr='';
    var rig_id=req.params.rig_id;
    var strQuery = "SELECT * FROM current_table where rig_id='"+rig_id+"'";


    mysqlPool.getConnection(function(err, connection) {

        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'pressure trend page error',
                err:    err.code
            });
        } else {
            connection.query(strQuery, function (err, rows) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'pressure trend page error',
                        err: err.code
                    });
                }
                try {

                    shear_arr = rows[0].sb_pres_in;
                    connection.release();
                }
                catch (err) {
                    console.log("Guage page error :" + err);
                    connection.release();
                }
                res.send('&label=' + h + ':' + m + ':' + s + '&value=' + shear_arr + '&Update=1');
            });
        }
    });
};


//Here to read data for Rig Air Pressure start
exports.rig = function(req, res){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var rig_arr='';
    var rig_id=req.params.rig_id;
    var strQuery = "SELECT * FROM current_table where rig_id='"+rig_id+"'";


    mysqlPool.getConnection(function(err, connection) {

        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'pressure trend page error',
                err:    err.code
            });
        } else {

            connection.query(strQuery, function (err, rows) {

                if (err) {
                    console.error(err);
                    res.json({'usr_dts': 500});
                    res.statusCode = 500;
                }
                try {

                    rig_arr = rows[0].air_pres_in;
                    connection.release();
                }
                catch (err) {
                    console.log("Guage page error :" + err);
                    connection.release();
                }
                res.send('&label=' + h + ':' + m + ':' + s + '&value=' + rig_arr + '&Update=1');
            });
        }
    });
};


//Here to read data for All Pressure start
exports.all = function(req, res){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
var acc='',man='',ann='',air='',shr='';
    var rig_id=req.params.rig_id;
    var strQuery = "SELECT * FROM current_table where rig_id='"+rig_id+"'";


    mysqlPool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'pressure trend page error',
                err:    err.code
            });
        } else {
            connection.query(strQuery, function (err, rows) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'pressure trend page error',
                        err: err.code
                    });
                }
                try {

                    acc = rows[0].acc_pres_in;
                    man = rows[0].man_pres_in;
                    ann = rows[0].ann_pres_in;
                    air = rows[0].air_pres_in;
                    shr = rows[0].sb_pres_in;
                    connection.release();
                }
                catch (err) {
                    console.log("Guage page error :" + err);
                    connection.release();
                }
                res.send('&label=' + h + ':' + m + ':' + s + '&value=' + ann + '|' + acc + '|' + man + '|' + air + '|' + shr + '&Update=1');
            });
        }
    });

};

//Here to read data for Responsetime
exports.rsptmdt = function(req, res){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var acc='',man='';
    var rig_id=req.params.rig_id;
    var strQuery = "SELECT * FROM current_table where rig_id='"+rig_id+"'";


    mysqlPool.getConnection(function(err, connection) {

        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'pressure trend page error',
                err:    err.code
            });
        } else {
            connection.query(strQuery, function (err, rows) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'pressure trend page error',
                        err: err.code
                    });
                }
                try {

                    acc = rows[0].acc_pres_in;
                    man = rows[0].man_pres_in;
                    connection.release();
                }
                catch (err) {
                    console.log("Responsetime page error :" + err);
                    connection.release();
                }
                res.send('&label=' + h + ':' + m + ':' + s + '&value=' + man + '|' + acc + '&Update=1&msgTitle=Pressure&msgText=Accumulator Pressure : ' + acc + ' Manifold Pressure : ' + parseInt(man));
            });
        }
    });
};

//Here to read data for CHOKE MANIFOLD page
exports.casing = function(req, res){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    var drll='',cas='',fld2='',fld3='';
   // var rig_id=req.params.rig_id;
    var strQuery = "SELECT * FROM matlab_currnt where id=1";


    mysqlPool.getConnection(function(err, connection) {

        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.json({
                result: 'pressure trend page error',
                err:    err.code
            });
        } else {
            connection.query(strQuery, function (err, rows) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.json({
                        result: 'pressure trend page error',
                        err: err.code
                    });
                }
                try {

                    drll = rows[0].field0;
                    cas = rows[0].field1;
                    fld2 = rows[0].field2;
                    fld3 = rows[0].field3;
                    connection.release();
                }
                catch (err) {
                    console.log("CHOKE MANIFOLD page error :" + err);
                    connection.release();
                }
                res.send('&label=' + h + ':' + m + ':' + s + '&value=' + drll + '|' + cas +'|' + fld2 +'|' + fld3 +'&Update=1');
            });
        }
    });
};