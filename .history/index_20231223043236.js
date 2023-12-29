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
const superAdmin = require('./routes/superAdmin')
const connectDB = require("./config/db");
// const { CloudinaryStorage } = cloudinary
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

const _dirname = path.resolve();
app.use('/uploads',  express.static(path.join(_dirname, '/uploads')));
  if(process.env.NODE_ENV === 'production'){
  app.use('/', swaggerUI.serve, swaggerUI.setup(docs))
}else{
  app.use("/", swaggerUI.serve,  swaggerUI.setup(docs))
}



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT  || 4000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

