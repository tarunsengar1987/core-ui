module.exports = (sequelize, Sequelize) => {
    const AudioRecord = sequelize.define("audioRecord", {
      class_Id: {
        type: Sequelize.STRING
      },
      lesson_Id: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        hooks: true,
        references: {
            // This is a reference to another model
            model:'lessons',
            // This is the column name of the referenced model
            key: 'id'
        }
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
  