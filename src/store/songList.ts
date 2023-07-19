import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialSongList } from "./state"
import { Song } from "./stateTypes"
import { RootState } from "./store"

export const songListSlice = createSlice({
  name: "songList",
  initialState: initialSongList,
  reducers: {
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload)
    },
    addSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload
    },
  },
})

export const songListActions = songListSlice.actions
export const songListReducer = songListSlice.reducer
export const selectSongList = (state: RootState) => state.songList
