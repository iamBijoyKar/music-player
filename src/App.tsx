import { useState, useEffect } from "react"
import "./css/background.css"

import SideBar from "./components/SideBar"
import Header from "./components/Header"
import Player from "./components/Player"
import Home from "./components/Home"

import { useAppSelector, useAppDispatch } from "./hooks/hooks"
import { songListActions } from "./store/songList"
import { currentlyPlayingSongActions } from "./store/currentlyPlayingSong"
import { Song } from "./store/stateTypes"

type song = {
  songName: string
  filePath: string
  baseName: string
}

function App() {
  const currentPage = useAppSelector((state) => state.currentPage.currentPage)

  const playingSong = useAppSelector((state) => state.currentlyPlayingSong.song)
  const playingSongObject = useAppSelector(
    (state) => state.currentlyPlayingSong.songAudioObject
  )

  const dispatch = useAppDispatch()

  const setPlayingSongObject = (song: Song) => {
    dispatch(currentlyPlayingSongActions.changeCurrentlyPlayingSong(song))
  }

  useEffect(() => {
    if (playingSongObject != null) {
      playingSongObject.pause()
    }
    setPlayingSongObject(playingSong)
    // console.log(playingSongObject, "in app")
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
          <Player />
        </div>
      </div>
    </>
  )
}

export default App
