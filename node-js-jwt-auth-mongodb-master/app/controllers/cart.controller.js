const db = require("../models");
const Cart = db.carts;
const User = db.user;


exports.create = (req, res) => {
    const cart = new Cart({
        userId: req.body.userId,
        tourId: req.body.tourId
    });

    cart
        .save(cart)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tour."
            });
        });

    const userId = req.body.userId;
    User.findByIdAndUpdate(userId, { $push: { cart: cart._id } }, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update user with id=${userId}. Maybe tour was not found!`
                });
            } else res.send({ message: "user was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + userId
            });
        });

};
exports.findAll = (req, res) => {
    const userId = req.query.userId;
    var condition = userId ? { userId: { "$in": [userId] } } : {};

    Cart.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tours."
            });
        });

};
exports.delete = (req, res) => {
    const id = req.query.id;

    Cart.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete cart with id=${id}. Maybe Tour was not found!`
                });
            } else {
                res.send({
                    message: "Cart was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tour with id=" + id
            });
        });

};