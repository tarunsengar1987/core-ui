const db = require("../models");
const AudioRecord = db.audioRecord;


exports.createAudioRecord = (req, res) => {
    AudioRecord.create({
        class_Id: req.body.class_Id,
        lesson_Id: req.body.lesson_Id,
        user_Id:req.body.user_Id,
        duration: req.body.duration,
        pauseduration:req.body.pauseduration
    })
      .then(classes => {
        res.send(classes);
      })
      .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the AudioRecord.",
          });
      });
};


// get All Classes 
exports.getAudioRecord = (req, res) => {
    AudioRecord.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AudioRecord.",
            });
        });
};
//update Class
exports.updateAudioRecord = (req, res) => {
    const id = req.params.id;
    AudioRecord.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "AudioRecord was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update AudioRecord with id=${id}. Maybe Lesson was not found or req.body is empty!`
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
// exports.getLessonByClassId = (req, res) => {
//     const id = req.params.id;
//     Lessons.findAll({ where: {class_id: id} })
//         .then(data => {
//             if (!data)
//                 res.status(404).send({
//                     status: 404,
//                     message: "Not found Lesson with id " + id
//                 });
//             else res.send(data)
//         })
//         .catch(err => {
//             res
//                 .status(500)
//                 .send({
//                     status: 500,
//                     message: "Error retrieving Lesson with id=" + id
//                 });
//         });
//   };

// //delete Class
// exports.lessonDelete = (req, res) => {
//     const id = req.params.id;

//     Lessons.destroy({
//         where: { id: id }
//     })
//         .then(num => {
//             if (num == 1) {
//                 res.send({
//                     message: "Lesson was deleted successfully!"
//                 });
//             } else {
//                 res.send({
//                     message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete Lesson with id=" + id
//             });
//         });
// };