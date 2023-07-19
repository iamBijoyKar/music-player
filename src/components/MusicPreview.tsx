import defaultSongImg from "../assets/song-img.png"
import { intoMinutes } from "../ts/utils"
import { Checkbox, Tooltip, Button, IconButton } from "@material-tailwind/react"
import { BsFillPlayFill } from "react-icons/bs"
import { Song } from "../store/stateTypes"

type Prop = {
  song: Song
}

export default function MusicPreview({ song }: Prop) {
  const { songName, songDuration, songAlbum, songArtist, songImage } = song
  return (
    <>
      <div className='flex flex-row justify-between items-center w-full px-4 py-2 rounded hover:border hover:bg-[#ffffff56] '>
        <div className='flex flex-row gap-2 items-center '>
          <div className=''>
            <IconButton
              variant='text'
              className='rounded-full bg-transparent text-white active:text-[#2ec946] hover:bg-transparent active:bg-transparent  '>
              <BsFillPlayFill className='text-white text-2xl' />
            </IconButton>
          </div>
          <img
            src={songImage ? songImage : defaultSongImg}
            alt=''
            className='w-10 h-10 rounded-full'
          />
          <div className='flex flex-col justify-center'>
            <h3 className='font-bold text-white text-ellipsis h-6 whitespace-nowrap overflow-hidden w-[200px] lg:w-[300px] xl:w-[350px] '>
              {songName}
            </h3>
            <p className='text-[.8rem] text-[#c4c4c4]'>
              {songArtist &&
                songArtist.map((artist, index) => (
                  <span className='mr-1' key={index}>
                    {artist}
                    {index < songArtist.length - 1 ? "," : ""}
                  </span>
                ))}
            </p>
          </div>
        </div>
        <div className=''>
          <p className='text-[.9rem] text-[#c4c4c4]'>{songAlbum}</p>
        </div>
        <div className=''>
          <Tooltip placement='top' content={"Add to favourite"}>
            <Checkbox className='rounded-full' color='green' />
          </Tooltip>
        </div>
        <div className=''>
          <p className='text-[.9rem] text-[#c4c4c4]'>{intoMinutes(100)}</p>
        </div>
      </div>
    </>
  )
}
