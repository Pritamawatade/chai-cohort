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
    const existingUser = User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({
        message: "User already exists",
      });
    }
    const user = await User.create({ user });

    if (!user) {
      res.status(500).json({ message: "user not created" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;

    await user.save();

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

    await transporter.sendMail(mailOption);

    res.status(200).json({
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

  const user = User.findOne({verificationToken:token})

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
    const user = User.findOne({email});

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

    if(user.isVerified == false){
      return res.status(400).json({
        message:"please verify your email"
      })
    }
    const token = jwt.sign({id: user._id, email},
      "shhhh",
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

const changePass = async  (req,res) =>{
  
  const {email, oldPass, newPass } = req.body;

  if(!email || !oldPass || !newPass){
    return res.status(400).json({
      message:"all fields are required"
    })
  }

  try {
    
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        message:"no user is found"
      })
    }

    const isMatch = await bcrypt.compare(oldPass, user.password);

    if(!isMatch){
      return res.status(400).json({
        message:"wrong password"
      })
    }
    user.password = newPass;
    await user.save();
    return res.status(200).json({
      success:true,
      message:"password is changed"
    })
  } catch (error) {
    return res.status(400).json({
      message:"something went wrong"
    })
  }
}


export { registerUser , verify, login,changePass};
