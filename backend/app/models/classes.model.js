const tutorialsModel = require("./tutorials.model");

module.exports = (sequelize, Sequelize) => {
    const Classes = sequelize.define("classes", {
      name: {
        type: Sequelize.STRING
      },
      descriptions: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      tutorial_id: {
        type: Sequelize.INTEGER,
        onDelete: 'cascade' ,
        hooks: true,
        references: {
            // This is a reference to another model
            model:'tutorials',
            // This is the column name of the referenced model
            key: 'id'
        },
     }
    });
  
    return Classes;
  };
  

  