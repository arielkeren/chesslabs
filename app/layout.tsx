import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Chess",
  description: "Analyze chess games",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout: React.FC<Props> = ({ children }) => (
  <html lang="en">
    <body className={`bg-gray-950 ${poppins.className}`}>{children}</body>
  </html>
);

export default RootLayout;
