# Backend API for File Upload and Conversion

This backend API is designed to handle file uploads, specifically GIF and video files, and convert them to WebP format, which is suitable for creating animated stickers for platforms like WhatsApp. The backend is built using Node.js, Express.js, and TypeScript.

## Features

- **File Upload**: Supports uploading of GIF and specific video formats (AVI, MUF).
- **File Conversion**: Converts uploaded files to WebP format.
- **Error Handling**: Validates file types and handles errors gracefully.
- **Modular Architecture**: Organized with controllers, services, and routes for maintainability.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **TypeScript**: Superset of JavaScript with static typing.
- **Multer**: Middleware for handling file uploads.
- **Sharp**: Library for image processing.
- **Fluent-ffmpeg**: Library for video processing using FFmpeg.
- **UUID**: For generating unique file names.

## Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your system.

- **Node.js**: Version 12.x or higher.
- **npm**: Version 6.x or higher.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/backend.git
   cd backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file if necessary (not covered in this example).

### Running the Server

To start the server in development mode with hot-reloading:

```bash
npm run dev
```
