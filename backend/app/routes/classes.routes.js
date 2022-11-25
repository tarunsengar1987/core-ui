const classController = require("../controllers/classes.controller");

module.exports = function(app) {

  //Create Tutorial
  app.post("/api/class", classController.createClass);

  //All User get route
  app.get("/api/classes", classController.getClasses);

  //Classes update route
  app.put("/api/class/:id", classController.updateClass);

  //Classes delete
  app.delete("/api/class/:id", classController.classDelete);

   //get textCategory by id
   app.get("/api/class/:id", classController.getClassByTutorialId);
   
    //get classId  by id
    app.get("/api/classbyId/:id", classController.getClassById);
};