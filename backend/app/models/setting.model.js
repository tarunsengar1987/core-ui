module.exports = (sequelize, Sequelize) => {
    const Setting = sequelize.define("setting", {
        smtp: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      port: {
        type: Sequelize.STRING
      }, 
      password:{
        type: Sequelize.STRING
      }
    });
  
    return Setting;
  };
  