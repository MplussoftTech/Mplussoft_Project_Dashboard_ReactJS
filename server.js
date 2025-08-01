import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, "dist")));

// All other routes return index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(4000, () => console.log("Server running on port 4000"));
