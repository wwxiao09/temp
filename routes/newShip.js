const express = require("express");
const router = express.Router();
let Ship = require("../models/Ship");

/**
 * tell Express.js that when it receives a POST request at the URL /newShip/, to do this code.
 */
router.post("/newShip/", function(req, res){
  // look up documents in MongoDB by name.
  Ship.findOne({name: req.body.name}, function(error,doc){
    // if there was an error
    if(error){
      console.error("Error finding ship",error);
      res.status(500).send(error);
    }
    // if no document was found
    else if(!doc){
      // create a new instance of the Ship model, using the request body as the data.
      new Ship(req.body).save((err, doc) => {
        /**
         * this error/document fat-arrow function is required.
         * on an error, handle it. else send the newly created document back to the client.
         */
        if(err){
          console.error("Error saving new ship",err);
          res.status(500).send(err);
        }
        else{
          res.send(doc);
        }
      });
    }
    // a document was found, return it instead.
    else{
      res.send(doc);
    }
  });
});

/**
 * Tell Express.js that when there is a GET request at /getShip/name, to do this code.
 */
 router.get("/getShip/name",  (req, res) => {
  // look up documents in MongoDB by name
  Ship.findOne({name: req.body.name}, (err, doc) => {
    // if there was an error
    if (err) {
      console.error("Error finding ship", err);
      res.status(500).send(err);
    }
    // if no document was found
    else if (!doc) {
      console.error("No ship found", err);
      res.status(404).send(err);
    }
    // a document was found, return it
    else {
      res.send(doc);
    }
  });
});

/**
 * Tell Express.js that when there is a GET request at /getShip/secondaryBattery, to do this code.
 */
 router.get("/getShip/secondaryBattery", (req, res) => {
  // look up documents in MongoDB by secondaryBattery
  Ship.find({secondaryBattery: req.body.secondaryBattery}, (err, doc) => {
    // if there was an error
    if (err) {
      console.error("Error finding ship", err);
      res.status(500).send(err);
    } 
    // if no documents were found
    else if (!doc) {
      console.error("No ships found", err);
      res.status(404).send(err);
    } 
    // some documents were found, return them
    else {
      res.send(doc);
    }
  });
});

/**
 * Tell Express.js that when there is a PATCH request at /updateShip, do the following code
 */
 router.patch("/updateShip", (req, res) => {
  // if no ship name is given in the request
  if (!("name" in req.body)) {
    console.error("No name in request");
    res.status(400).send("No name in request");
  }
  else {
    Ship.findOneAndUpdate({name: req.body.name}, req.body, (err, doc) => {
      // if there was an error
      if (err) {
        console.error("Error updating ship", err);
        res.status(500).send(err);
      }
      // if no document was found
      else if (!doc) {
        console.error("No ship found", err);
        res.status(404).send(err);
      }
      // return the updated document
      else {
        res.send(doc);
      }
    });
  }
});

module.exports = router;