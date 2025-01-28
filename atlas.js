const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose
    .connect(
        "mongodb+srv://prasoon:prasoon@cluster0.zbw5q.mongodb.net/?retryWrites=true&w=m" +
        "ajority&appName=Cluster0"
    )
    .then(function () {
        console.log("connected to database");
    })


app.get("/", (req, res) =>{
    res.send("Hello");
})

app.listen(3000);