const express = require("express");
const app = express();

//const multer = require("multer");
//const uploadConfig = require("./config/upload");
const mongoose = require("mongoose");
const config = require("./config/database");
//const path = require("path");
const cors = require("cors");


//const upload = multer(uploadConfig);

mongoose.connect(config.url, {
    useNewUrlParser: true,
    useFindAndModify: false
});

app.use(cors());
app.use(express.json());


//Rotas depois do Login
app.use(require("./routes"));

app.listen(process.env.PORT || 3000);