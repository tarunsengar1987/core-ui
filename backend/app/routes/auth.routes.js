const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //User signup route
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  //User signin route
  app.post("/api/auth/signin", controller.signin);

  
  //User create route
  app.post("/api/createuser", controller.createUser);

  //All User get route
  app.get("/api/users", controller.getUser);

  //User update route
  app.put("/api/user/:id", controller.updateUser);

  //User send mail
  app.post("/api/sendmail", controller.sendInvitation);
  
  //User reset password
  app.post("/api/resetpassword", controller.resetUser);

   //User reset password
   app.put("/api/forgetpassword/:id", controller.updatePassword);

  

  // //User delete
  // app.delete("/api/auth/user/:id", controller.userDelete);
};
