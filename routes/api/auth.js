import express from 'express';
import auth from '../../middleware/auth';
import {check, validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcryptjs'
import User from '../../models/User';

const router = express.Router();

router.get('/',auth, async (req,res)=>{
    try{
        
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server Error!!');
    }
});

// router.get('/',(req,res)=>res.send('User route'));
router.post('/',[
   
    check('email','Enter valid email!!').isEmail(),
    check('password','Password is required').exists()
],
async (req,res)=>{
// Finds the validation errors in this request and wraps them in an object with handy functions
console.log(req.data);
const errors = validationResult(req);
if (!errors.isEmpty()) 
  return res.status(422).json({ errors: errors.array() });

  const{email,password}= req.body;

try{
let user = await User.findOne({email});
//if the email entered is not registered
if(!user)
  res.status(400).json({errors:[{msg:'Invalid Credentials'}]});
const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch){
    res.status(400).json({errors:[{msg:'Invalid Credentials'}]}); 
}

const payload ={
  user:{
    id:user.id
  }
}
jwt.sign(
    payload,
     config.get('jwtSecret'),
     {expiresIn:3600000},
     (err,token)=>{
        if(err) throw err;
        res.json({token});
        }
    );
} catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;