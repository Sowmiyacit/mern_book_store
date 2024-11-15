import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());
dotenv.config();
// Cross-Origin Resource Sharing
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message); // Improved error logging
    console.error("Stack trace:", err.stack);
    process.exit(1); // Exit process if unable to connect
  }
}

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB Disconnected");
});

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);

app.listen(8000, () => {
  connect();
  console.log("Connected to backend");
  console.log("Server is running on: 8000");
});
