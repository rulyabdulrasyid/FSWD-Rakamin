const express = require("express");
const errorHandler = require("./middlewares/errorhandler.js");
const app = express();
const port = 3000;

const router = require("./routes/tes.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler); // harus dibawah router

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
