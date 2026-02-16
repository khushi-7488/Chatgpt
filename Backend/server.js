import express from "express";
import "dotenv/config";
import cors from 'cors';
import mongoose, { mongo } from "mongoose";
import chatRoutes from "./routes/chat.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});

const connectDB = async() =>{
    try{
      await mongoose.connect(process.env.MONGODB_URL);
      console.log("Connected with Database");
    }catch(err){
      console.log("failed to connect with db ", err);
    }
}


// app.post("/test", async (req, res) => {
//   // 1. Specify the full endpoint with the model name and the :generateContent action
//   const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//       // Note: Usually, the key is passed as a query param (above) or x-goog-api-key header.
//     },
//     body: JSON.stringify({
//       contents: [
//         {
//           role: "user",
//           parts: [{ text: req.body.message }] // Parts must be an array of objects with a 'text' property
//         }
//       ]
//     })
//   };

//   try {
//     // 2. Added 'await' here
//     const response = await fetch(API_URL, options);
//     const data = await response.json();
    
//     console.log("Gemini Response:", data.candidates[0].content.parts[0]);  //reply
//     res.send(data.candidates[0].content.parts[0]);
//   } catch (err) {
//     console.error("Error calling Gemini:", err);
//     res.status(500).send({ error: "Failed to fetch from Gemini API" });
//   }
// });