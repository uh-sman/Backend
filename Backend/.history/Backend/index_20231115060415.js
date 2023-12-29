const express = require("express");
const path = require('path')
const colors = require("colors");
const dotenv = require("dotenv").config();
const multer = require('multer')
const docs = require('./docs/index')
const morgan  = require("morgan");
const swaggerUI = require('swagger-ui-express')
const userRoutes = require('./routes/userRoutes')
const {errorHandler,notFound} = require('./middleware/errorMiddleware')
const listingRoutes = require('./routes/listings/index')
const superAdmin = require('./routes/superAdmin')
const connectDB = require("./config/db");
const cloudinary = require('cloudinary').v2
// const { CloudinaryStorage } = cloudinary
const cors = require('cors')
const app = express();
connectDB();


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_API_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

/////////////////////////
// Uploads an image file
/////////////////////////
const uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log('hello',result);
    return result.public_id;
  } catch (error) {
    console.error(error);
  }
};

// const storage = cloudinary.
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

