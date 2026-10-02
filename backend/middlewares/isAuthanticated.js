import jwt from "jsonwebtoken";

const isAuthanticated = async (req, res, next) => {
     try {
        const token = req.cookies.token; // Retrieve the JWT token from the request cookies
        if(!token){
            return res.status(401).json({
                message: "Unauthorized access. Please log in.",
                success:false
            });
        }

         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token using the secret key from environment variables
        //  console.log(decoded); 
         req.id = decoded.userId; // req.id is a variable that is used to store the user id from the decoded token. This id can be used in subsequent middleware or route handlers to identify the authenticated user.
         next();
     } catch (error) {
        console.error("Error during authentication:", error);
        return res.status(500).json({ message: "Internal server error" });
     }
}

export default isAuthanticated;