const db = require("../models");
const Lessons = db.lessons;


exports.createLesson = (req, res) => {
    Lessons.create({
      name: req.body.name,
      order: req.body.order,
      status:req.body.status,
      audio_file: req.body.audio_file ? req.body.audio_file : req.file.originalname,
      audio_url:'http://localhost:8080/'+req.file.originalname,
      class_id:req.body.class_id,
      duration:req.body.duration
    })
      .then(classes => {
        res.send(classes);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Lesson.",
          });
      });
};


// get All Classes 
exports.getLessons = (req, res) => {
    Lessons.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Lessons.",
            });
        });
};
//update Class
exports.updateLesson = (req, res) => {
    const id = req.params.id;
    Lessons.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Lesson was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Lesson with id=${id}. Maybe Lesson was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Lesson with id=" + id
            });
        });
};

//get class by id
exports.getLessonByClassId = (req, res) => {
    const id = req.params.id;
    Lessons.findAll({ where: {class_id: id} })
        .then(data => {
            if (!data)
                res.status(404).send({
                    status: 404,
                    message: "Not found Lesson with id " + id
                });
            else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({
                    status: 500,
                    message: "Error retrieving Lesson with id=" + id
                });
        });
  };

//delete Class
exports.lessonDelete = (req, res) => {
    const id = req.params.id;

    Lessons.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Lesson was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Lesson with id=" + id
            });
        });
};