const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require('cors')
const app = express();
// const { DEVELOPMENT } = process.env;
const PORT = 4000 || process.env.DEVELOPMENT;
const corsOption = {
  origin:['https://dcanestate.onrender.coms']
}
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", cors(corsOption),require("./routes/userRoutes"));
app.use("/listing", require("./routes/listings/index"));
app.use(cors(corsOption))
app.use(cors())
app.listen(PORT, () => {
  console.log({ message: "hello" });
});
