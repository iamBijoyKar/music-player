export interface SongFile {
  filePath: string
  fileName: string
  fileExtension?: string
  fileSize?: number
}

export interface Song {
  songName: string
  songArtist?: string[]
  songAlbum?: string
  songYear?: string
  songGenre?: string[]
  songLyrics?: string
  songLink?: string
  songImage?: string
  songDuration?: number
  file: SongFile // file info of the song
}

export interface CurrentlyPlayingSong {
  song: Song
  songAudioObject: HTMLAudioElement
  currentTime: number
  playingStatus: boolean
  volume: number
}

export interface SongList {
  songs: Song[]
  currentlyPlayingSong: CurrentlyPlayingSong
  currentSongIndex: number
}

export interface CurrentPage {
  currentPage: string
}
