/*"use client": Esta diretiva no topo do arquivo indica ao Next.js
que o componente deve ser tratado como um Client Component, permitindo
o uso de hooks como useState, useEffect, etc. Sem esta diretiva,
o Next.js assume que o componente é um Server Component por padrão.*/
"use client"; // Adiciona essa linha no topo para definir o componente como Client Component

import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import Image from "next/image";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setConvertedImage(data.url);
      } else {
        setError("Failed to convert the file.");
      }
    } catch (error: any) {
      setError("Error converting file: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <label htmlFor="fileInput">Choose a file:</label>
      <input
        id="fileInput"
        type="file"
        accept=".gif,.mp4,.avi"
        onChange={handleFileChange}
      />
      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
      >
        {loading ? "Converting..." : "Convert to WebP"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {convertedImage && (
        <div className="mt-4">
          <p>Conversion Complete:</p>
          <Image src={convertedImage} alt="Converted" className="mt-2" />
          <a href={convertedImage} download>
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
