const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require('cors')
const app = express();
app.use(cors({
  origin: ["*",'https://dcanestate.onrender.com'],
  // Access-Control-Allow-Origin:
}))
// const { DEVELOPMENT } = process.env;
// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();

  // Request methods you wish to allow

  // Request headers you wish to allow

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)

  // Pass to next layer of middleware
});
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
