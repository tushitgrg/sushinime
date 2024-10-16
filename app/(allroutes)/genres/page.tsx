"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, ChevronDown } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const genres = [
  { name: "Action",   image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx16498-73IhOXpJZiMF.jpg" },
  { name: "Romance", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21519-fPhvy69vnQqS.png" },
  { name: "Comedy",  image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20755-q0b3Ok1cAbPd.jpg" },
  { name: "Sci-Fi", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9253-7pdcVzQSkKxT.jpg" },
  { name: "Fantasy", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg" },
  { name: "Drama", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx5114-Dilr312jctdJ.jpg" },
  { name: "Mystery", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx1535-4r88a1tsBEIz.jpg" },
  { name: "Thriller", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101759-G9I2ymYrFS8o.jpg" },
  { name: "Horror", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx11111-Y4QgkX8gJQCa.png" },
  { name: "Slice of Life", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20954-UMb6Kl7ZL8Ke.jpg" },
  { name: "Mecha", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx99423-8MBxtwCeHf8B.png" },
  { name: "Mahou Shoujo", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx9756-qnR83EYPzY1Z.jpg" },
  { name: "Sports", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx20464-7fLWc7VvWeVB.png" },
  { name: "Psychological", image: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx21234-bCvWk2f58LCv.jpg" },
]

export default function GenresPage() {
  return (
    <div className="min-h-screen bg-black text-white">
     

      <main className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-4xl font-bold mb-8">Watch your type of Animes</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {genres.map((genre, index) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/genres/${genre.name}`} className="block group">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <img
                    src={genre.image}
                    alt={genre.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" className="bg-red-600 text-white hover:bg-red-700">
                      Explore
                    </Button>
                  </div>
                </div>
                <h2 className="mt-2 text-lg font-semibold text-center">{genre.name}</h2>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

    
    </div>
  )
}