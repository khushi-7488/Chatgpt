import "dotenv/config";

const getGenAiAPIResponse = async (message) => {
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
                    parts: [{ text: message }] // Parts must be an array of objects with a 'text' property
                }
            ]
        })
    };

    try {
        const response = await fetch(API_URL, options);
        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", data);
            throw new Error(data.error?.message || "Gemini API returned an error");
        }

        if (!data.candidates || !data.candidates[0]) {
            console.error("Invalid Gemini response:", data);
            throw new Error("No candidates in response");
        }

        console.log("Gemini Response:", data.candidates[0].content.parts[0]);
        return data.candidates[0].content.parts[0];
    } catch (err) {
        console.error("Error calling Gemini:", err);
        throw err;
    }
}

export default getGenAiAPIResponse;