import MusicPreview from "./MusicPreview"
import { useAppSelector, useAppDispatch } from "../hooks/hooks"
import { Song } from "../store/stateTypes"
import { currentlyPlayingSongActions } from "../store/currentlyPlayingSong"

export default function Home() {
  const songs = useAppSelector((state) => state.songList.songs)
  console.log(songs, "in home")
  const dispatch = useAppDispatch()

  const changeSong = (song: Song) => {
    // dispatch(currentlyPlayingSongActions.changeCurrentlyPlayingSong(song))
  }

  return (
    <>
      <div className=''>
        <div className='flex flex-row justify-between items-center px-4 py-2 mt-6'>
          <h3 className='text-white text-xl font-bold ml-4'>#</h3>
          <h3 className='text-white text-xl font-bold ml-[-10rem]'>
            Song Title
          </h3>
          <h3 className='text-white text-xl font-bold'>Album</h3>
          <h3 className='text-white text-xl font-bold '>Length</h3>
        </div>
        <div className=''>
          {songs &&
            songs.map((song: Song) => (
              <div
                key={song.songName}
                onDoubleClick={() => changeSong(song)}
                className='w-full'>
                <MusicPreview song={song} />
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
