export const metadata = {
  title: "Sushinime",
  description: "Watch Anime for free",

}



import "@/app/globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  return (
    <html lang="en">
      <head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
      <body>
      <div className="min-h-screen bg-black text-white">
        {children}
        </div></body>
    </html>
  )
}
