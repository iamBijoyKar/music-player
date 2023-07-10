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
        home
        {songs &&
          songs.map((song: song) => (
            <div
              key={song.songName}
              onClick={() => changeSong(song)}
              className=''>
              {song.songName}
            </div>
          ))}
      </div>
    </>
  )
}
