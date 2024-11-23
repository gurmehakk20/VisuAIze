import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js"
import GenerateImageRouter from './routes/GenerateImage.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true}));


// error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

// default get
app.get("/", async (req, res) => {
    res.status(200).json({
        message: "hello developers",
    });
});

// function to connect mongoDB
const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MONGODB CONNECTED"))
    .catch((err) => {
        console.error("Failed to connect")
        console.error(err.message);
    });
}

// function to start the server
const startServer = async () => {
    try {
      connectDB();
      app.listen(8000, () => console.log("Server started on port 8000"));
    } catch (error) {
      console.log(error);
    }
  };

startServer();