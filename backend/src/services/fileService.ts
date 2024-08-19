import sharp from "sharp";
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
  ); // Usando o caminho no diretório do projeto

  try {
    console.log("Processing file:", inputPath);
    console.log("Output path:", outputPath);

    if (file.mimetype === "image/gif") {
      // Convert GIF to animated WebP
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
      console.log("GIF conversion successful");
    } else if (
      ["video/avi", "video/muf", "video/mp4"].includes(file.mimetype)
    ) {
      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
          .outputOptions(["-vcodec libwebp", "-vf scale=512:512", "-loop 0"])
          .toFormat("webp")
          .on("start", (commandLine) => {
            console.log("FFmpeg command:", commandLine);
          })
          .on("end", () => {
            console.log("Video conversion successful");
            resolve();
          })
          .on("error", (err) => {
            console.error("FFmpeg Error:", (err as Error).message);
            reject(err);
          })
          .save(outputPath);
      });
    } else {
      throw new Error("Unsupported file type");
    }

    await unlink(inputPath);

    return outputFilename;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error processing file:", error.message);
    } else {
      console.error("Unknown error occurred");
    }
    throw new Error("Error converting the file");
  }
};
