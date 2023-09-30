const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
const { DEVELOPMENT } = process.env;
const PORT = 4000 || DEVELOPMENT;
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/userRoutes"));
app.use("/listing", require("./routes/listings/index"));

app.listen(PORT, () => {
  console.log({ message: "hello" });
});
