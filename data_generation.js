var connection = require('./config/database');
var faker = require('faker');

var data = [];
for(var i = 0; i < 1000; i++){
    data.push([
        faker.name.firstName(),
        faker.internet.password(),
        faker.date.past()
    ]);
}
 
 
var q = 'INSERT INTO users (username, password, created_at) VALUES ?';
 
connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});
 
connection.end();