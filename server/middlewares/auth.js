import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) =>{
    const {token} = req.headers;
    
    if(!token){
        return res.json({success: false, message: 'Not Authorized. Login Again'});
    }

    try {
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);

        if(tokenDecode.id){
            req.userId = tokenDecode.id;
        }else{
            return res.json({success: false, message: 'Not Authorized. Login Again'});
        }

        next(); // next() is written so that we can move to the next step in the pipeline 
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export default userAuth