const { MongoClient } = require('mongodb');
const mongoose = require('mongoose')
// Connection URI and database name
const uri = 'mongodb://0.0.0.0:27017/dailyneeds';
const client = new MongoClient(uri);

const connectAndOperate  = async () => {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');
    // Perform database operations here
    const db = client.db();
    const collectoin = db.collection('dailyneeds');
    try {      
      await mongoose.connect(uri);
  
      console.log("connected to database");
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
  
  } 
}
module.exports = {
  connectAndOperate,
};
