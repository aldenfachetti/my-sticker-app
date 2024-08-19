import { Request, Response } from "express";
import { processFile } from "../services/fileService";
import multer from "multer";
import path from "path";
import fs from "fs";

// Garantir que o diretório de uploads existe
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuração do middleware de upload com Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Diretório de destino dos arquivos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`); // Nome do arquivo salvo
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de tamanho de arquivo: 5 MB
  fileFilter: (request, uploadedFile, callback) => {
    const allowedMimeTypes = [
      "image/gif",
      "video/avi",
      "video/muf",
      "video/mp4",
    ];

    if (allowedMimeTypes.includes(uploadedFile.mimetype)) {
      // Arquivo válido
      callback(null, true);
    } else {
      // Arquivo inválido
      const error = new Error("Invalid file type");
      callback(error as any, false);
    }
  },
});

// Controlador para lidar com uploads de arquivos
export const handleUpload = [
  upload.single("file"), // Middleware do multer que faz o upload do arquivo
  async (request: Request, response: Response) => {
    try {
      const file = request.file;

      if (!file) {
        return response
          .status(400)
          .json({ error: "No file uploaded or invalid file format" });
      }

      console.log("Uploaded file path:", file.path); // Log para depurar o caminho do arquivo

      const result = await processFile(file); // Chama a função de processamento
      response.status(200).json({ success: true, file: result });
    } catch (error) {
      console.error("Error processing the file:", error);
      response.status(500).json({ error: "Error processing the file" });
    }
  },
];
