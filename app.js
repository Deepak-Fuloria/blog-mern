const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
// const uploadImage = require("./routes/upload");
const formidable = require('formidable');
const path = require("path");
var cors = require('cors')
const fs = require("fs")
dotenv.config();
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")));

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


const uploadImage = (req, res) => {
  const form = new formidable.IncomingForm({
    uploadDir: path.join(__dirname, 'client', 'build', 'temp'),
  });



  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parsing error:', err);
      return res.status(500).send('Error while processing form.');
    }

    var oldpath = files.file.filepath;
    const newpath = path.join(__dirname, 'client', 'build', fields.name);

    fs.rename(oldpath, newpath, function (err) {
      if (err) {
        console.error('File rename error:', err);
        return res.status(500).send('Error while renaming file.');
      }
      else {
        res.send("file uploaded succesfully")
      }
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