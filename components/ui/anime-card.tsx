import { motion } from "framer-motion"

 const AnimeCard = ({ anime, onClick }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-w-[33.33%] max-w-[33.33%] md:min-w-[33.33%] md:max-w-[33.33%] lg:min-w-[16.66%] lg:max-w-[16.66%]">
  
  
    <div className="group">
      <div className="relative aspect-[2/3] rounded-md overflow-hidden hover:scale-110  cursor-pointer bg-slate-900 " onClick={onClick}>
        <img
          src={anime.image}
          alt=  { anime.title.english || anime.title.romaji}
          
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
         
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
          <h3 className="text-lg font-semibold"> { anime.title.english || anime.title.romaji}</h3>

       {anime.totalEpisodes || anime.episodes ?<p className="text-sm text-gray-300">Episodes: {anime.totalEpisodes || anime.episodes}</p>:''}   
        </div>
      
      </div>
      <div className="group-hover:opacity-0 opacity-100">
      <h3 className="text-lg font-semibold">{ anime.title.english || anime.title.romaji}</h3>
       
        </div>
        </div>
    </motion.div>
  )

  export default AnimeCard