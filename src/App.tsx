import { useState } from "react"
import "./css/background.css"

import SideBar from "./components/SideBar"
import Header from "./components/Header"
import Player from "./components/Player"
import Home from "./components/Home"

import { remote } from "electron"

type song = {
  songName: string
  filePath: string
  baseName: string
}

function App() {
  // const x_rapidapi_key: string = import.meta.env.VITE_X_RAPIDAPI_KEY
  // const x_rapidapi_host: string = import.meta.env.VITE_X_RAPIDAPI_HOST

  const [songs, setSongs] = useState<song[]>([])
  const [playingSong, setPlayingSong] = useState<song>({})

  ipcRenderer.on("path:done", (data: song[]) => {
    console.log("done", data)
    setSongs(data)
  })
  console.log("app")

  const loadFile = () => {
    ipcRenderer.send("load:done")
  }

  const [page, setPage] = useState<string>("home")

  const generatePage = () => {
    switch (page) {
      case "home":
        return <Home changeSong={setPlayingSong} songs={songs} />
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
        <SideBar page={page} changePage={setPage} />
        <div className='w-full p-4 relative'>
          <Header page={page} changePage={setPage} />
          {generatePage()}
          <Player song={playingSong} />
        </div>
      </div>
    </>
  )
}

export default App
