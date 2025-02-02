require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const pdfParse = require("pdf-parse");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/docQA", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const DocumentSchema = new mongoose.Schema({
  name: String,
  content: String,
});
const Document = mongoose.model("Document", DocumentSchema);

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    let content = buffer.toString("utf-8");

    if (originalname.endsWith(".pdf")) {
      const pdfData = await pdfParse(buffer);
      content = pdfData.text;
    }

    const doc = new Document({ name: originalname, content });
    await doc.save();
    res.json({ message: "File uploaded successfully", docId: doc._id });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

app.post("/ask", async (req, res) => {
  try {
    const { docId, question } = req.body;
    const document = await Document.findById(docId);

    if (!document) return res.status(404).json({ error: "Document not found" });

    const API_KEY = 'c6aa13c0b151bbbb555ecbeb77dcfc519eeca8044f1eb1010ab41f16a6ec04e7'; // Store API key in .env file
    const API_URL = "https://api.together.xyz/v1/chat/completions";

    const response = await axios.post(
      API_URL,
      {
        model: "mistralai/Mistral-7B-Instruct-v0.1", // Free Together AI model
        messages: [
          { role: "system", content: "You are a helpful AI assistant." },
          { role: "user", content: `Answer based on:\n${document.content.slice(0, 4000)}\n\nQuestion: ${question}` }
        ],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Error in /ask:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch answer" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
