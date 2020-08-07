const comments = require("../controllers/CommentController.js");
module.exports = function (app) {
  // Create a new Comment
  app.post("/api/comments", comments.create);

  // Retrieve all comments
  app.get("/api/comments", comments.findAll);

  // Retrieve single Comment with id
  app.get("/api/comments/:id", comments.findOne);

  // Update a Comment with id
  app.put("/api/comments/:id", comments.update);

  // Delete a Comment with id
  app.delete("/api/comments/:id", comments.delete);
  // Delete all Comment
  app.delete("/api/comments/", comments.deleteAll);
};
