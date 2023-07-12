import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialCurrentlyPlayingSong } from "./state"
import { Song } from "./stateTypes"

// Currently playing song slice
export const currentlyPlayingSongSlice = createSlice({
  name: "currentlyPlayingSong",
  initialState: initialCurrentlyPlayingSong,
  reducers: {
    changeCurrentlyPlayingSong: (state, action: PayloadAction<Song>) => {
      state.song = action.payload
    },
    changeCurrentlyPlayingSongAudioObject: (
      state,
      action: PayloadAction<HTMLAudioElement>
    ) => {
      state.songAudioObject = action.payload
    },
    changeCurrentlyPlayingSongCurrentTime: (
      state,
      action: PayloadAction<number>
    ) => {
      state.songAudioObject.currentTime = action.payload
    },
    changeCurrentlyPlayingSongPlayingStatus: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.playingStatus = action.payload
    },
    changeCurrentlyPlayingSongVolume: (
      state,
      action: PayloadAction<number>
    ) => {
      state.volume = action.payload
    },
  },
})

export const currentlyPlayingSongActions = currentlyPlayingSongSlice.actions
