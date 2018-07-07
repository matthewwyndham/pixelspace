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
  
    client.query(request, values, (e, r) => {
      if (e) {
        console.log("error " + e);
        res.json({success: "false"})
      }
        console.log("Adding to database");
        
      client.end();
    });
    
    // this does insert values into the database at heroku
    // from the webpage
    // I don't know how to give you access to that, or show that without
    // completely finishing the project.
    res.json({x: y, y: y, r: r, g: g, b: b, a: a, username: username});
  }

  function getPixels(req, res) {
    var request = 'SELECT * FROM pixels;';
    client.query(request, (err, res) => {
      if (err) throw err;
      var logs = "";
      for (let row of res.rows) {
        // TODO: turn this into a variable and return it to the user to display on the screen
        console.log(JSON.stringify(row));
      }
      client.end();
    });
    // TODO: fix this to display the rows.
    // currently displays hard coded versions of the data

    // This returns the data in timestamp order, so displaying them with intervals
    // will produce a timelapse. This can be handled with javascript.
    res.json
    ([
      {x: "0", y: "0", r: "255", g: "255", b: "255", a: "1.0", username: "House", t: "2018-06-28 02:40:55.011356+00"},
      {x: "1", y: "1", r: "200", g: "200", b: "200", a: "1.0", username: "House", t: "2018-06-28 02:40:55.011356+00"},
      {x: "2", y: "2", r: "0",   g: "0",   b: "255", a: "1.0", username: "House", t: "2018-06-28 02:40:55.011356+00"},
      {x: "3", y: "3", r: "0",   g: "0",   b: "255", a: "1.0", username: "House", t: "2018-06-28 02:40:55.011356+00"},
      {x: "3", y: "4", r: "255", g: "0",   b: "0",   a: "1.0", username: "House", t: "2018-06-28 02:40:55.011356+00"},
      {x: "4", y: "3", r: "255", g: "0",   b: "0",   a: "1.0", username: "House", t: "2018-06-28 02:40:55.011356+00"},
      {x: "4", y: "4", r: "255", g: "0",   b: "0",   a: "1.0", username: "House", t: "2018-06-28 02:40:55.011356+00"},
      {x: "5", y: "4", r: "255", g: "0",   b: "0",   a: "1.0", username: "House", t: "2018-06-28 02:40:55.011356+00"},
      {x: "4", y: "5", r: "255", g: "0",   b: "0",   a: "1.0", username: "House", t: "2018-06-28 02:40:55.011356+00"},
      {x: "10", y: "11", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "10", y: "12", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "10", y: "13", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "10", y: "14", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "10", y: "15", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "10", y: "16", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "10", y: "17", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "10", y: "18", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "10", y: "19", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "11", y: "10", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "12", y: "10", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "13", y: "10", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "14", y: "10", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "15", y: "10", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "16", y: "10", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "17", y: "10", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "18", y: "10", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},
      {x: "19", y: "10", r: "0", g: "0", b: "255", a: "1.0", username: "House", t: "2018-07-04 02:40:55.011356+00"},

    ]);
  }