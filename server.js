// ExpressJS.Auth.MongoDB.API - MRC (Model Route Controller)

const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");

// Routes
const authRoutes = require("./routes/auth");

// adds middleware that parses incoming requests with JSON payloads
app.use(express.json());

// Declare api category endpoints
app.use("/api/auth", authRoutes);

// Use mongoDB connection string as connection uri to create a connection to mongoDB
mongoose
  .connect(
    `${process.env.DB_PROTOCOL}://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?${process.env.DB_PARAMS}`
  )
  .then(() => {
    app.listen(port, () => {
      console.log("API listening to https://localhost:" + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected on app termination.");
    process.exit(0);
  });
});
