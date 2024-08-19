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
      <body>{children}</body>
    </html>
  );
}
