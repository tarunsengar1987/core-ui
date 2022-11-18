const settingController = require("../controllers/setting.controller");

module.exports = function(app) {

  //Create Tutorial
  app.post("/api/setting", settingController.createSetting);

  //Tutorial update route
  app.put("/api/setting/:id", settingController.updateSetting);

   //All User get route
   app.get("/api/setting", settingController.getSetting);

};
