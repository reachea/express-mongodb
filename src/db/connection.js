const { MongoClient } = require('mongodb'); 

const db = process.env.ATLAS_URI;

const client = new MongoClient(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

let connection;

async function connectToServer(callback) {
  client.connect((err, db) => {
    if (err || !db) {
      return callback(err)
    }

    connection = db.db("testing");
    console.log("Successfully connected to MongoDB!");

    return callback()
  })
}

module.exports = {
  connectToServer,
  getDb: function() {
    return connection
  }
}