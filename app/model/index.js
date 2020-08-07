const dbConfig = require("../config/db.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.blogs = require("./Blog.js")(mongoose);
db.user = require("./User.js");
db.role = require("./Role.js");
db.comment = require("./Comment.js")(mongoose);

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
