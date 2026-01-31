import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import MobileNav from "@/components/layout/mobile-nav";
import ThemeSwitch from "@/components/ui/theme-switch";
import Footer from "@/components/layout/footer";
import ActiveSectionContextProvider from "@/context/active-section-context";
import ThemeContextProvider from "@/context/theme-context";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sakia Labs",
  description:
    "Sakia Labs | Empowering people and businesses with robust and elegant solutions. ✨🚀",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-16 lg:pt-28 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        {/* Top section blobs - Hero */}
        <div className="bg-[#fbe2e3] absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#6b4a4f]"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#4a4560]"></div>
        
        {/* Packages section blobs */}
        <div className="bg-[#e3f2fd] absolute top-[35rem] -z-10 right-[-20rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#2d3d52]"></div>
        <div className="bg-[#f3e5f5] absolute top-[55rem] -z-10 left-[-25rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#3d2f47]"></div>
        
        {/* About/Services section blobs */}
        <div className="bg-[#fce4ec] absolute top-[75rem] -z-10 right-[10rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#4a3540]"></div>
        <div className="bg-[#e8eaf6] absolute top-[95rem] -z-10 left-[-30rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#353d52]"></div>
        
        {/* Projects section blobs */}
        <div className="bg-[#e3f2fd] absolute top-[105rem] -z-10 right-[-20rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#2d3d52]"></div>
        <div className="bg-[#f3e5f5] absolute top-[115rem] -z-10 left-[-25rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#3d2f47]"></div>
        
        {/* Reviews section blobs */}
        <div className="bg-[#fce4ec] absolute top-[125rem] -z-10 right-[10rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#4a3540]"></div>
        <div className="bg-[#e8eaf6] absolute top-[135rem] -z-10 left-[-30rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#353d52]"></div>
        
        {/* Contact section blobs */}
        <div className="bg-[#fbe2e3] absolute top-[145rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[10rem] sm:w-[68.75rem] dark:bg-[#6b4a4f]"></div>
        <div className="bg-[#dbd7fb] absolute top-[155rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#4a4560]"></div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeContextProvider>
            <ActiveSectionContextProvider>
              {/* Skip to content link for keyboard navigation */}
              <a href="#main-content" className="skip-to-content">
                Skip to main content
              </a>
              <Header />
              <MobileNav />
              {children}
              <Footer />

              <Toaster position="top-right" />
              <ThemeSwitch />
            </ActiveSectionContextProvider>
          </ThemeContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
