import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chatkit/session", async (req, res) => {
  try {
    const session = await client.chatkit.sessions.create({
      workflow: { id: "wf_691c0e5d6fa8819082aa3d4a29abf2600ac3b41e3639c4c7" },
      user: "user-123"
    });

    res.json({ client_secret: session.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("🔥 ChatKit backend running on port 3000"));
