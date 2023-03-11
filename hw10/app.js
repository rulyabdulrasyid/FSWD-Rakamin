const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes");
const errorHandler = require("./middlewares/errorhandler.js");

// // UPLOAD
// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, "./uploads");
//   },
//   filename: (req, res, cb) => {
//     cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// //
// app.use("/uploads", express.static("uploads"));
// app.post("/uploads", upload.single("uploads"), (req, res) => {
//   res.json({
//     succes: 1,
//     profile_url: `http://localhost:3000/profile/${req.file.filename}`,
//   });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
