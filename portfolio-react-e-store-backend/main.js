const express = require("express");
const multer = require('multer') // parsing multipart/form-data
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require('./models/user')
const productModel = require('./models/product')
const constants = require('./src/constants')
const utils = require('./src/utils')
var bodyParser = require('body-parser') // parse request bodies
const cors = require('cors')
const helpers = require('./src/helpers')
require('dotenv').config() // use .env
require('express-async-errors');

const app = express();

// save uploaded images to UPLOAD_DIRECTORY
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${constants.UPLOAD_DIRECTORY}/`)
    },
    filename: (req, file, cb) => {
        const uniqueFilename = utils.GenerateFilename(file.originalname);
        cb(null, uniqueFilename)
    }
})

const upload = multer({ storage: storage});

const LISTEN_PORT = 3003;

helpers.CreateDefaultAdminUser();

// set bodyParser to parse json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// serve uploads directory's images
app.use('/uploads', express.static('uploads'))

//////////////////////////////////////////////////////////////////////////
///////////////// REGISTER ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
app.post('/register', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    const user = await userModel.findOne({ email });
    if (user !== null) {
        return res.status(401).json({
            message: "email taken"
        })
    }
    if (password.length < 10)
        return res.status(401).json({message: "too short password"})
    
    const newClient = {
        email : email,
        password_hash : utils.HashPassword(password),
        auth_level:0,
        is_active:false,
    }

    await userModel.create(newClient)

    // send token to client on successfull registration
    const token = utils.GetSignedToken({user: email})

    res.status(200).json({ token:token, auth_level:newClient.auth_level })
});

//////////////////////////////////////////////////////////////////////////
///////////////// LOGIN //////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
app.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (email == 0 || password.length == 0)
        return res.status(401).json({message: constants.SERVER_MSG_INVALID_CREDENTIALS})

    const user = await userModel.findOne({email})
    
    if (user === null) {
        return res.status(401).json({
            message: constants.SERVER_MSG_INVALID_CREDENTIALS
        })
    }
    
    const passwordCorrect = await bcrypt.compare(password, user.password_hash)
    if (!passwordCorrect)
    {
        return res.status(401).json({message: constants.SERVER_MSG_INVALID_CREDENTIALS})
    }

    const token = utils.GetSignedToken({user: email})

    res.status(200).json({ token:token, auth_level:user.auth_level })
})

app.get('/alive', async (req, res) => {
    res.status(200).end()
})

//////////////////////////////////////////////////////////////////////////
///////////////// refresh ////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// if user has valid token, return him fresh token
// otherwise just return proper status code
app.post('/refreshToken', async (req, res) => {
    const { token } = req.body

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedToken.user)
    {
        return res.status(401).json({message: "unauthorized"})
    }

    const _token = utils.GetSignedToken({user: decodedToken.user})
    
    const userFromDB = await userModel.findOne({email:decodedToken.user})
    
    return res.status(200).json({message: "welcome back", token: _token, auth_level: userFromDB?.auth_level, email:decodedToken.user})    
})

//////////////////////////////////////////////////////////////////////////
///////////////// adding new products ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
// if user has valid token, return him fresh token
// otherwise just return proper status code
app.post('/products', upload.single('image'), async (req, res) => {
    const { title, price, productDetails, token } = req.body
    const image = req.file;

    // validate token (user must be logged in)
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    if (!decodedToken.user)
    {
        return res.status(401).json({message: "unauthorized"})
    }

    const _token = utils.GetSignedToken({user: decodedToken.user})
    
    // validate authentication level
    const userFromDB = await userModel.findOne({email:decodedToken.user})
    
    if (userFromDB.auth_level < constants.MINIMUM_AUTHENTICATION_LEVEL_FOR_ADDING_PRODUCTS)
    {
        return res.status(403).json({message: "insufficient priviledges"});
    }


    // for now we will allow adding products with same names
    const newProduct = {
        title:title,
        price:price,
        product_details:productDetails,
        image_filename:req.file.filename, // grab the unique filename we generated
    }
    
    await productModel.create(newProduct);

    return res.status(200).end();
})

//////////////////////////////////////////////////////////////////////////
///////////////// pull all products from db //////////////////////////////
//////////////////////////////////////////////////////////////////////////
app.get('/products', async (req, res) => {
    const products = await productModel.GetAll();
    
    // map each product to a new object that includes the image URL
    const productsWithImageUrls = products.map(product => {
        return {
            id: product._id,
            title: product.title,
            price: product.price,
            productDetails: product.product_details,
            imageUrl: `http://localhost:${LISTEN_PORT}/${constants.UPLOAD_DIRECTORY}/${product.image_filename}`
        }
    });

    return res.status(200).json(productsWithImageUrls);
})

// our own error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(constants.SERVER_ERROR_MSG_GENERIC);
});

app.listen(LISTEN_PORT, () => {
  console.log(`Server started on port ${LISTEN_PORT}`);
});
