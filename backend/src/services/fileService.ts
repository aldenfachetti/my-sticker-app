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
  const inputPath = file.path;
  const outputFilename = `${uuidv4()}.webp`;
  const outputPath = path.join("/tmp", outputFilename);

  try {
    if (file.mimetype === "image/gif") {
      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
    } else {
      await new Promise<void>((resolve, reject) => {
        ffmpeg(inputPath)
          .outputOptions(["-vcodec libwebp", "-vf scale=512:512", "-loop 0"])
          .toFormat("webp")
          .save(outputPath)
          .on("end", () => resolve())
          .on("error", (err) => reject(err));
      });
    }

    await unlink(inputPath);

    return outputFilename;
  } catch (error) {
    throw new Error("Erro ao converter o arquivo");
  }
};
