const db = require("../model");
const Comment = db.comment;

exports.create = (req, res) => {
  // Create a comment
  const comments = new Comment({
    username: req.body.username,
    email: req.body.email,
    comment: req.body.comment,
  });

  // Save comment in a database
  comments
    .save(comments)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating a comment",
      });
    });
};
exports.findAll = (req, res) => {
  Comment.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving comment",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Comment.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found comment with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id =" + id });
    });
};
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  if (req.file) {
    const image = req.file.path;
    req.body.image = image;
  }

  Comment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update comment with id = ${id}. Maybe comment not found!`,
        });
      } else res.send({ message: "comment was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while updating comment with id = " + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Comment.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete comment with id = ${id}. Maybe comment not found!`,
        });
      } else res.send({ message: "comment was deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while delete comment with id = " + id,
      });
    });
};
exports.deleteAll = (req, res) => {
  Comment.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} comment was deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while delete all comment",
      });
    });
};
