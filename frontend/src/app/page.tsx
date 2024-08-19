import React from "react";
import UploadForm from "../components/UploadForm";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          GIF/Video to WebP Converter
        </h1>
        <UploadForm />
      </div>
    </div>
  );
};

export default HomePage;
