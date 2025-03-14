import User from "../model/User.model.js";
import crypto from "crypto";
import nodemailer from "nodemailer"
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body);
  if (!name || !email || !password) {
    return res.status(200).json({
      message: "ALl feilds are required",
    });
  }
  
  try {
    const existingUser = User.findOne({email})
    if(existingUser){
      return res.status(200).json({
        message: "User already exists",
      });  
    }
    const user = await User.create({user});

    if(!user){
    res.status(500).json({message:"user not created"})
      
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.verificationToken = token;

    await user.save()

    
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

  } catch (error) {
    res.status(500).json({message:"something went wrong"})
  }
};

export { registerUser };
