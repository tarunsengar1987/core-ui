const db = require("../models");
const Setting = db.setting;
const { encrypt, decrypt } = require("../middleware/authJwt");

//create setting
exports.createSetting = (req, res) => {
    Setting.create({
        smtp: req.body.smtp,
        username: req.body.username,
        port:req.body.port,
        password: encrypt(req.body.password),
    })
      .then(classes => {
        res.send(classes);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the setting.",
          });
      });
};


//update Setting
exports.updateSetting = (req, res) => {
    const id = req.params.id;
    req.body.password = encrypt(req.body.password),
    Setting.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Setting was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Setting with id=${id}. Maybe Setting was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Setting with id=" + id
            });
        });
};


// get setting
exports.getSetting = (req, res) => {
    Setting.findAll()
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