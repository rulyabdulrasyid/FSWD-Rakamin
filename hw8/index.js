var express = require("express");
var app = express();
var pool = require("./queries.js");

var routes = require("./routes.js");

app.use("/", routes);

pool.connect((err, res) => {
  console.log(err);
  console.log("Conected");
});

app.listen(3000);
