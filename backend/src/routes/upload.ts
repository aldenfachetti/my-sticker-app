import { Router } from "express";
import { handleUpload } from "../controllers/uploadController";

const router = Router();

// Define the POST route for file uploads
// This route will trigger the handleUpload controller function
router.post("/upload", handleUpload);

export default router;
