

const isLoggedIn = async (req, res, next)=>{
    try {
        console.log(req.cookies);

        let token = req.cookies.token || "";
        
        
    } catch (error) {
        
    }
next()
}

export { isLoggedIn}