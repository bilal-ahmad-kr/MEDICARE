const authorize = (...Roles) =>{
    return (req, res, next) => {
        try{
            if(!Roles.includes(req.user.role)){
                res.status(403).json({
                    success: false,
                    message: "Access denied",
                })
            }
            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}
module.exports = authorize