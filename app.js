const express = require('express'),
 path = require('path'),
favicon = require('serve-favicon'),
logger = require('morgan'),
cookieParser = require('cookie-parser'),
bodyParser = require('body-parser'),
env          = process.env,
debug = require('debug')('testnode:server');



var routes = require('./routes/index');
var users = require('./routes/users');
var fs = require('fs'),
    mysql = require('mysql'),
    connectionsArray = [],
    POLLING_INTERVAL = 1000,
    pollingTimer;

var matlab_route = require('./routes/matlab_route');//module file for perform restfull operation    
var ann_area=require('./routes/ann_area'); // Reading pressure data
var db_confg=require('./routes/mysql_dbconfig'),
    connectionpool  = mysql.createPool({
        
        host: db_confg.DB.host,
        user: db_confg.DB.user,
        password: db_confg.DB.password,
        database: db_confg.DB.database,
        port: db_confg.DB.port

    }),
   connection = mysql.createConnection({
       
        host: db_confg.DB.host,
        user: db_confg.DB.user,
        password: db_confg.DB.password,
        database: db_confg.DB.database,
        port: db_confg.DB.port
    });


var app = express();
// Create our Express router
// get an instance of router
var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');         // here is code to spesify the html page directory
app.engine('html', require('ejs').renderFile);  //render html using ejs module

// apply the routes to our application
app.use('/',router);
//Use route middleware to process requests
// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log('Log each request : ');
    console.log('Method : '+req.method,'Url : '+ req.url);

    // continue doing what we were doing and go to the route
    next();
});


var http = require('http').Server(app);
var io = require('socket.io')(http);


/*
 * REAL TIME SOCKET PART START HERE
 *
 * HERE IT IS THE COOL PART
 * This function loops on itself since there are sockets connected to the page
 * sending the result of the database query after a constant interval
 *
 */

var current_poll=function(){

    var currt_query = connection.query('SELECT * FROM matlab_currnt where id=1'),//reading value for current data.
        current_data = []; // array to store alarm data

    // setting the query listeners
    currt_query
        .on('error', function (err) {
            // Handle error, and 'end' event will be emitted after this as well
            console.log('Error while reading Current table data : '+err);
            current_sockets(err);
        })
        .on('result', function (c_data) {
            // it fills our array looping on each user row inside the db
            current_data.push(c_data);
        })
        .on('end', function () {
            // loop on itself only if there are sockets still connected
            if (connectionsArray.length) {
                pollingTimer = setTimeout(current_poll, POLLING_INTERVAL);

                current_sockets({
                    curr_data: current_data
                });
            }
        });
};

// creating a new websocket to keep the content updated without any AJAX request
io.on('connection', function(socket) {

    console.log('Number of connections:' + connectionsArray.length);
    // starting the loop only if at least there is one user connected
    if (!connectionsArray.length) {
        current_poll();
    }

    socket.on('disconnect', function() {
        var socketIndex = connectionsArray.indexOf(socket);
        console.log('socket = ' + socketIndex + ' disconnected');
        if (socketIndex >= 0) {
            connectionsArray.splice(socketIndex, 1);
        }
    });


    setTimeout(function(){
        socket.send("Hello World");
    }, 1000);

    console.log('A new socket is connected!');
    connectionsArray.push(socket);

});


var current_sockets = function(data) {
    // adding the time of the last update
    data.time = new Date();
    // sending new data to all the sockets connected
    connectionsArray.forEach(function(tmpSocket) {
        tmpSocket.volatile.emit('current_data', data);
    });
};


// REAL TIME SOCKET PART  ending  here



////====>> Fetching data for Fusion chart start =======>>


router.get('/press',ann_area.casing);  //fetch realtime data for Drill pipe & casing pressure


////====>> Fetching data for Fusion chart End=======>>


//START here handling mysql connection when disconnected
function handleDisconnect() {




// If there is an error connecting to the database
    connection.connect(function(err) {
            // connected! (unless `err` is set)
            if(err) {                                     // or restarting (takes a while sometimes).
                console.log('error when connecting to db:', err);
                setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
            }
        });

    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });

};

handleDisconnect();

//END here handling mysql connection when disconnected

//app.use('/', routes);
app.use('/users', users);


app.use('/api/matlab', matlab_route);


router.get('/',function(req, res){
//        console.log('session  exit');
    res.render('choke.html');
});


router.get('/hist',function(req, res){
//        console.log('session  exit');
        res.render('presstrend.html');
});

router.get('/l',function(req, res){
//        console.log('session  exit');
    res.render('live.html');
});


//here calling update_table() every 1 sec
setInterval(function(){
    update_table();

},1000);

//here Function for updating current table Data
function update_table(){

    var getsql="SELECT * FROM matlab_tab order by id desc",curr_sql='',cnd='';
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);

        } else {

            connection.query(getsql, function(err, rows, fields) {
                if (err) {
                    console.error(err);

                }
             var  up_fld0=rows[0].field0;
             var   up_fld1=rows[0].field1;
             var up_fld2=rows[0].field2;
               var up_fld3=rows[0].field3;
                var up_fld4=rows[0].field4;
                var up_fld5=rows[0].field5;
                var load_tme=rows[0].insert_tmestmp;
                var id_prev=rows[0].id;

                var a = new Date(); // Now
                var b = new Date(load_tme); // previous time

                var seconds = Math.round((a-b)/1000);
                console.log('seconds : '+seconds);


                if(seconds>60){ //here condition updating value after 60 seconds
                    curr_sql="update matlab_currnt set con_sec='0',id_prev="+id_prev+",field5='"+up_fld5+"',insert_tmestmp=now() where id=1";
                    cnd=0;
                }
                else
                {
                    curr_sql="update matlab_currnt set field0='"+up_fld0+"',field1='"+up_fld1+"',field2='"+up_fld2+"',field3='"+up_fld3+"',field4='"+up_fld4+"',field5='"+up_fld5+"',id_prev="+id_prev+",con_sec='1',insert_tmestmp=now() where id=1";
                    cnd=1;
                }
                connection.query(curr_sql, function(err, rows, fields) {
                    if (err) {
                        console.error(err);

                    }
                   console.log('matlab_currnt table condtion : '+cnd+' updated successfully');
                    connection.release();
                });
            });
        }
    });
};






http.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});
