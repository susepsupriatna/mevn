const db = require("../model");
const Blog = db.blogs;

exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Title cannot be enmpty" });
    return;
  }

  // Create a Blog
  const blog = new Blog({
    title: req.body.title,
    description: req.body.description,
    image: req.file.path,
    published: req.body.published ? req.body.published : false,
  });

  // Save Blog in a database
  blog
    .save(blog)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured while creating a Blog",
      });
    });
};
exports.findAll = (req, res) => {
  const title = req.params.title;
  Blog.find({ title: { $regex: new RegExp(title), $options: "i" } })
    .populate("comments")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Blogs",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Blog with id " + id });
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

  Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Blog with id = ${id}. Maybe Blog not found!`,
        });
      } else res.send({ message: "Blog was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while updating Blog with id = " + id,
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Blog with id = ${id}. Maybe Blog not found!`,
        });
      } else res.send({ message: "Blog was deleted successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error while delete Blog with id = " + id,
      });
    });
};
exports.deleteAll = (req, res) => {
  Blog.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Blog was deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error while delete all Blogs",
      });
    });
};
exports.findAllPublished = (req, res) => {
  Blog.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Blogs",
      });
    });
};
