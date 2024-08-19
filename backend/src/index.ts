import express from "express";
import uploadRoutes from "./routes/upload";

const app = express();

app.use(express.json());
app.use("/api", uploadRoutes);

// Root route for basic status check
app.get("/", (req, res) => {
  res.send('Backend API is running. Use "/api/upload" to upload files.');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
