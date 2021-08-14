import express from 'express';
import {check, validationResult} from 'express-validator';
import User from '../../models/User';
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs'
import jwt, {JsonWebTokenError } from 'jsonwebtoken';
const config = require('config');
const router = express.Router();


// router.get('/',(req,res)=>res.send('User route'));
router.post('/',[
    check('name','Name is required!!')
    .not()
    .isEmpty(),
    check('email','Enter valid email!!').isEmail(),
    check('password','Enter atleast 6 charcters!!').isLength({min:6})
],
async (req,res)=>{
// Finds the validation errors in this request and wraps them in an object with handy functions
const errors = validationResult(req);
if (!errors.isEmpty()) 
  return res.status(422).json({ errors: errors.array() });

  const{name,email,password}= req.body;
  console.log(name, email, password);

try{
let user = await User.findOne({email});

if(user)
  res.status(400).json({errors:[{msg:'User already exists!'}]});

//see if User exists
const avatar = gravatar.url(email,{
  s:'200',
  r:'pg',
  d:'mm'
})
user = new User({
name,
email,
avatar,
password
});
//Get User Gravatar
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(password,salt);
await user.save();
const payload ={
  user:{
    id:user.id
  }
}
jwt.sign(payload, config.get('jwtSecret'),{expiresIn:3600000},(err,token) => {
  if(err) throw err;
  res.json({token});
});


}catch(err){
console.error(err.message);
res.status(500).send('Server Error');
}
})
module.exports = router;