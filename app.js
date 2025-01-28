const express = require('express');
const app = express();
const mongooseConnection = require('./config/mongoose');
const userModel = require("./models/user");
const debuglog = require('debug')("development:mongooseconfig");
debuglog.enabled = true;
// lines for reading req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) =>{
    res.send("Hello");
})

app.get("/create", async function(req, res, next) {
    let createdUser = await userModel.create({
        username: "Prasoon",
        name: "Prasoon",
        email: "prasoon@gmail.com",
        password: "Prasoon"
    })

    debuglog("User Created");
    res.send(createdUser);
})

app.get("/read", async function(req, res, next) {
    let user = await userModel.findOne({ name: "Prasoon"}); // findOne gives one only, find() -> gives all users
    debuglog("Read");
    res.send(user);
})

// in findOneAndUpdate it returns you the old user value, to get the updated values use {new: true}
app.get("/update", async (req, res, next) => {
    let user = await userModel.findOneAndUpdate({name: "Prasoon"}, {name: "Prasoon Pathak"}, {new: true});
    res.send(user);
})

app.get("/delete", async (req, res, next) =>{
    let user = await userModel.findOneAndDelete(({name: "Prasoon Pathak"}));
    res.send(user);
})

app.post("/bodyPass", async (req, res, next) => {
    let {name, username, email, password} = req.body;
    let createdUser = await userModel.create({
        name,
        username,
        email,
        password
    })

    res.send(createdUser);
})

app.get("/allUsers", async (req, res, next) => {
    let users = await userModel.find();
    res.send(users);
})

app.get("/users/:username", async (req, res, next) => {
    let user = await userModel.findOne({username: req.params.username});
    res.send(user);
})

app.get("/update/:username", async (req, res, next) => {
    let {name, username, email} = req.body;
    let user = await userModel.findOneAndUpdate({username: req.params.username}, {name, username, email}, {new: true});
    res.send(user);
})

app.get("/delete/:username", async (req, res, next) =>{
    let user = await userModel.findOneAndDelete(({username: req.params.username }));
    res.send(user);
})

app.listen(3000);