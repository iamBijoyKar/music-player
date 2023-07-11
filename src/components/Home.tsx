
import MusicPreview from "./MusicPreview"

type song = {
  songName: string
  filePath: string
  baseName: string
}

type prop = {
  songs: song[]
  changeSong: (song: song) => void
}

export default function Home({ songs, changeSong }: prop) {
  return (
    <>
      <div className=''>
        <div className="flex flex-row justify-between items-center px-4 py-2 mt-6">
          <h3 className="text-white text-xl font-bold ml-4">#</h3>
          <h3 className="text-white text-xl font-bold ml-[-10rem]">Song Title</h3>
          <h3 className="text-white text-xl font-bold">Album</h3>
          <h3 className="text-white text-xl font-bold ">Length</h3>
        </div>
        <div className="">
          {songs &&
            songs.map((song: song) => (
              <div
                key={song.songName}
                onDoubleClick={() => changeSong(song)}
                className='w-full'>
                <MusicPreview filePath={song.filePath} songName={song.songName}  />
              </div>
            ))}
          </div>
      </div>
    </>
  )
}
