const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

/* 
// how to use the database
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});
*/

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/add', addPixel)
  .get('/allPixels', getPixels) // this will be called by ajax on the main page
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function addPixel(req, res) {
    var x = req.query.x;
    var y = req.query.y;
    var r = req.query.r;
    var g = req.query.g;
    var b = req.query.b;
    var a = req.query.a;
    var username = req.query.username;
    var request = 'INSERT INTO pixels (x, y, r, g, b, a, username) VALUES ($1, $2, $3, $4, $5, $6, $7);' ;
    var values = [x, y, r, g, b, a, username];
  
    client.query(request, values, (err, res) => {
      if (err) {
        console.log("error " + err);
        res.json({success: "false"})
      } else {
        console.log("Adding to database");
        res.json({success: "true"});
      }
      client.end();

    });
    // this does insert values into the database at heroku
    // from the webpage
    // I don't know how to give you access to that
    res.json([{x: x},{y: y},{r: r},{g: g},{b: b},{a: a},{username: username}]);
  }

  function getPixels(req, res) {
    var request = 'SELECT * FROM pixels;';
    client.query(request, (err, res) => {
      if (err) throw err;
      var logs = "";
      for (let row of res.rows) {
        // TODO: turn this into a variable and return it to the user to display on the screen
        logs += JSON.stringify(row);
      }
      res.json(logs); // this does not display
      client.end();
    });

    res.json({pixels: "you got them!"}); // this does display...
  }