import jwt from 'jsonwebtoken';

const authMiddleware = async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({
            success:false,
            message:"User is not authorized login again"
        });
    }
    try {
        // console.log("token is find ")
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decoded.id;
        // console.log("userid ", req.body.userId)
        // console.log("token is verified");
        next();
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"Error in middleware "
        });
    }
}

export default authMiddleware