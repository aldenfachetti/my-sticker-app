import { Request, Response } from "express";
import { processFile } from "../services/fileService";
import multer from "multer";

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/gif" ||
      file.mimetype === "video/avi" ||
      file.mimetype === "video/muf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Formato de arquivo inválido"), false);
    }
  },
});

export const handleUpload = [
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({ error: "Nenhum arquivo foi enviado" });
      }

      const result = await processFile(file);
      res.status(200).json({ success: true, file: result });
    } catch (error) {
      res.status(500).json({ error: "Erro ao processar o arquivo" });
    }
  },
];
