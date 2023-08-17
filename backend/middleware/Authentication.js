const jwt = require('jsonwebtoken'); // for authentication token

const authUser =  (req,res,next) =>{
    const token = req.header('authorization');
    console.log(token);
    if(!token){
        return res.status(402).json({msg:'denied'});
    }  
    try{
        const decrypt = jwt.verify(token, process.env.JWT_SECRET); // verify token
        req.user = decrypt.user;
        next();
    }   
    catch(error){
        res.status(402).json({msg:"Invalid Token"});
    }       
};

module.exports = authUser;