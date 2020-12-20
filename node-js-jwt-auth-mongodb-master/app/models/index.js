const mongoose = require('mongoose');
mongoose.Promise = global.Promise;



const db = {};


db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.ROLES = ["user", "admin", "moderator"];
db.tours = require("./tour.model.js")(mongoose);
db.comments = require("./comment.model.js")(mongoose);
db.carts = require("./cart.model.js")(mongoose);

module.exports = db;