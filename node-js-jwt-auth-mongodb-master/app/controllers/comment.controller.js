const db = require("../models");
const Comment = db.comments;
const Tour = db.tours;


exports.create = (req, res) => {

    if (!req.body.text) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const comment = new Comment({
        name: req.body.name,
        username: req.body.username,
        text: req.body.text,
        rate: req.body.rate,
        tourId: req.body.tourId

    });

    comment
        .save(comment)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Comment."
            });
        });


    const id = req.body.tourId;
    Tour.findByIdAndUpdate(id, { $push: { comments: comment._id } }, { useFindAndModify: false })
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


exports.findAll = (req, res) => {
    const tourId = req.query.tourId;

    var condition = tourId ? { tourId: { "$in": [tourId] } } : {};

    Comment.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving comments."
            });
        });

};