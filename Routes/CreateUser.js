const express = require("express");
const router = express.Router();
const user = require("../model/model");
// validation proces
const {body , validationResult} = require("express-validator");

// password hashing
const bcrypt = require("bcryptjs");

// jsonwebtoken 
const jwt = require("jsonwebtoken");
const jwtsecretkey ="Iamwebdeveloperbhushanchanoredevelopwebsites";

// fo signup process 
router.post("/createuser" , [
    body("email" , "incorrect email").isEmail(),
    body("password" , "incorrect password").isLength({min : 5})
],

async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const salt = await bcrypt.genSalt(10);
    let secpassword = await bcrypt.hash(req.body.password , salt);
   try {

    user.create({
        name:req.body.name,
        location:req.body.location,
        email:req.body.email,
        password:secpassword
    })

    res.json({success:true})

   } catch (error) {
    console.log(error);
    res.json({success:false})
   }
})


// for login process

router.post("/Loginuser" , [
    body("email" , "incorrect email").isEmail(),
    body("password" , "incorrect password").isLength({min : 5})
],

async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
let email = req.body.email;
   try {

    let userData = await user.findOne({email});

    if(!userData)
    {
        return res.status(400).json({errors:"Invalid email enter"});
    }
    
    // here we comparing the hash password and the password getting through user in login field
    const pwdcompare = await bcrypt.compare(req.body.password ,userData.password );
    if(!pwdcompare)
    {
        return res.status(400).json({errors:"Invalid password"});
    }

    // jwswebtoken

    const data = {
        user:{
            id:userData.id
        }
    }
    const authToken = jwt.sign(data , jwtsecretkey);
    
    return res.json({success:true , authToken:authToken});

    

   } catch (error) {
    console.log(error);
    res.json({success:false})
   }
})

module.exports = router;