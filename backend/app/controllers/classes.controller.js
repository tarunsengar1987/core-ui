const db = require("../models");
const Classes = db.classes;


exports.createClass = (req, res) => {
    Classes.create({
      name: req.body.name,
      descriptions: req.body.descriptions,
      status:req.body.status,
      tutorial_id:req.body.tutorial_id
    })
      .then(tutorial => {
        res.send(tutorial);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Class.",
          });
      });
};

// get All Classes 
exports.getClasses = (req, res) => {
    Classes.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Classes.",
            });
        });
};
//update Class
exports.updateClass = (req, res) => {
    const id = req.params.id;
    Classes.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Classes was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update classes with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating classes with id=" + id
            });
        });
};

//get class by id
exports.getClassByTutorialId = (req, res) => {
    const id = req.params.id;
    console.log({id})
    Classes.findAll({ where: {tutorial_id: id} })
        .then(data => {
            console.log({data})

            if (!data)
                res.status(404).send({
                    status: 404,
                    message: "Not found Class with id " + id
                });
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    status: 500,
                    message: "Error retrieving Class with id=" + id
                });
        });
  };



  //get class by id
exports.getClassById = (req, res) => {
    const id = req.params.id;
    console.log({id})
    Classes.findAll({ where: {id: id} })
        .then(data => {
            console.log({data})

            if (!data)
                res.status(404).send({
                    status: 404,
                    message: "Not found Class with id " + id
                });
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    status: 500,
                    message: "Error retrieving Class with id=" + id
                });
        });
  };

//delete Class
exports.classDelete = (req, res) => {
    const id = req.params.id;

    Classes.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Classes was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete classes with id=${id}. Maybe Classes was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete classes with id=" + id
            });
        });
};