import bcrypt from "bcryptjs";
import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(200).json({
      message: "ALl feilds are required",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const user = await User.create({ name, email, password });

    if (!user) {
      return res.status(500).json({ message: "user not created" });
    }

    const token = await crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;

    await user.save();
    console.log("before transporter");
    

    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST,
      port: process.env.MAILTRAP_PORT,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });

    const mailOption = {
      from: process.env.MAILTRAP_SENDEREMAIL,
      to: user.email,
      subject: "please verify your email",
      text: `Please click on the following link 
  ${process.env.BASE_URL}/api/v1/users/verify/${token}
  `,
    };
console.log("after mail options");

await transporter.sendMail(mailOption);
console.log("after send mail");

    return res.status(200).json({
      message:"user registed succefully",
      success: true
    })
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const verify = async (req,res)=>{

  const {token} = req.params

  console.log(token);

  if(!token){
    return res.status(400).json({
      message:"invalid token"
    })
  }

  const user = await User.findOne({verificationToken:token})

  if(!user){
    return res.status(400).json({
      message:"invalid token"
    })
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  
  await user.save();
  return res.status(200).json({
    message:"verify user successfully"
  })

}

const login  = async (req,res)=>{
  const {email, password} = req.body

  if(!email || !password){
    return res.status(400).json({
      message:"invalid email or password"
    })
  }

  try {
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        message:"Invalid email or password"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
      return res.status(400).json({
        message:"password not match"
      })
    }

    if(user.isVerified !== true){
      return res.status(400).json({
        message:"please verify your email"
      })
    }
    const token =  jwt.sign({id: user._id, email},
      process.env.JWT_SECRET,
      {
        expiresIn: '24h'
      }
    )

    const cookieOption = {
        httpOnly: true,
        secure: true,
        maxAge: 24*60*60*1000
    }
    res.cookie("token", token, cookieOption )

    
    return res.status(200).json({
      message:"user logged in",
      user:{
        id: user._id,
        name: user.name,
        role: user.role
      },
      token,
      success:true
    })
  } catch (error) {
    return res.status(400).json({
      message:"something went wrong at login"
    })
  }
}

const getMe = async (req, res)=>{
  try {
    
  } catch (error) {
    
  }
}

const resetPassword = async (req, res) =>{
  try {
    
  } catch (error) {
    
  }
}

const logoutUser = async (req,res)=>{
  try {
    
  } catch (error) {
    
  }
}

const forgotPassword = async (req,res)=>{
  try {
    
  } catch (error) {
    
  }
}

export { registerUser , verify, login,resetPassword, forgotPassword, logoutUser, getMe};
