const express = require('express');
const User = require("../models/User")
const {body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const fetchUser = require("../middleware/fetchUser")

const route = express.Router();

const secret = "kyakrrha&bahi";

// create user endpoint
route.post('/createuser',[
            body('name').isLength({min : 3}),
            body('email').isEmail(),
            body('password').isLength({min : 5})
        ] ,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false, error: errors.array() });
    }
    try{

        let user = await User.findOne({email: req.body.email});
        if(user)
        {
            return res.status(400).json({success: false, error: "Email already exit"})
        }

        // Password encription
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass,
        })
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: 'input unique email ID'})})
        // res.json(req.body);

        // returning authentification token
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,secret);
        // console.log(authtoken)
        res.json({success: true, authtoken})
    } catch(err){
        console.log(err.message)
        res.status(500).send({success: false, error: "Something Went Wrong"})
    }
})


// user login validation endpoint
route.post('/login',[
            body('email').isEmail(),
            body('password').exists()
        ] ,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success: false,errors: errors.array()});
    }
    try{
        const {email, password} = req.body

        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({success: false,error: "invalid input"})
        }

        // Password comparison
        const passwordcomparing = await bcrypt.compare(password,user.password);
        if(!passwordcomparing){
            return res.status(400).json({success: false,error: "invalid input"})
        }

        // returning authentification token
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data,secret);
        res.json({success: true,authtoken})
    } catch(err){
        console.log(err.message)
        res.status(500).send("Something Went Wrong")
    }
})


// user login granted endpoint
route.post('/getuser',fetchUser,async (req,res)=>{
    
    try{
        const userid = req.user.id
        const user = await User.findById(userid).select("-password")
        res.send(user);
    } catch(err){
        console.log(err.message)
        res.status(500).send("Something Went Wrong")
    }
})

module.exports = route