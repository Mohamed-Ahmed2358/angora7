
import type { Metadata } from "next";
import {Exo} from "next/font/google";
import { Toaster } from "@/components/ui/toast"

import "./globals.css";
import Navbar from "./_component/Navbar/Navbar";
import Footer from "./_component/Footer/Footer";
import FirstNav from "./_component/FirstNav/FirstNav";
import { Weight } from "lucide-react";
import MyProvider from "./_component/MyProvider/MyProvider";
import Providers from "./_component/TanstackProvider/TanstackProvider";

const Exofont = Exo({
  variable: "--font-Exo",
  subsets:['latin']
  
});



export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart - Your one-stop shop for quality products at competitive prices.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={` ${Exofont.className} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Providers>
        <MyProvider>
          <FirstNav/>
<Navbar/>        
     <main className="flex-1 container mx-auto xl:max-w-7xl">
         {children}
         <Toaster/>
     </main>

        <Footer/>

        </MyProvider>
</Providers>
        
        
        </body>
    </html>
  );
}


// layout => client 
// client , children import  , props