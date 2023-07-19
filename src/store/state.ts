import {
  Song,
  SongFile,
  SongList,
  CurrentPage,
  CurrentlyPlayingSong,
} from "./stateTypes"

// Initial states

export const initialCurrentPage: CurrentPage = {
  currentPage: "home",
}

export const initialSongFile: SongFile = {
  filePath: "",
  fileName: "",
}

export const initialSong: Song = {
  songName: "",
  file: initialSongFile,
}

export const initialCurrentlyPlayingSong: CurrentlyPlayingSong = {
  song: initialSong,
  songAudioObject: new Audio(),
  currentTime: 0,
  playingStatus: false,
  volume: 0.4,
}

export const initialSongList: SongList = {
  songs: [],
  currentlyPlayingSong: initialCurrentlyPlayingSong,
  currentSongIndex: 0,
}
