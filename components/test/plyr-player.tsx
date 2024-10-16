import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import Plyr, { Options } from 'plyr'
import 'plyr/dist/plyr.css'
import { div } from 'framer-motion/dist/client'

type IProps = {

	hlsSource?: string
	poster?: string
	autoPlay?: boolean
}

const plyrOptions: Plyr.Options = { ratio: '16:9', autopause: true , clickToPlay:true, disableContextMenu:true, autoplay:true}

const PlrVideoPlayer = ({


	hlsSource,
	poster ,
	autoPlay = true
}: IProps) => {
	const video = useRef<HTMLMediaElement | null>(null)
	const [supported] = useState(Hls.isSupported())
	const hls = useRef<Hls | null>(null)
	const player = useRef<Plyr | null>(null)

	useEffect(() => {
		console.log('initialized')
        
		

		if (poster) {
			//@ts-ignore
			video.current.poster = poster
		}

		if (!supported || !hlsSource) {
			video.current.src = hlsSource
			player.current = new Plyr(video.current, plyrOptions)

			if (autoPlay) {
				player.current.play()
			}

			return () => {
				player.current?.destroy(() => console.log('player destroyed'))
			}
		}

		hls.current = new Hls({ maxMaxBufferLength: 10, autoStartLoad: false })
		hls.current.loadSource(hlsSource)
		hls.current.attachMedia(video.current! as HTMLMediaElement)

		hls.current.on(Hls.Events.MANIFEST_PARSED, () => {
			console.log('Mainfest parsed')

			const levels = hls?.current?.levels!
			const quality: Options['quality'] = {
				default: levels[levels.length - 1].height,
				options: levels.map((level) => level.height),
				forced: true,
				onChange: (newQuality: number) => {
					console.log('changes', newQuality)
					levels.forEach((level, levelIndex) => {
						if (level.height === newQuality) {
							hls.current!.currentLevel = levelIndex
						}
					})
				}
			}

			player.current = new Plyr(video.current!, {
				...plyrOptions,
				quality
			})

			player?.current?.on('play', () => {
				console.log('playing')
				hls?.current?.startLoad()
			})
            player?.current?.on('play', () => {
				console.log('playing')
				hls?.current?.startLoad()
			})

			


			if (autoPlay) {
				try{
					player.current.play()
				}catch(e){
					console.log(e)
				}
			
			}
         
		})

		return () => {
			console.log('destroyed')
			hls.current?.destroy()
			player.current?.destroy()
		}
	}, [])

	return (
	<div></div>
			// <video ref={video} className='w-full h-full' />
	
	)
}

export default PlrVideoPlayer