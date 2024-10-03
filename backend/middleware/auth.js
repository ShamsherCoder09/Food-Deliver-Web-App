import jwt from 'jsonwebtoken';

const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        res.json({
            success:false,
            message:"User is not authorized login again"
        });
    }
    try {
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error in middleware "
        });
    }
}

export default authMiddleware;