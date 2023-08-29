const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./server/routes/userRoutes");
const authRoutes = require("./server/routes/auth");
const eventRoutes = require("./server/routes/eventRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB
mongoose
  .connect(process.env.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(express.json());

app.use(cors());

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", eventRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
const startServer = async () => {
  try {
    await app.listen(port);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();