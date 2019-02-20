const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const mongoose= require('mongoose');

const userRoutes= require('./routes/users');




const app= express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/MernApp',{useNewUrlParser:true })
.then(()=>console.log('mongodb Connected'))
.catch((e)=>console.log("error",e));


app.use('/user',userRoutes)

app.listen('5000',()=>console.log("Serving At 5000"));



