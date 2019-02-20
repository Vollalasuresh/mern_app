const express= require('express');
const bcrypt= require('bcrypt-nodejs');
const cors= require('cors');
const jwt= require('jsonwebtoken');
const user= require('../models/users');

const router= express.Router();

router.use(cors());

process.env.SECRET_KEY= 'secret';


router.post('/register',(req,res)=>
{
  us= new user() ;
  user.findOne({ email:req.body.email},(err,u)=>
  {
      if(!u)
      {
        us.name= req.body.name;
        us.password= req.body.password;
        us.email= req.body.email;
       us.password= bcrypt.hashSync(req.body.password,(2));
    
        us.save().then(s=>res.send(s)).catch(e=>res.send(e));

      }
      else{
        res.send("User Already Exist")
      }
      
})

})



router.post('/login',(req,res)=>
{
  console.log(req.body)
  user.findOne({email:req.body.email}).then((us)=>
    {
      
      r= bcrypt.compareSync(req.body.password, us.password);
      console.log(r)
      if(us)
      {
        console.log("in if ",us)
        if(req.body.password==us.password){
          res.send("Successfully Loged in");

        }
        else{
          res.send("Invalid Password");

        }
      }
      else{
        res.send("User NOt exists");

      }
    }).catch(err=>{
      console.log(err);
      res.send(err);
    })
  
})


module.exports= router;
