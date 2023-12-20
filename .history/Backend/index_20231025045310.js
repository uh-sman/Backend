const express = require("express");
const path = require('path')
const colors = require("colors");
const dotenv = require("dotenv").config();
const docs = require('./docs/index')
const morgan  = require("morgan");
const swaggerUI = require('swagger-ui-express')
const userRoutes = require('./routes/userRoutes')
const {errorHandler,notFound} = require('./middleware/errorMiddleware')
const listingRoutes = require('./routes/listings/index')
// const errorPage = require('./middleware/errorMiddleware')
const superAdmin = require('./routes/superAdmin')
const connectDB = require("./config/db");
// const superAdmin = require()
const cors = require('cors')
const app = express();
connectDB();


app.use(
  cors({
  origin:"*",
})
)

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('combined'))
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRoutes);
app.use("/api/superAdmin", superAdmin);
app.use("/api/listing", listingRoutes);
// app.use("/listing", require("./routes/listings/index"));

const _dirname = path.resolve();
app.use('/uploads',  express.static(path.join(_dirname, '/uploads')));
  if(process.env.NODE_ENV === 'production'){
  app.use('/', swaggerUI.serve, swaggerUI.setup(docs))
}else{
  app.use("/", swaggerUI.serve,  swaggerUI.setup(docs))
}



app.use(notFound);
app.use(errorHandler);
// app.use(cors(corsOption))
// app.use(cors())
const PORT = process.env.PORT  || 4000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
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