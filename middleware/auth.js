import jwt from 'jsonwebtoken';
import config from 'config';
//middleware function is any ordinary function which has acces over the req, res and next function
module.exports = function(req,res,next){
    //Get token from the header
    const token = req.header('x-auth-token');
    //check if no token
    if(!token){
        return res.status(401).json({msg:'No Authorization!'});
    }
    //Verify token
    try{
        const decoded = jwt.verify(token,config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    }
    catch(err){
        res.status(401).json({msg:'Token is not valid'});
    }
};