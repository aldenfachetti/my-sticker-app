"use client"; // To ensure that the component is treated as a Client Component.

import React, { useState } from "react";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("File upload failed");
      }

      const data = await response.json();
      setMessage(`File uploaded successfully: ${data.file}`);
    } catch (error) {
      setMessage("Error uploading file. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md"
    >
      <input
        type="file"
        accept=".gif,.avi,.muf,.mp4" // Inclui .mp4 no accept
        onChange={handleFileChange}
        className="mb-4 p-2 border rounded-lg"
        title="Upload file"
        aria-label="File upload"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Upload
      </button>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </form>
  );
};

export default UploadForm;
