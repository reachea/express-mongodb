const { ObjectID } = require("bson");
const express = require("express");
const connection = require('../db/connection');

const recordRoutes = express.Router();

// All records
recordRoutes.route('/').get(async function (req, res) {
  const dbConnect = connection.getDb();

  dbConnect.collection("records").find({}).limit(50).toArray(function (err, result) {
    if (err) {
      res.status(400).send("Error fetching listings!");
   } else { 
      res.json(result);
    }
  });
})

recordRoutes.route('/create').post(async function (req, res) {
  const dbConnect = connection.getDb();

  const matchDocument = {
    name: req.body.name,
    from: req.body.from,
    to: req.body.to,
    message: req.body.message,
    last_modified: new Date(),
  };

  dbConnect.collection("records").insertOne(matchDocument, function (err, result) {
    if (err) {
      res.status(400).send("Error inserting records!");
    }
    else {
      console.log(`Added a new match with id ${result.insertedId}`);
  res.status(204).send();
    }
  })
})

recordRoutes.route('/update').post(async (req, res) => {
  const dbConnect = connection.getDb();

  const listingQuery = { _id: ObjectID(req.body._id) };

  const updates = {
    $set: {
      message: req.body.message
    }
  }

  dbConnect.collection("records").updateOne(listingQuery, updates, (err, _result) => {
    if (err) {
      res.status(400).send(`Error updating likes on listing with id ${req.body._id}!`);
    }
    else {
      console.log("1 document updated");
      res.status(204).send();
    }
  })
})

recordRoutes.route('/delete').post(async function (req, res) {
  const dbConnect = connection.getDb();

  const listingQuery = { _id: ObjectID(req.body._id) };

  dbConnect.collection('records').deleteOne(listingQuery, (err, _result) => {
    if (err) {
      res.status(400).send(`Error updating likes on listing with id ${req.body._id}!`);
    }
    else {
      console.log('1 document deleted!')
      res.status(204).send();
    }
  })
})

module.exports = recordRoutes;