"use client";

import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";

interface ConvertResponse {
  url: string;
  width: number;
  height: number;
}

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [convertedImage, setConvertedImage] = useState<ConvertResponse | null>(
    null
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post<ConvertResponse>(
        "http://localhost:3001/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error("File upload failed");
      }

      setConvertedImage(response.data);
      setMessage("File converted successfully. You can download it below.");
    } catch (error: any) {
      setMessage("Error uploading file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md w-full">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          accept=".gif,.avi,.mp4"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
          title="Upload file"
          aria-label="File upload"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition w-full"
          disabled={loading}
        >
          {loading ? "Converting..." : "Upload"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-gray-700 dark:text-gray-200">{message}</p>
      )}
      {convertedImage && (
        <div className="mt-4 text-center">
          <p className="text-gray-700 dark:text-gray-200">
            Conversion Complete:
          </p>
          {/* Usa o componente Image do Next.js com width e height */}
          <Image
            src={convertedImage.url}
            alt="Converted"
            width={convertedImage.width}
            height={convertedImage.height}
            className="mt-2 max-w-full"
          />
          <a href={convertedImage.url} download className="block mt-2">
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg">
              Download WebP
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
