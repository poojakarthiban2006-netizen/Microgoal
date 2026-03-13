require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
const errormiddleware = require("./Middlewares/errormiddleware");
app.use(express.urlencoded({ extended: true }));
const bodyParser = require("body-parser");
app.use(express.json());
const PORT = process.env.PORT;
const Mongo_URI = process.env.MONGO_URI;
const authRoute = require("./Router/AuthRouter");
const GoalRouter = require("./Router/GoalRouter");

//mongoDB connection
mongoose
  .connect(Mongo_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//route
app.use("/auth", authRoute);
app.use("/goal", GoalRouter);

app.use(errormiddleware);
app.listen(PORT, () => {
  console.log("Server running on port 8000");
});

