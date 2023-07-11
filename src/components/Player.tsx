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
import { IconButton, Slider } from "@material-tailwind/react"
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
    if (filePath === "" || songName === "" || filePath === undefined || songName === undefined || filePath === null || songName === null) return
    console.log(filePath)
    ipcRenderer.send("music:play", filePath)

    if (isPlaying) {
      // console.log(audio,'pause')
      if(audio != null){
        audio.pause()
        audio.currentTime=0
        setIsPlaying(false)

      }
    } else {
      audio.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      <div className='fixed h-[80px] bottom-0 right-0 player backdrop-blur rounded-t border anime w-full px-4 py-2 flex flex-row justify-between gap-4'>
        <div className='flex flex-row gap-3'>
          <img
            src={defaultMusicIcon}
            alt=''
            className='w-[60px] h-[60px] aspect-square rounded'
          />
          <div className=' max-w-[200px] flex flex-col justify-center'>
            <h3 className='font-bold text-[1rem] text-ellipsis text-white h-6 whitespace-nowrap overflow-hidden '>{songName}</h3>
            <p className='text-[.7rem] text-[#c4c4c4]'>JAKE</p>
          </div>
        </div>
        <div className='flex flex-col items-center'>
          <div className='flex gap-2'>
            <IconButton
              variant='text'
              className='rounded-full bg-transparent text-white active:text-[#2ec946] hover:bg-transparent active:bg-transparent '>
              <FaShuffle className='text-xl' />
            </IconButton>
            <IconButton
              variant='text'
              className='rounded-full bg-transparent text-white active:text-[#2ec946] hover:bg-transparent active:bg-transparent '>
              <MdSkipPrevious className='text-3xl' />
            </IconButton>
            <IconButton
              onClick={playMusic}
              variant='text'
              className=' bg-transparent hover:bg-transparent active:bg-transparent bg-white p-3 aspect-square rounded-full flex justify-center items-center text-black active:text-[#2ec946]'>
              {!isPlaying ? (
                <BsFillPlayFill className='text-3xl ' />
              ) : (
                <FaPause className='text-2xl ' />
              )}
            </IconButton>
            <IconButton
              variant='text'
              className='rounded-full bg-transparent text-white active:text-[#2ec946] hover:bg-transparent active:bg-transparent '>
              <MdSkipNext className='text-3xl' />
            </IconButton>
            <IconButton
              variant='text'
              className='rounded-full bg-transparent text-white active:text-[#2ec946] hover:bg-transparent active:bg-transparent '>
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
        <div className='flex items-center gap-1 '>
          <IconButton variant='text' className='rounded-full bg-transparent text-white active:text-[#2ec946] hover:bg-transparent active:bg-transparent '>
            {<HiOutlineSpeakerWave className='text-2xl' />}
          </IconButton>
          <div className="">
            <Slider 
            className="min-w-[100px]  text-white  hover:text-[#2ec946] h-2 "
            barClassName=" hover:bg-[#2ec946] "
            thumbClassName="[&::-moz-range-thumb]: [&::-webkit-slider-thumb]:"
            trackClassName=""
            defaultValue={40}  />
          </div>
        </div>
      </div>
    </>
  )
}
