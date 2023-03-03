var express = require("express");
var app = express();
var pool = require("./queries.js");

var routes = require("./routes.js");

// Menerima request body Json
app.use(express.json());
// Menerima request body urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(routes);

pool.connect((err, res) => {
  console.log(err);
  console.log("Connected");
});

app.listen(3000);
