var mysql = require('mysql');

// var connection = mysql.createConnection({
//   host     : 'us-cdbr-iron-east-01.cleardb.net',
//   user     : 'b56c98c7d49815',  //your username
//   password : '9bd4e0f1',
//   database : 'heroku_4a61becf280f591'         //the name of your db
// });

// var connection = mysql.createConnection({
//   host     : 'us-cdbr-iron-east-01.cleardb.net',
//   user     : 'b9ebe1dbbc3988',  //your username
//   password : '8527683d',
//   database : 'heroku_04e7d03ce795c80'         //the name of your db
// });

// module.exports = connection;


"use strict";

var connection;
function handleDisconnect() {
 connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'brickhoff',  //your username
  database : 'foodie'         //the name of your db
 });
  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err.stack);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } else {
    console.log('connected as id ' + connection.threadId);
    }                                   // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
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
module.exports = connection;


