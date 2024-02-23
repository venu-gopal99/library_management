const express = require('express')
const bodyparser = require("body-parser")
const cors = require('cors');
const dbConnet = require("./utils/dbConnect");
const studentRoute = require("./routes/studentRoutes")

const app = express();
app.use(express.json());
app.use(express.static("uploads"))
app.use(express.static("public"))
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/student",studentRoute)
dbConnet();



require('dotenv').config();
const server = process.env.PORT;

app.listen(server, () => {
    console.log(`server is running in the server ${server}`)
})