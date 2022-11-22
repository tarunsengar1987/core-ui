const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.tutorials = require("../models/tutorials.model.js")(sequelize, Sequelize);
db.classes = require("../models/classes.model.js")(sequelize, Sequelize);
db.lessons = require("../models/lesson.model.js")(sequelize, Sequelize);
db.setting = require("../models/setting.model.js")(sequelize, Sequelize);
db.audioRecord = require("../models/audioRecord")(sequelize, Sequelize);

// db.tutorials.hasMany(db.classes, { as: "classes" });
// db.classes.belongsTo(db.tutorials, {
//   foreignKey: "tutorialId",
//   as: "tutorial",
// });


module.exports = db;
