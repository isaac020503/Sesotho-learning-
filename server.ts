import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Chat route proxying to Gemini
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing or invalid 'messages' array in request body." });
    }

    // Lazy load and verify key
    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      return res.status(500).json({ 
        error: "Gemini API key is not configured in this applet's secrets.", 
        details: err.message 
      });
    }

    // Convert messages into GenAI dialogue structure
    // Our types define sender as 'user' | 'gemini'
    // GenAI expects role to be 'user' or 'model'
    const genAiContents = messages.map((m: any) => {
      return {
        role: m.sender === "user" ? "user" : "model",
        parts: [{ text: m.text }]
      };
    });

    const systemInstruction = 
      "You are Sanya, a patient, welcoming, and helpful native Southern Sesotho language tutor.\n" +
      "Your objective is to help the user learn and practice Sesotho in a casual yet structured conversational way.\n" +
      "Keep responses relatively brief (under 120 words) to ensure high readability as a chat partner.\n" +
      "Rules for your response:\n" +
      "1. Respond in clear, correct Southern Sesotho (Lesotho orthography) first.\n" +
      "2. You MUST strictly use standard Lesotho orthography, including spelling preferences such as:\n" +
      "   - Use 'Lumela' or 'lumela' (not 'Dumela' or 'dumela')\n" +
      "   - Use 'joang' (not 'jwang')\n" +
      "   - Use 'uena' (not 'wena')\n" +
      "   - Use 'ea' and 'tsa' as possessive or relative particles (not 'ya', 'za')\n" +
      "   - Use 'u' for the second-person singular subject concord (e.g., 'U phela joang?' instead of 'O phela jwang?') and keep 'o' for third-person singular class 1 (he/she)\n" +
      "   - Use 'li' and 'lijo' (not 'di' and 'dijo')\n" +
      "   - Use 'kh' instead of 'kg' (e.g., 'khotso' instead of 'kgotso', 'khothatsa' instead of 'kgothatsa')\n" +
      "   - Use 'tsamaea' instead of 'tsamaya'\n" +
      "3. Provide an English translation of your Sesotho response directly below (enclosed in square brackets, [Like this]).\n" +
      "4. GENTLY examine their latest message. If there were errors in their Sesotho grammar, vocabulary, or spelling (especially if they use South African/Sotho-Tswana orthography instead of Lesotho's Southern Sesotho), point them out kindly with a brief, simple explanation and suggest the correct wording in Lesotho orthography.\n" +
      "5. If they asked a direct question about vocabulary, grammar, or translation, answer it thoroughly with comparative examples.\n" +
      "Maintain a friendly, cheering, Lesotho-rooted persona (e.g., you can use greetings like 'Khotso' or address them using polite particles!).";

    // Generate Response
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: genAiContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || "Ha ke kopa thuso. I was unable to generate a response.";
    res.json({ text });

  } catch (error: any) {
    console.error("Gemini Chat API Error:", error);
    res.status(500).json({ 
      error: "An error occurred while contacting the language tutor brain.",
      details: error.message 
    });
  }
});

// Setup Vite Dev server or build static files Express server
async function configureServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback handling
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Sesotho Server] Listening on http://localhost:${PORT} under ${process.env.NODE_ENV || 'development'} mode`);
  });
}

configureServer().catch(err => {
  console.error("Failed to start server:", err);
});
