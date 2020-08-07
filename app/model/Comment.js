module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      username: String,
      email: String,
      comment: String,
    },
    { timestamps: true }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Comment = mongoose.model("comment", schema);
  return Comment;
};
