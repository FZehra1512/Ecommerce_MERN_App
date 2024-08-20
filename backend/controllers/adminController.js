export const addProduct=(req,res)=>{
    res.send({
        message: "Admin add product API",
        user: req.user, // Sending user details in the response
      });
}