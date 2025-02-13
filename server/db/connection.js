const mongoose = require("mongoose");

// Connect to MongoDB
const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    if (connection.STATES.connecting) {
      console.log(`Connecting DB... to ${connection.connection.host}`);
    }
    if (connection.STATES.connected) {
      console.log(`connected DB... to ${connection.connection.host}`);
    }
    if (connection.STATES.disconnected) {
      console.log(`Disconnected DB... from ${connection.connection.host}`);
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = { connectDb };
