import ffmpeg from "fluent-ffmpeg";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { unlink } from "fs/promises";

interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

export const processFile = async (file: MulterFile): Promise<string> => {
  if (!file.path) {
    throw new Error("Invalid input file path");
  }

  const inputPath = file.path;
  const outputFilename = `${uuidv4()}.webp`;
  const outputPath = path.join(
    __dirname,
    "../public/converted",
    outputFilename
  );

  try {
    console.log("Processing file:", inputPath);
    console.log("Output path:", outputPath);

    if (file.mimetype === "image/gif") {
      const isAnimated = await checkIfGifIsAnimated(inputPath);

      if (isAnimated) {
        console.log("GIF is animated. Proceeding with FFmpeg conversion...");
        await convertGifToWebpAnimated(inputPath, outputPath);
      } else {
        console.log("GIF is static. Proceeding with FFmpeg conversion...");
        await convertGifToWebpStatic(inputPath, outputPath);
      }

      console.log("GIF conversion successful");
    } else if (
      ["video/avi", "video/muf", "video/mp4"].includes(file.mimetype)
    ) {
      console.log("File is a video. Proceeding with FFmpeg conversion...");
      await convertVideoToWebp(inputPath, outputPath);
    } else {
      throw new Error("Unsupported file type");
    }

    await unlink(inputPath);

    return outputFilename;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error processing the file:", error.message);
    } else {
      console.error("Unknown error occurred during file processing.");
    }
    throw new Error("Error converting the file");
  }
};

// Função para verificar se um GIF é animado
const checkIfGifIsAnimated = (inputPath: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .inputOptions("-vframes 2")
      .outputOptions("-f null")
      .on("start", () => {
        console.log("Checking if GIF is animated...");
      })
      .on("end", () => {
        console.log("GIF is animated.");
        resolve(true);
      })
      .on("error", (err) => {
        if (
          err.message.includes("Output file #0 does not contain any stream")
        ) {
          console.log("GIF is not animated.");
          resolve(false); // Não é animado (apenas um frame)
        } else {
          console.error("Error checking if GIF is animated:", err.message);
          reject(
            new Error(`Failed to check if GIF is animated: ${err.message}`)
          );
        }
      })
      .run();
  });
};

// Função para converter GIF animado para WebP usando FFmpeg
const convertGifToWebpAnimated = (
  inputPath: string,
  outputPath: string
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .outputOptions([
        "-vcodec libwebp",
        "-loop 0", // Mantém o loop da animação
        "-lossless 0",
        "-qscale 80", // Ajusta a qualidade para balancear tamanho e performance
        "-preset default",
        "-an",
        "-vsync 0",
        "-vf scale=320:-1,fps=15", // Example for mobile
        "-vf scale=640:-1,fps=15", // Mantém a escala e FPS ajustando a largura para 640px
        "-pix_fmt yuv420p", // Garante compatibilidade com WebP
        "-compression_level 6", // Reduz o tamanho do arquivo
      ])
      .on("start", (commandLine) => {
        console.log("FFmpeg command (GIF to animated WebP):", commandLine);
      })
      .on("end", () => {
        console.log("GIF to WebP conversion successful");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error during GIF to WebP conversion:", err.message);
        reject(new Error(`FFmpeg failed with error: ${err.message}`));
      })
      .run();
  });
};

// Função para converter vídeos para WebP usando FFmpeg
const convertVideoToWebp = (
  inputPath: string,
  outputPath: string
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .outputOptions([
        "-vcodec libwebp",
        "-loop 0", // Mantém o loop da animação
        "-lossless 0",
        "-qscale 80", // Ajusta a qualidade para balancear tamanho e performance
        "-preset default",
        "-an",
        "-vsync 0",
        "-vf scale=640:-1,fps=15",
        "-vf scale=640:-1", // Mantém a escala ajustando a largura para 640px
        "-pix_fmt yuv420p", // Garante compatibilidade com WebP
        "-compression_level 6", // Reduz o tamanho do arquivo
      ])
      .on("start", (commandLine) => {
        console.log("FFmpeg command (Video to WebP):", commandLine);
      })
      .on("end", () => {
        console.log("Video to WebP conversion successful");
        resolve();
      })
      .on("error", (err) => {
        console.error("Error during video to WebP conversion:", err.message);
        reject(new Error(`FFmpeg failed with error: ${err.message}`));
      })
      .run();
  });
};

// Função para converter GIF estático para WebP usando FFmpeg
const convertGifToWebpStatic = (
  inputPath: string,
  outputPath: string
): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .outputOptions([
        "-vcodec libwebp",
        "-lossless 0",
        "-compression_level 6", // Ajuste para reduzir o tamanho do arquivo
        "-qscale 50", // Aumentar compressão mantendo qualidade aceitável
        "-preset default",
        "-an",
        "-vsync 0",
        "-vf scale=320:-1,fps=15",
        "-vf scale=512:512",
      ])
      .on("start", (commandLine) => {
        console.log("FFmpeg command (GIF to static WebP):", commandLine);
      })
      .on("end", () => {
        console.log("Static GIF to WebP conversion successful");
        resolve();
      })
      .on("error", (err) => {
        console.error(
          "Error during static GIF to WebP conversion:",
          err.message
        );
        reject(new Error(`FFmpeg failed with error: ${err.message}`));
      })
      .run();
  });
};
