const express=require("express");
const router=express.Router();
const User = require("../models/User");
const {body,validationResult}=require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser=require("../middleware/fetchuser")

const JWT_SECRET="Iamagre@tcoder"

// ROUTE 1:create a user using: POST "/api/auth/createuser" no login required 
router.post("/createuser",[
    body("name","Enter a valid name").isLength({min:5}),
    body("email","Enter a valid email").isEmail(),
    body("password","Password must be at least 8 characters").isLength({min:8}),

],
async (req,res)=>{
  let success=false;
    // if there are errors return Bad request and the errors
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ success,errors:errors.array()});
  }
//   check whether the user with this email exist already
try {
    let user=await User.findOne({ email:req.body.email});
    if(user){
        return res.status(400).json({success,error:"sorry a user with this email already exists"})
    }

    
    const salt= await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    
    
    // creates a new user
    user= await User.create({
        name:req.body.name,
        email:req.body.email,
        password:secPass
    })
    
    const data={
        user:{
            id:user.id
        }
    }

    const authToken=jwt.sign(data,JWT_SECRET);
    success=true
    res.json({success,authToken})
    // console.log({authToken});

    // res.json(user)
} catch (error) {
    console.log(error);
    res.status(500).send("some error occured")
}
})


// ROUTE 2: Authenticate a user using Post "/api/auth/login",no login required
router.post("/login",[
    body("email","Enter a valid email").isEmail(),
    body("password","Password cannot be blank").exists(),
],async (req,res)=>{
  let success=false;
  // if there are errors return Bad request and the errors
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  

  const {email,password}=req.body;
  try {

    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({error:"Try to login with correct credentials"});
    }

    const passwordCompare= await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      success=false;
        return res.status(400).json({success,error:"Try to login with correct credentials"});
    }
    
    const data={
        user:{
            id:user.id
        }
    }
    const authToken=jwt.sign(data,JWT_SECRET);
    success=true;
    res.json({success,authToken})

  } catch (error) {
    console.log(error);
    res.status(500).send("some internal server error occured")
  }

  })


  // ROUTE 3: get users detailed after logged in using POST "/api/auth/getuser", login required
router.post("/getuser",fetchuser,async(req,res)=>{
  try {
    userId=req.user.id;
    const user= await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.log(error);
    res.status(500).send("some internal server error occured")
  }
})

module.exports=router;