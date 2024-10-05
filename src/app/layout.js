import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <header>
          <h1>Minimally Entertaining NonChildbearing Sport Advocates</h1>
        </header>
        <main>{children}</main>

        <footer>Created by Samuel Garmoe</footer>
      </body>
    </html>
  );
}
