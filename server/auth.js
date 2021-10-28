const jwt = require("jsonwebtoken");

require("dotenv").config();

const auth = (req, res, next) => {
  let token = req.headers["authorization"];

  console.log("req.headers:");
  console.log(req.headers);
  if (!token) {
    return res.status(400).json({ err: "Acesso Negado" });
  }

  token = token.split(" ").pop();
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ err: "Acesso Negado" });
    }

    console.log(decoded);
    next();
  });
};

module.exports = auth;
