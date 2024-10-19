export const metadata = {
  title: "Sushinime",
  description: "Watch Anime for free",
  openGraph: {
    title: "Sushinime",
    description: "Watch Anime for free",
    siteName: 'Sushinime',
    images: [
      {
        url: '/icon.png', 
        width: 50,
        height: 50,
        alt: 'Logo Alt Text',
      },
    ],
    type: 'website',

  }
};



import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <head><link rel="icon" href="/favicon.ico" sizes="any" />   <Analytics/></head>
      <body>
      <div className="min-h-screen bg-black text-white">
        {children}
        </div></body>
    </html>
  )
}
