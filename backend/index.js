import express from 'express';  // Import the express module
import dotenv from 'dotenv'; // Import the dotenv module to load environment variables
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js'; // Import the userRoute module]
import messageRoute from './routes/messageRoute.js'; // Import the messageRoute module
import cookieParser from 'cookie-parser'; // Import the cookie-parser middleware
import cors from 'cors'
import http from 'http';
import initializeSocket from './socket/socket.js';

dotenv.config(); // Load environment variables from the .env file

const corsOption = {
 origin:'http://localhost:3000',
 credentials:true
}

const app = express(); // Create an instance of the express application
const server = http.createServer(app);
initializeSocket(server);
app.use(cookieParser()); // Use the cookie-parser middleware
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.urlencoded({extended:true})) 
app.use(cors(corsOption))


const PORT = process.env.PORT || 5000; // Set the port to an environment variable or default to 5000

// routes
app.use("/api/v1/user", userRoute );
app.use("/api/v1/message", messageRoute );
// localhost:8080/api/v1/user/register

server.listen(PORT, () =>{
    connectDB(); // Call the connectDB function to connect to the database
    console.log(`Server is running on port ${PORT}`); // Log a message when the server starts
})

