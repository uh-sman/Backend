const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require('cors')
const app = express();
app.use(cors({
  origin: ["*",'https://dcanestate.onrender.com'],
}))
// const { DEVELOPMENT } = process.env;
const PORT = 4000 || process.env.DEVELOPMENT;
// const whitelist =["*", ] 
// const whitelist =["*"] 

  // origin:['https://dcanestate.onrender.com', 'http://localhost:4000', 'http://localhost:3000'],
  
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/userRoutes"));
app.use("/listing", require("./routes/listings/index"));
// app.use(cors(corsOption))
// app.use(cors())
app.listen(PORT, () => {
  console.log({ message: "hello" });
});
