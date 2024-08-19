import express from "express";
import cors from "cors";
import path from "path";
import uploadRoutes from "./routes/upload";

const app = express();

// Configurando CORS para permitir requisições do frontend (ajuste conforme necessário)
app.use(
  cors({
    origin: "http://localhost:3000", // Permitindo requisições da origem do frontend
  })
);

app.use(express.json());

// Serve static files from the "converted" directory
app.use("/converted", express.static(path.join(__dirname, "public/converted")));

// API routes for file upload
app.use("/api", uploadRoutes);

// Root route for basic status check
app.get("/", (req, res) => {
  res.send('Backend API is running. Use "/api/upload" to upload files.');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
