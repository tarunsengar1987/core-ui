const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
var crypto = require('crypto');

var cypherKey = "mySecretKey";
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

 encrypt=(text)=>{
  var cipher = crypto.createCipher('aes-256-cbc', cypherKey)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted; //94grt976c099df25794bf9ccb85bea72
}

 decrypt=(text)=>{
  var decipher = crypto.createDecipher('aes-256-cbc',cypherKey)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec; //myPlainText
}

const authJwt = {
  verifyToken: verifyToken,
  encrypt:encrypt,
  decrypt:decrypt
};
module.exports = authJwt;
