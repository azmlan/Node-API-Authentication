const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../model/User');

const {registerValidation , loginValidation  }= require('../validation');

router.post('/register',async (req,res)=>{

    // Validate Request
        const {error}= registerValidation(req.body)    
        
        const emailExist = await User.findOne({email:req.body.email})
        if(emailExist) return res.status(400).send("Email Already Exist");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await  bcrypt.hash(req.body.password, salt);

        if(error) return res.status(400).send(error.details[0].message);        
            const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPassword,
            });
        try {
            const savedUser = await user.save();
            res.send({id:user._id});
            console.log("Saved. !");

        } catch (error) {
            res.status(400).send(error);
            console.log("Not Saved ");
        }
        
});
router.post('/login',async (req,res)=>{

        // Validate Request
        const {error}= loginValidation(req.body)
        if(error) return res.status(400).send(error.details[0].message);
        try {
            
            const user = await User.findOne({email:req.body.email})
            if(!user) return res.status(400).send("Email or password is wrong");
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword) return res.status(400).send("Email or password is wrong");
            // Create a token and assign 
            const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET);
            res.header('auth-token',token).send(token);

        } catch (error) {
            res.send("Catch Error",error)
        }        

        
        
        
        
});




module.exports= router; 