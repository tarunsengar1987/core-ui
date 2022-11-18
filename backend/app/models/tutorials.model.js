module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorials", {
      name: {
        type: Sequelize.STRING
      },
      descriptions: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      }
    });
  
    return Tutorial;
  };
  

