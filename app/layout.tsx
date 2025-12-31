import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FieldMap - Farm Field Mapper & Crop Rotation Planner",
  description: "Visualize your farm, plan smarter rotations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
