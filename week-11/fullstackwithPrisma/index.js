import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"

const app = express();
dotenv.config();
app.use(cors({
    origin: process.env.BASE_URL
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const port = process.env.PORT || 4000;

app.listen(port, ()=>{
    console.log(`server is running on post ${port}`)
})
