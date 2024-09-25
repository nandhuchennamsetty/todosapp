const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const cors = require("cors");
const router = require("./route/TaskRoute");

const app = express();

mongoose
    .connect(process.env.baseUri)
    .then(() => 
        console.log("Database is connected Successfully")
    )
    .catch((err)=>
    console.log("Mongodb not Connected",err)
    )

PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cors());
app.use('/api',router)
app.listen(PORT, () => {
    console.log(`app is Listening at ${PORT} port`);
})