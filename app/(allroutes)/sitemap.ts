import type { MetadataRoute } from 'next'
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
let ans =[]
for(let i=0; i<genres.length; i++){
ans.push( {
  url: `https://sushinime.site/genres/${encodeURI(genres[i].name)}`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.5,
})
}
console.log(ans)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sushinime.site/',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://sushinime.site/trending',
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    },
    {
      url: 'https://sushinime.site/recently-updated',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.5,
    },
    {
      url: 'https://sushinime.site/genres',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
...ans
  ]
}