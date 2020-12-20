  const cart = require("../controllers/cart.controller.js");
  var router = require("express").Router();
module.exports = app => {
  
  



  // Retrieve a single tour with id
  //router.get("/user/:userId/cart", cart.findAll);

  // Delete a tour with id
  //router.delete("/user/:userId/cart/:tourId", cart.delete);

  router.post("/user/cart", cart.create);
  router.delete("/user/cart", cart.delete);

  router.get("/user/cart", cart.findAll);

  
  app.use('/api/tours', router);
};