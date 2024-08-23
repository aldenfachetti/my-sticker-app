import ThemeToggle from "../components/ThemeToggle"; // Importando o ThemeToggle

import "../app/globals.css";

export const metadata = {
  title: "GIF/Video to WebP Converter",
  description: "Upload and convert your GIF or video files to WebP format.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 antialiased flex flex-col items-center justify-center">
        {/* Inclui o toggle de tema no Header */}
        <header className="w-full p-4 flex justify-end">
          <ThemeToggle /> {/* Componente para alternar o tema */}
        </header>
        <main className="flex-grow w-full flex items-center justify-center">
          {/* Aplica classes do Tailwind para o modo escuro */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md max-w-md w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
