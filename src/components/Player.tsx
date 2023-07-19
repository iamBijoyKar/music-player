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
import { useState, useEffect, useMemo } from "react"
import { useAppDispatch, useAppSelector } from "../hooks/hooks"
import { currentlyPlayingSongActions } from "../store/currentlyPlayingSong"

export default function Player() {
  const [musicProgress, setMusicProgress] = useState(0)

  const currentlyPlayingSong = useAppSelector(
    (state) => state.currentlyPlayingSong.song
  )
  const playingSongObject = useAppSelector(
    (state) => state.currentlyPlayingSong.songAudioObject
  )
  const isPlaying = useAppSelector(
    (state) => state.currentlyPlayingSong.playingStatus
  )
  const musicVolume = useAppSelector(
    (state) => state.currentlyPlayingSong.volume
  )

  const { songName } = currentlyPlayingSong
  const { filePath } = currentlyPlayingSong.file

  const dispatch = useAppDispatch()

  const setIsPlaying = (status: boolean) => {
    dispatch(
      currentlyPlayingSongActions.changeCurrentlyPlayingSongPlayingStatus(
        status
      )
    )
  }

  const setMusicVolume = (volume: number) => {
    dispatch(
      currentlyPlayingSongActions.changeCurrentlyPlayingSongVolume(volume / 100)
    )
    playingSongObject.volume = volume
  }

  playingSongObject.volume = musicVolume // set initial volume it is alrady divided by 100

  playingSongObject.ontimeupdate = () => {
    setMusicProgress(playingSongObject.currentTime)
  }

  const musicEndTime = playingSongObject.duration

  const totalTime = useMemo(() => intoMinutes(musicEndTime), [musicEndTime])
  const currentTime = useMemo(() => intoMinutes(musicProgress), [musicProgress])

  // set play status to pause when song ends
  useEffect(() => {
    if (isPlaying) {
      musicProgress === musicEndTime ? setIsPlaying(false) : setIsPlaying(true)
    }
  }, [musicProgress])

  // play and pause toggle function
  const togglePlay = () => {
    if (
      filePath === "" ||
      songName === "" ||
      filePath === undefined ||
      songName === undefined ||
      filePath === null ||
      songName === null
    )
      return
    ipcRenderer.send("music:play", filePath)

    if (isPlaying) {
      if (playingSongObject != null) {
        playingSongObject.pause()
        // playingSongObject.currentTime=0 // for starting from beginning
        setIsPlaying(false)
      }
    } else {
      playingSongObject.play()
      setIsPlaying(true)
    }
  }

  // start over function
  const startOver = () => {
    if (playingSongObject != null) {
      playingSongObject.currentTime = 0
      playingSongObject.play()
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
            <h3 className='font-bold text-[1rem] text-ellipsis text-white h-6 whitespace-nowrap overflow-hidden '>
              {songName}
            </h3>
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
              onClick={startOver}
              variant='text'
              className='rounded-full bg-transparent text-white active:text-[#2ec946] hover:bg-transparent active:bg-transparent '>
              <MdSkipPrevious className='text-3xl' />
            </IconButton>
            <IconButton
              onClick={togglePlay}
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
            <span className='text-white'>{currentTime}</span>
            <div className=' '>
              <Slider
                onInput={(e) =>
                  (playingSongObject.currentTime =
                    (e.target.value * musicEndTime) / 100)
                }
                className='w-[300px]  text-white  hover:text-[#2ec946] h-2 '
                barClassName=' hover:bg-[#2ec946] '
                thumbClassName='[&::-moz-range-thumb]: [&::-webkit-slider-thumb]:'
                trackClassName=''
                value={(musicProgress * 100) / musicEndTime}
              />
            </div>
            <span className='text-white'>
              {totalTime == "NaN:NaN" ? "--:--" : totalTime}
            </span>
          </div>
        </div>
        <div className='flex items-center gap-1 '>
          <IconButton
            variant='text'
            className='rounded-full bg-transparent text-white active:text-[#2ec946] hover:bg-transparent active:bg-transparent '>
            {<HiOutlineSpeakerWave className='text-2xl' />}
          </IconButton>
          <div className=''>
            <Slider
              onInput={(e) => setMusicVolume(e.target.value)}
              className='min-w-[100px]  text-white  hover:text-[#2ec946] h-2 '
              barClassName=' hover:bg-[#2ec946] '
              thumbClassName='[&::-moz-range-thumb]: [&::-webkit-slider-thumb]:'
              trackClassName=''
              value={musicVolume * 100}
            />
          </div>
        </div>
      </div>
    </>
  )
}
