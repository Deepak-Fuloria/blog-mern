const jwt = require("jsonwebtoken");

const islogin = (req, res, next) => {
  const SECRET_KEY = process.env.SECRET_KEY;
  //   const token = req.cookies.cookie;
  const token = req.headers.athorization || req.headers.cookie.slice(4);
  // console.log("🚀 ~ file: auth.js:7 ~ islogin ~ token", token);

  if (token === "") {
    {
      res.json({ type: "failed", message: "Invalid token" });
    }
  }

  const decoded = jwt.verify(token, SECRET_KEY);

  if (decoded) {
    req.userData = decoded;
    next();
  } else {
    res.json({ type: "failed", message: "unauthorized user " });
  }
};

module.exports = islogin;
