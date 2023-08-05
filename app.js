const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
// const {uploadImage} = require("./routes/upload");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const formidable = require('formidable');
const path = require("path");
var cors = require('cors')
const fs = require("fs")
dotenv.config();
app.use(express.json());
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(cors())
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/build");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const uploadImage = async (req, res, next) => {
  var form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    var oldpath = files.file.filepath;
    const newPath =
      path.join(__dirname, "./client/build/") + fields.name
    console.log("reached here", newPath)
    fs.rename(oldpath, newPath, function (err) {
      if (err) throw err;
      res.send("file uploaded succesfully")
    });
  });
};



app.post("/upload", uploadImage);
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRoute);
app.use("/categories", categoryRoute);



//  ---------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is runing on ${PORT}`);
});