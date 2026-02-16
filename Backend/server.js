// import express from "express";
// import "dotenv/config";
// import cors from 'cors';

// const app = express();
// const PORT = 8080;

// app.use(express.json());
// app.use(cors());

// app.listen(PORT, () => {
//   console.log("server running")
// })

// app.post("/test", async (req, res) => {
//   // Use a variable to make sure the key is being read correctly
//   const apiKey = process.env.GEMINI_API_KEY;

//   const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//       // Removed 'x-goog-api-key' header to avoid conflict with the URL parameter
//     },
//     body: JSON.stringify({
//       contents: [  // Fixed: changed 'massages' to 'contents'
//         {
//           role: "user",
//           parts: [{ text: "Hello" }] // Fixed: parts must be an array of objects with 'text'
//         }
//       ]
//     })
//   };

//   try {
//     const response = await fetch(API_URL, options);
//     const data = await response.json();

//     if (!response.ok) {
//       console.error("Gemini Error Response:", data);
//       return res.status(response.status).json(data);
//     }

//     console.log("Success:", data);
//     res.send(data);
//   } catch (err) {
//     console.error("Server Error:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

import express from "express";
import "dotenv/config";
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.post("/test", async (req, res) => {
  // 1. Specify the full endpoint with the model name and the :generateContent action
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      // Note: Usually, the key is passed as a query param (above) or x-goog-api-key header.
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: req.body.message }] // Parts must be an array of objects with a 'text' property
        }
      ]
    })
  };

  try {
    // 2. Added 'await' here
    const response = await fetch(API_URL, options);
    const data = await response.json();
    
    console.log("Gemini Response:", data.candidates[0].content.parts[0]);  //reply
    res.send(data.candidates[0].content.parts[0]);
  } catch (err) {
    console.error("Error calling Gemini:", err);
    res.status(500).send({ error: "Failed to fetch from Gemini API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});