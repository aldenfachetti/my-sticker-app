import multer from "multer";
import path from "path";

// Configuração de armazenamento para salvar os arquivos em um diretório específico
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Diretório onde os arquivos serão salvos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Mantém a extensão original do arquivo
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({ storage });

export default upload;
