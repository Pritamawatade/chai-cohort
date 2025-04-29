import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto"; // Make sure crypto is imported

const prisma = new PrismaClient();

export const register = async (req, res) => {
    console.log("register");
    const { name, email, password, phone } = req.body;

    // ✅ Validation
    if (!name || !email || !phone || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    try {
        // ✅ Check if user already exists
        const existing = await prisma.user.findUnique({
            where: { email },
        });

        

        if (existing) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // ✅ Hash Password
        const hashedPass = await bcrypt.hash(password, 10);

        // ✅ Generate Verification Token
        const token = crypto.randomBytes(32).toString("hex");

        // ✅ Create User
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPass,
                phone,
                verificationToken: token, // Save token in DB
                isVerified: false, // Set false initially
            },
        });

        console.log("User created successfully");

        // ✅ Send Verification Email
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
            subject: "Please Verify Your Email",
            text: `Please click on the following link to verify your account: \n
            ${process.env.BASE_URL}/api/v1/users/verify/${token}`,
        };

        await transporter.sendMail(mailOption);

        return res.status(201).json({
            message: "User registered successfully, please verify your email",
            success: true,
        });
    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            message: "User creation failed",
            success: false,
        });
    }
};

export const verify = async (req, res) => {
  const { token } = req.params;

  if (!token) {
    return res.status(400).json({
      message: "token is required",
    });
  }

  try {
    console.log("verify 1");
    
    // Correctly find user by verification token
    const user = await prisma.user.findFirst({
        where: { verificationToken: token },
    });

    // Check if user exists
    if (!user) {
        return res.status(400).json({
            message: "token is not valid",
        });
    }
    console.log("verify 2");

    // Update user verification status
    await prisma.user.update({
        where: { id: user.id },
        data: {
            isVerified: true,
            verificationToken: null, // Set to null, not undefined
        },
    });
    console.log("verify 3");

    return res.status(200).json({
        message: "User verified successfully",
    });
} catch (error) {
    console.error("Verification Error:", error);
    return res.status(500).json({
        message: "User verifying error",
    });
}

};

