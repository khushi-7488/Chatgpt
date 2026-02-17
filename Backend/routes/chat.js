import express from "express";
import Thread from "../models/Thread.js"
import getOpenAIAPIResponse from "../utils/genai.js"

const router = express.Router();

router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "abc",
            title: "Testing new thread"
        })
        const response = await thread.save();
        res.send(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to save in DB" });
    }
})

//to get all threads
router.get("/thread", async (req, res) => {
    try {
        const threads = await Thread.find({}).sort({ updatedAt: -1 });
        //descending order of updatedAt
        res.json(threads);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to fetch threads" })
    }
})
//to get thread by id
router.get("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const thread = await Thread.findOne({ threadId });
        if (!thread) {
            res.status(400).json({ error: "Thread is not found" });
        }
        res.json(thread.message);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to fetch chat" })
    }
})
//to delete
router.delete("/thread/:threadId", async (req, res) => {
    const { threadId } = req.params;
    try {
        const deletedThread = await Thread.findOneAndDelete({ threadId });
        if (!deletedThread) {
            res.status(400).json({ error: "Thread is not found" });
        }
        res.status(200).json({ success: "Thread is deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "failed to delete thread" })
    }
})
//to post request
router.post("/chat", async (req, res) => {
    const { threadId, message } = req.body;
    if (!threadId || !message) {
        res.status(400).json({ error: "missing required feilds" })
    }
    try {
        let thread = await Thread.findOne({ threadId });
        if (!thread) {
            thread = new Thread({
                threadId,
                title: message,
                message: [{ role: "user", content: message }]
            })
        } else {
            thread.message.push({ role: "user", content: message });
        }

        const assistanceReply = await getOpenAIAPIResponse(message);

        thread.message.push({ role: "assistant", content: assistanceReply.text });
        thread.updatedAt = new Date();
        await thread.save();

        res.json({ reply: assistanceReply.text });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong" })
    }
})

export default router;