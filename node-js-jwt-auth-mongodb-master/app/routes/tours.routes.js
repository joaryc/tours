module.exports = app => {
    const tours = require("../controllers/tour.controller.js");
    const comment = require("../controllers/comment.controller.js");
    var router = require("express").Router();


    router.post("/", tours.create);

    router.get("/", tours.findAll);

    router.get("/:id", tours.findOne);

    router.put("/:id", tours.update);

    router.delete("/:id", tours.delete);

    router.delete("/", tours.deleteAll);

    router.post("/:id/addcomment", tours.createComment);

    router.get("/get/comments", comment.findAll);

    app.use('/api/tours', router);
};