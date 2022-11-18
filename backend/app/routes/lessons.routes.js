const classController = require("../controllers/lessons.controller");
const { uploadFile } = require('../middleware/multer')
 
module.exports = function(app) {
  //Create Tutorial
  app.post("/api/lesson",  uploadFile.single('audio'), classController.createLesson);

  //All User get route
  app.get("/api/lessons", classController.getLessons);

  //Classes update route
  app.put("/api/lesson/:id", classController.updateLesson);

  //Classes delete
  app.delete("/api/lesson/:id", classController.lessonDelete);

   //get textCategory by id
   app.get("/api/lesson/:id", classController.getLessonByClassId);
};