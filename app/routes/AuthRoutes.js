const { verifySignUp } = require("../middleware");
const { authJwt } = require("../middleware");

const controller = require("../controllers/AuthController");
module.exports = function (app) {
  const multer = require("multer");

  const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb("Please upload only images", false);
    }
  };

  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/users");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  var upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: { fileSize: 1024 * 1024 * 10 },
  });

  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.get(
    "/api/user",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.findAll
  );
  app.put(
    "/api/user/:id",
    upload.single("image"),
    [authJwt.verifyToken],
    controller.update
  );
  app.delete(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.delete
  );

  app.post(
    "/api/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRoleExisted],
    upload.single("image"),
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};
