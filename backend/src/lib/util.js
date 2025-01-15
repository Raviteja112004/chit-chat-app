import jwt from 'jsonwebtoken'
export const generateToken = (userId, res)=>{
    const token =  jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000, //token expires in 7days(in ms)
        httpOnly:true, //prevent xss attack
        sameSite:"strict", //csrf attcks
        secure: process.env.NODE_ENV !== "development",
    })
    return token;
}