const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const sendMaiOfUser = require("../middleware/Mail");
const mail = require("../middleware/Mail");
const { encrypt, decrypt } = require("../middleware/authJwt");
const Setting = db.setting;
//User signup
exports.signup = (req, res) => {
  // Save User to Database
  console.log(encrypt(req.body.password));
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: encrypt(req.body.password),
    role: 2,
    status: "Awaiting approval",
    is_active: true,
  })
    .then((user) => {
      console.log("userserr==>",user);
      Setting.findOne().then((data) => {
        console.log("data.setting===>", data.dataValues);
        mail.sendMail(
          user.dataValues,
          decrypt(user.dataValues.password),
          data.dataValues,
          decrypt(data.dataValues.password),
        );
        res.send({ message: "User registered successfully!" });
      });
    })
    .catch((err) => {
      console.log("err.message==>", err.message);
      res.status(500).send({ message: err.message });
    });
};
exports.createUser = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: encrypt(req.body.password),
    role: 2,
    status: "Invited",
    is_active: true,
  })
    .then((user) => {
      Setting.findOne().then((data) => {
        console.log("data.setting===>", data.dataValues);
        mail.sendMail(
          user.dataValues,
          decrypt(user.dataValues.password),
          data.dataValues,
          decrypt(data.dataValues.password),
        );
        res.send({ message: "User created successfully!" });
      });
    })
    .catch((err) => {
      console.log("err.message==>", err.message);
      res.status(500).send({ message: err.message });
    });
};
//update user
exports.updatePassword = (req, res) => {
  const id = req.params.id;
  req.body.password = encrypt(req.body.password),
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Password was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};
//User send Invitation
exports.sendInvitation = (req, res) => {
  console.log("req.body===>", req.body);
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      Setting.findOne().then((data) => {
        console.log("data.setting===>", data.dataValues);
        mail.sendMail(
          user.dataValues,
          decrypt(user.dataValues.password),
          data.dataValues,
          decrypt(data.dataValues.password),
        );
        res.send({ message: "Invitation sended successfully!" });
      });
    })
    .catch((err) => {
      console.log("err.message==>", err.message);
      res.status(500).send({ message: err.message });
    });
};
//update user
exports.resetUser = (req, res) => {
  console.log("req.body===>", req.body);
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      Setting.findOne().then((data) => {
        console.log("data.setting===>", data.dataValues);
        mail.sendMail(
          user.dataValues,
          decrypt(user.dataValues.password),
          data.dataValues,
          decrypt(data.dataValues.password),
          isRegister = true
        );
        res.send({ message: "Link send to your email successfully!" });
      });
    })
    .catch((err) => {
      console.log("err.message==>", err.message);
      res.status(500).send({ message: err.message });
    });
};
//User signin
exports.signin = (req, res) => {
  console.log("user====>", req.body);
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      if (decrypt(user.dataValues.password) !== req.body.password) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        accessToken: token,
        password: decrypt(user.dataValues.password),
        status: user.status,
      });
    })
    .catch((err) => {
      console.log("err====>", err);
      res.status(500).send({ message: err.message });
    });
};
// get All User
exports.getUser = (req, res) => {
  User.findAll({ where: { is_active: 1 } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Candidate.",
      });
    });
};
// get User by id
exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  const username = req.params.username;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};
//update user
exports.updateUser = (req, res) => {
  const id = req.params.id;
  console.log("req.body", req.body);
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + id,
      });
    });
};
// delete user
// exports.userDelete = function(req, res) {
//   User.del( req.params.id, function(err, employee) {
//     if (err)
//     res.send(err);
//     res.json({ error:false, message: 'User successfully deleted' });
//   });
//   };