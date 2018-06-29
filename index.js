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
  })

  res.json({end: "true"});
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/add', addPixel)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

