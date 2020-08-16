const bodyParser = require('body-parser');
const mysql = require('mysql');
const qs = require('querystring');
const http = require('http');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tensor",
  database: "eventdb"
});

con.connect(function(err) {
  if (err) {
      console.error('Error:- ' + err.stack);
      return;
  }
  console.log('Connected Id:- ' + con.threadId);
});

http.createServer( (request, response) => {
  //con.connect();
  


  if (request.method == 'POST') {
    var body = '';

    request.on('data', function (data) {
        body += data;
        var post = qs.parse(body);
        
        // use post['blah'], etc.
        const sql = "INSERT INTO eventapp (firstname, lastname, email, ev_date) VALUES ('" + post['firstname'] + "', '" + post['lastname'] + "', '" + post['email'] + "', '" + post['ev_date'] + "');";
        con.query(sql, (err, result) => {
          if (err) throw err;
          response.statusMessage;
          response.end();
        });
        //con.end();        
    });

/*    
    request.on('end', function () {
        var post = qs.parse(body);
        
        // use post['blah'], etc.
        const sql = "INSERT INTO eventapp (firstname, lastname, email, ev_date) VALUES ('" + post['firstname'] + "', '" + post['lastname'] + "', '" + post['email'] + "', '" + post['ev_date'] + "');";
        con.query(sql, (err, result) => {
          if (err) throw err;
          response.statusMessage;
          //response.end();
        });
        //con.end();
    });
*/  
  }

}).listen(3001);

