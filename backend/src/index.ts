import express from "express";
import cors from "cors";
import path from "path";
import { exec } from "child_process";
import fs from "fs";
import multer from "multer";
import sharp from "sharp"; // Importa o sharp para manipulação de imagem
import uploadRoutes from "./routes/upload";

const app = express();

// Configurando CORS para permitir requisições do frontend (ajuste conforme necessário)
app.use(
  cors({
    origin: "http://localhost:3000", // Permitindo requisições da origem do frontend
  })
);

app.use(express.json());

// Middleware de upload usando multer
const upload = multer({ dest: "uploads/" });

// Serve arquivos estáticos da pasta "converted"
app.use("/converted", express.static(path.join(__dirname, "public/converted")));

// Rota para upload e conversão de arquivos
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  // Verifica se o arquivo é .gif, .mp4 ou .avi
  const fileType = path.extname(file.originalname).toLowerCase();
  if (![".gif", ".mp4", ".avi"].includes(fileType)) {
    return res
      .status(400)
      .send("Invalid file type. Only .gif, .mp4, and .avi are supported.");
  }

  const outputPath = path.join(
    __dirname,
    "public/converted",
    `${Date.now()}.webp`
  );

  // Comando FFmpeg para converter para .webp
  const ffmpegCommand = `ffmpeg -i ${file.path} -vf "fps=15,scale=512:-1:flags=lanczos" -c:v libwebp -lossless 0 -quality 80 -compression_level 6 -loop 0 -preset default ${outputPath}`;

  exec(ffmpegCommand, (error, stdout, stderr) => {
    fs.unlinkSync(file.path); // Remove o arquivo original carregado

    if (error) {
      console.error("Error during conversion:", stderr);
      return res.status(500).send("Error processing file.");
    }

    // Use o sharp para obter as dimensões da imagem convertida
    sharp(outputPath)
      .metadata()
      .then(({ width, height }) => {
        res.json({
          url: `/converted/${path.basename(outputPath)}`,
          width,
          height,
        });
      })
      .catch((err) => {
        console.error("Error reading image metadata:", err);
        res.status(500).send("Error processing image metadata.");
      });
  });
});

// API routes for file upload (mantendo a rota original se necessário)
app.use("/api", uploadRoutes);

// Rota raiz para verificação básica de status
app.get("/", (req, res) => {
  res.send('Backend API is running. Use "/api/upload" to upload files.');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
