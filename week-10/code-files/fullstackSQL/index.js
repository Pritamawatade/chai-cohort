import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/auth.route.js";
const app = express();
const port = process.env.PORT || 4000;
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({
    origin:process.env.BASE_URL
}))



app.get('/',(req,res)=>{
    res.status(200).json({
        message:"root response"
    })
})


app.use("/api/v1/users", userRouter);

app.listen(port, ()=>{
    console.log(`app is running on ${port}`);
    
})

