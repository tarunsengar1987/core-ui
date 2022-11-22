// const tutorialsModel = require("./tutorials.model");

const { FLOAT } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Lessons = sequelize.define("lessons", {
      name: {
        type: Sequelize.STRING
      },
      order: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      audio_file: {
        type: Sequelize.STRING
      },
      audio_url: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.FLOAT
      },
      class_id: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        hooks: true,
        references: {
            // This is a reference to another model
            model:'classes',
            // This is the column name of the referenced model
            key: 'id'
        }
     }
    });
  
    return Lessons;
  };
  

  