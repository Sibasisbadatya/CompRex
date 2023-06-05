const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
// const __dirname1 = path.resolve();
const socket = require("socket.io");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}));

const port = process.env.PORT || 8000;
// require("./")
app.use("/images", express.static('images'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
require("./DB/connection");
app.use(require("./router/router"));
dotenv.config()
app.use(cookieParser());

const server = app.listen(port, () => {
    console.log("connected to port 8000");
})
