const audioRecordController = require("../controllers/audioRecord.controller");
 
module.exports = function(app) {
  //Create Tutorial
  app.post("/api/audiorecord",  audioRecordController.createAudioRecord);

  //All User get route
  app.get("/api/audiorecord", audioRecordController.getAudioRecord);

  //Classes update route
  app.put("/api/audiorecord/:id", audioRecordController.updateAudioRecord);

};