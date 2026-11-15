import "./globals.css";
import localFont from "next/font/local";
import ScrollProgress from "@/components/ScrollProgress";
import Preloader from "@/components/Preloader";

const geist = localFont({
  src: "./fonts/Geist-Regular.woff2",
  variable: "--font-geist",
});
const geistMono = localFont({
  src: "./fonts/GeistMono-Regular.woff2",
  variable: "--font-geist-mono",
});

export const metadata = {
  metadataBase: new URL("https://fortuna-ph.netlify.app"),
  title: "FORTUNA_PH — автомобильный фотограф в Москве",
  description: "Личная съёмка автомобиля: фото и видео. Москва, в пределах МКАД.",
  openGraph: {
    title: "FORTUNA_PH",
    description: "Снимаю то, за что ты любишь свою машину.",
    images: ["/carph1.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-bg text-ink">
        <Preloader />
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}

