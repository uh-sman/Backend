const express = require("express");
const path = require('path')
const colors = require("colors");
const dotenv = require("dotenv").config();
const morgan  = require("morgan");
const {errorHandler,notFound} = require('./middleware/errorMiddleware')
// const errorPage = require('./middleware/errorMiddleware')
const connectDB = require("./config/db");
const cors = require('cors')
const app = express();
const PORT = 4000 || process.env.DEVELOPMENT;
connectDB();


app.use(
  cors({
  origin:"*",
})
)

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const _dirname = path.resolve();
app.use('/uploads',  express.static(path.join(_dirname, '/uploads')));
  if(process.env.NODE_ENV === 'production'){
  app.use('/', )
};
app.use(notFound);
app.use(errorHandler);
app.use("/", require("./routes/userRoutes"));
app.use("/listing", require("./routes/listings/index"));
// app.use(cors(corsOption))
// app.use(cors())
app.listen(PORT, () => {
  console.log({ message: "hello" });
});


// app.use(cors())
// app.use(function (req,res,next) {
//   res.header('Access-Control-Allow-Origin',"http://localhost:3000"),
//   res.header('Access-Control-Allow-Methods', "GET,HEAD,OPTIONS,POST,PUT,DELETE"),
//   res.header('Access-Control-Allow-Headers',
//  "Origin, X-Requested-With, Content-type, Accept, Authorization" 
//   );
//   next()
// })
// const whitelist =["*", ] 
// const whitelist =["*"] 

  // origin:['https://dcanestate.onrender.com', 'http://localhost:4000', 'http://localhost:3000'],


  // origin: ["https://dcanestate.onrender.com","http://localhost:3000"],
// control:true,
// methods:['GET, POST, OPTIONS, PUT, PATCH, DELETE']
// Access-Control-Allow-Origin: