const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
let multer  = require('multer');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.static('public'));


// database
const db = require("./app/models");

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mysql." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/tutorials.routes')(app);
require('./app/routes/classes.routes')(app);
require('./app/routes/lessons.routes')(app);
require('./app/routes/setting.routes')(app);
require('./app/routes/audioRecord.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

