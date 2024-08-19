import { Request, Response } from "express";
import { processFile } from "../services/fileService";
import multer from "multer";

// Configuring the upload middleware with Multer
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
  fileFilter: (request, uploadedFile, callback) => {
    const allowedMimeTypes = ["image/gif", "video/avi", "video/muf"];

    if (allowedMimeTypes.includes(uploadedFile.mimetype)) {
      // Valid file
      callback(null, true);
    } else {
      // Invalid file
      callback(null, false);
    }
  },
});

// Controller to handle file uploads
export const handleUpload = [
  upload.single("file"),
  async (request: Request, response: Response) => {
    try {
      const file = request.file;
      if (!file) {
        return response
          .status(400)
          .json({ error: "No file uploaded or invalid file format" });
      }

      const result = await processFile(file);
      response.status(200).json({ success: true, file: result });
    } catch (error) {
      response.status(500).json({ error: "Error processing the file" });
    }
  },
];
