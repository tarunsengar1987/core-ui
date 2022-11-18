const db = require("../models");
const Tutorials = db.tutorials;


exports.createTurorial = (req, res) => {
    Tutorials.create({
      name: req.body.name,
      descriptions: req.body.descriptions,
      status:req.body.status
    })
      .then(tutorial => {
        res.send(tutorial);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Turorial.",
          });
      });
  };


//update user
exports.updateUser = (req, res) => {
  const id = req.params.id;
  Tutorials.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update tutorial with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating tutorial with id=" + id
      });
    });
};

//delete Tutorials
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log({id});
    Tutorials.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
  };

// get All Tutorials 
exports.getTutorials = (req, res) => {
    Tutorials.findAll()
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