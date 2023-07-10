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
  const x_rapidapi_key: string = import.meta.env.VITE_X_RAPIDAPI_KEY
  const x_rapidapi_host: string = import.meta.env.VITE_X_RAPIDAPI_HOST

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

  // const search = async (text:string) => {
  //   const url = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${text}}`;
  //   const options = {
  //     method: 'GET',
  //     headers: {
  //       'X-RapidAPI-Key': '520d8cc15amshc4d1e66b86ddbb7p18c135jsn1e368fc76def',
  //       'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
  //     }
  //   };

  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.text();
  //     setText(result);
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  return (
    <>
      <div onLoad={loadFile} className='app flex flex-row min-h-[100vh]'>
        <SideBar page={page} changePage={setPage} />
        <div className='w-full p-4 relative'>
          <Header page={page} changePage={setPage} />
          <Home changeSong={setPlayingSong} songs={songs} />
          <Player song={playingSong} />
        </div>
      </div>
    </>
  )
}

export default App
