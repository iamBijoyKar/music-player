import { useState, useEffect } from "react"
import "./css/background.css"

import SideBar from "./components/SideBar"
import Header from "./components/Header"
import Player from "./components/Player"
import Home from "./components/Home"

import { remote } from "electron"
import { useAppSelector, useAppDispatch } from "./hooks/hooks"
import { songListActions } from "./store/songList"
import { Song } from "./store/stateTypes"

type song = {
  songName: string
  filePath: string
  baseName: string
}

function App() {
  // const x_rapidapi_key: string = import.meta.env.VITE_X_RAPIDAPI_KEY
  // const x_rapidapi_host: string = import.meta.env.VITE_X_RAPIDAPI_HOST

  // const currentPage = useSelector((state: RootState) => state.currentPage.value)
  const currentPage = useAppSelector((state) => state.currentPage.currentPage)

  const [songs, setSongs] = useState<song[]>([])
  const [playingSong, setPlayingSong] = useState<song>({})
  const [playingSongObject, setPlayingSongObject] = useState<HTMLAudioElement>(
    new Audio()
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (playingSongObject != null) {
      playingSongObject.pause()
    }
    setPlayingSongObject(
      new Audio(`my-magic-protocol://getMediaFile/${playingSong.filePath}`)
    )
    console.log(playingSongObject, "in app")
  }, [playingSong])

  ipcRenderer.on("path:done", (data: Song[]) => {
    // console.log("done", data)
    // setSongs(data)
    dispatch(songListActions.addSongs(data))
  })
  // console.log("app")

  const loadFile = () => {
    ipcRenderer.send("load:done")
  }

  const generatePage = () => {
    switch (currentPage) {
      case "home":
        return <Home />
      case "library":
        return <h1>Playlist</h1>
      case "settings":
        return <h1>Settings</h1>
      case "search":
        return <h1>Search</h1>
      default:
        return <h1>Home</h1>
    }
  }

  return (
    <>
      <div onLoad={loadFile} className='app flex flex-row min-h-[100vh]'>
        <SideBar />
        <div className='w-full p-4 relative'>
          <Header />
          {/* <h1>{currentPage}</h1> */}
          {generatePage()}
          {/* <Player playingSongObject={playingSongObject} song={playingSong} /> */}
        </div>
      </div>
    </>
  )
}

export default App
