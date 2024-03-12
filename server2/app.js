const express = require('express')
const bodyparser = require("body-parser")
const cors = require('cors');
const dbConnet = require("./utils/dbConnect");
const app = express();
const passengerRoutes = require("./router/passengerRoutes");
const adminRoutes = require("./router/adminRoutes");
const trainRoutes = require("./router/trainRoutes")
app.use(express.json());

app.use(express.static("uploads"))
app.use(express.static("public"))
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/passenger",passengerRoutes);
app.use("/admin",adminRoutes);
app.use("/train",trainRoutes);
dbConnet();



require('dotenv').config();
const server = process.env.PORT;

app.listen(server, () => {
    console.log(`server is running in the server ${server}`)
})