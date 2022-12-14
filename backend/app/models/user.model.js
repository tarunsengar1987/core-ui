module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }, 
    role:{
      type: Sequelize.STRING
    },
    status:{
      type: Sequelize.STRING
    },
    is_active:{
      type: Sequelize.BOOLEAN
    }
  });

  return User;
};
