const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const cors = require('cors')
const app = express();
// app.use(cors({
//   origin: ["https://dcanestate.onrender.com","http://localhost:3000"],
//   control:true,
//   methods:['GET, POST, OPTIONS, PUT, PATCH, DELETE']
//   // Access-Control-Allow-Origin:
// })
// )

// let allowedOrigins = ["https://dcanestate.onrender.com","http://localhost:3000"]
// let origin = req.headers.origin;
// if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
// }

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }
//   next();
// });
const allowlist = ["https://dcanestate.onrender.com","http://localhost:3000"]
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate))
// const { DEVELOPMENT } = process.env;
// Add headers
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'https://dcanestate.onrender.com',"http://localhost:3000");
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();

//   // Request methods you wish to allow

//   // Request headers you wish to allow

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)

//   // Pass to next layer of middleware
// });
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
