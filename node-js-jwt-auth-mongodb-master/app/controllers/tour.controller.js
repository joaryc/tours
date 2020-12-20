const db = require("../models");
const Tour = db.tours;
const comment = require("./comment.controller.js");

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a Tour
    const tour = new Tour({
        name: req.body.name,
        destination: req.body.destination,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        price: req.body.price,
        seats: req.body.seats,
        seats_taken: req.body.seats_taken,
        description: req.body.description,
        pic_link: req.body.pic_link,
        gallery1: req.body.gallery1,
        gallery2: req.body.gallery2,
        gallery3: req.body.gallery3,
        gallery4: req.body.gallery4,
        comments: req.body.comments
    });

    // Save Tour in the database
    tour
        .save(tour)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tour."
            });
        });
};


// Retrieve all Tours from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Tour.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tours."
            });
        });

};

// Find a single Tour with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tour.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Tour with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tour with id=" + id });
        });

};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;


    Tour.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update tour with id=${id}. Maybe tour was not found!`
                });
            } else res.send({ message: "tour was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating tour with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Tour.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tour with id=${id}. Maybe Tour was not found!`
                });
            } else {
                res.send({
                    message: "Tour was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tour with id=" + id
            });
        });

};

// Delete all Tours from the database.
exports.deleteAll = (req, res) => {
    Tour.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tours were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all Tours."
            });
        });
};

exports.createComment = (req, res) => {
    if (!req.body.text) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    comment.create(req, res);
}