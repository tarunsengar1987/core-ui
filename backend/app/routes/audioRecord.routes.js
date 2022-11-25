const audioRecordController = require("../controllers/audioRecord.controller");
const db = require("../models");
 
module.exports = function(app) {
  //Create Tutorial
  app.post("/api/audiorecord",  audioRecordController.createAudioRecord);

  //All User get route
  app.get("/api/audiorecord", audioRecordController.getAudioRecord);

  //Classes update route
  app.put("/api/audiorecord/:id", audioRecordController.updateAudioRecord);

  //Classes update route
  app.get("/api/audiorecord/:id", audioRecordController.getAudioRecordById);

  app.get('/api/progress', async(req, res) => {
    db.sequelize.query(`SELECT
    (select id from coreuidb.tutorials where coreuidb.tutorials.id = (SELECT tutorial_id from coreuidb.classes WHERE id=class_Id)) as tutorial_id,
    (select name from coreuidb.tutorials where coreuidb.tutorials.id = (SELECT tutorial_id from coreuidb.classes WHERE id=class_Id)) as tutorial,
    (sum(pauseduration)*100)/sum(duration) as completed_percentage
FROM coreuidb.audiorecords GROUP BY tutorial_id;`, {
        type: db.sequelize.QueryTypes.SELECT
    }).then((data) => {
        return res.send({data: data, success: true,  message:"progress fetched successfully!" })
    }).catch( err => {
        return res.status(500).send('Err executing command ' + err)
    })
});

};