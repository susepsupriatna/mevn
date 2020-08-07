const auth = require("../config/auth.js");

module.exports = function (app) {
  const blogs = require("../controllers/BlogControllers.js");
  const router = require("express").Router();
  const authjwt = require("../middleware/authJwt.js");

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
      cb(null, "./uploads/blogs");
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

  // Create a new Blog
  router.post("/", upload.single("image"), blogs.create);

  // Retrieve all Blogs
  router.get("/", blogs.findAll);

  // Retrieve all published Blogs
  router.get("/published", blogs.findAllPublished);

  // Retrieve single Blog with id
  router.get("/:id", blogs.findOne);

  // Update a Blog with id
  router.put(
    "/:id",
    authjwt.verifyToken,
    upload.single("image"),
    authjwt.isAdmin,
    blogs.update
  );

  // Delete a Blog with id
  router.delete("/:id", authjwt.verifyToken, authjwt.isAdmin, blogs.delete);

  // Delete all Blog
  router.delete("/", authjwt.verifyToken, authjwt.isAdmin, blogs.deleteAll);

  app.use("/api/blogs", router);
};
