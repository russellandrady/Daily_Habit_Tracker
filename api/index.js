import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import habitRoutes from "./routes/habit.route.js";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });


const app = express();
const __dirname = path.resolve();


app.use(express.json());//alow json as the input our backend in order to test the api.
app.use(cookieParser());


app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/habit', habitRoutes);

app.use((err,req,res,next) => {
  const statusCode = res.statusCode ||500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success:false,
    message,
    statusCode,
  });
});
app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});