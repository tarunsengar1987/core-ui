const tutorialController = require("../controllers/tutorial.controller");

module.exports = function(app) {

  //Create Tutorial
  app.post("/api/tutorial", tutorialController.createTurorial);

  //Tutorial update route
  app.put("/api/tutorial/:id", tutorialController.updateUser);

  //Tutorial delete
    app.delete("/api/tutorial/:id", tutorialController.delete);

   //All User get route
   app.get("/api/tutorials", tutorialController.getTutorials);
};
