const mongoose = require("mongoose");
const connect = async () => {
  await mongoose.connect(
    process.env.DB,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    mongoose.set("strictQuery", false)
  );

  console.log("connected");
};

module.exports = connect;
