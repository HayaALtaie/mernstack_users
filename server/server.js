// CREATE SERVER
const express = require("express")
const app = express()

const cors = require("cors")
const mongoose = require("mongoose")
require('dotenv').config()

app.use(cors())
app.use(express.json())

// CONNECT TO DB
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('db connected'))
.catch((err)=> console.log(err))


// USER MODEL
const UserModel = require('./models/Users')


// get request
app.get("/users", async (req, res)=>{
    const users = await UserModel.find();
    res.json(users)
})


// create user
app.post("/createUser", async (req, res) => {
    const newUser = new UserModel(req.body);
    await newUser.save();
    res.json(req.body)
})


app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;

    UserModel.findByIdAndDelete(id)
    .then(item => {
        res.status(200).json({ 'item': 'تمت الحذف بنجاح' });
    })
    .catch(err => {
        res.status(400).send('فشلت عملية الحذف');
    });
});

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
    console.log("Server Works")
})