const express = require("express");
const productsRouter = require("./routes/productsRoutes.js");
const userRouter = require("./routes/userRouter");
const connect = require("./config/config");
const DefaultData = require("./config/defaultData");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const app = express();
const env = require("dotenv").config();
connect();

// --------------------------------------------
app.use(express.json());
// app.use(express.static("public/profileImages"));
// app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(path.join(__dirname, "./client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });


app.use(cors());

app.use(cookieParser());
app.use("/", productsRouter);
app.use("/", userRouter);

DefaultData();

//  ---------------------------------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app is runing on ${PORT}`);
});



