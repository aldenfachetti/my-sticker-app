import express from "express";
import uploadRoutes from "./routes/upload";

const app = express();

app.use(express.json());
app.use("/api", uploadRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
