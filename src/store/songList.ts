import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialSongList } from "./state"
import { Song } from "./stateTypes"

export const songListSlice = createSlice({
  name: "songList",
  initialState: initialSongList,
  reducers: {
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload)
    },
    addSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs.push(...action.payload)
    },
  },
})

export const songListActions = songListSlice.actions
