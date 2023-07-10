import defaultMusicIcon from "../assets/music.png"
import { FaShuffle } from "react-icons/fa6"
import { MdSkipPrevious } from "react-icons/md"
import { BsFillPlayFill } from "react-icons/bs"
import { MdSkipNext } from "react-icons/md"
import { PiRepeatBold } from "react-icons/pi"
import { PiRepeatOnceBold } from "react-icons/pi"
import { HiOutlineSpeakerWave } from "react-icons/hi2"
import { HiOutlineSpeakerXMark } from "react-icons/hi2"
import { FaPause } from "react-icons/fa"
import { IconButton } from "@material-tailwind/react"
import { intoMinutes } from "../ts/utils"
import { useState } from "react"
// import {Howl} from 'howler'

type prop = {
  song: {
    songName: string
    filePath: string
    baseName: string
  }
}

export default function Player({ song }: prop) {
  const { songName, filePath } = song
  const [isPlaying, setIsPlaying] = useState(false)
  const totalTime = intoMinutes(100)
  const currentTime = intoMinutes(50)
  const audio = new Audio(`my-magic-protocol://getMediaFile/${filePath}`)

  const playMusic = () => {
    if (filePath == "") return

    ipcRenderer.send("music:play", filePath)

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      <div className='fixed h-[80px] bottom-0 right-0 bg-[#808080] w-full px-4 py-2 flex flex-row justify-between'>
        <div className='flex flex-row gap-3'>
          <img
            src={defaultMusicIcon}
            alt=''
            className='w-[50px] aspect-square'
          />
          <div className=''>
            <h3 className='font-bold text-xl'>{songName}</h3>
            <p className=''>JAKE</p>
          </div>
        </div>
        <div className='flex flex-col  items-center'>
          <div className='flex gap-5'>
            <IconButton
              variant='text'
              className='rounded-full bg-transparent text-white hover:bg-transparent active:bg-transparent '>
              <FaShuffle className='text-xl' />
            </IconButton>
            <IconButton
              variant='text'
              className='rounded-full bg-transparent text-white hover:bg-transparent active:bg-transparent '>
              <MdSkipPrevious className='text-3xl' />
            </IconButton>
            <IconButton
              onClick={playMusic}
              variant='text'
              className=' bg-transparent text-white hover:bg-transparent active:bg-transparent bg-white p-3 aspect-square rounded-full flex justify-center items-center'>
              {!isPlaying ? (
                <BsFillPlayFill className='text-3xl text-black' />
              ) : (
                <FaPause className='text-2xl text-black' />
              )}
            </IconButton>
            <IconButton
              variant='text'
              className='rounded-full bg-transparent text-white hover:bg-transparent active:bg-transparent '>
              <MdSkipNext className='text-3xl' />
            </IconButton>
            <IconButton
              variant='text'
              className='rounded-full bg-transparent text-white hover:bg-transparent active:bg-transparent '>
              <PiRepeatBold className='text-2xl' />
            </IconButton>
          </div>
          <div className='flex gap-2 items-center'>
            <span className=''>{currentTime}</span>
            <div className='bg-[#fff] w-[280px] rounded h-[3px] '>
              <div className={`w-[20%] bg-black h-[3px]`}></div>
            </div>
            <span className=''>{totalTime}</span>
          </div>
        </div>
        <div className='flex items-center gap-3'>
          <HiOutlineSpeakerWave className='text-2xl' />
          <input type='range' />
        </div>
      </div>
    </>
  )
}
