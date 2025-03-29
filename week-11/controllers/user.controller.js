import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();
const register = async (req, res)=>{

    const {name, email , phone, password} = req.body;

    if(!name || !email || !phone || !password){
        res.status(400).json({
            message:"all filelds are requried"
        })
    }

    try {
        const existing  = await prisma.user.client
    } catch (error) {
        
    }

}