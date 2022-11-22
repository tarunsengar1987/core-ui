module.exports = (sequelize, Sequelize) => {
    const AudioRecord = sequelize.define("audioRecord", {
      class_Id: {
        type: Sequelize.STRING
      },
      lesson_Id: {
        type: Sequelize.STRING
      },
      user_Id: {
        type: Sequelize.STRING
      }, 
      duration:{
        type: Sequelize.STRING
      },
      pauseduration:{
        type: Sequelize.STRING
      }
    });
  
    return AudioRecord;
  };
  