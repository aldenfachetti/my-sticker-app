import { Router } from "express";
import { handleUpload } from "../controllers/uploadController";

const router = Router();

router.post("/upload", handleUpload);

export default router;
