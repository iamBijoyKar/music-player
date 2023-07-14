import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialCurrentlyPlayingSong } from "./state"
import { Song } from "./stateTypes"
import { RootState } from "./store"

// Currently playing song slice
export const currentlyPlayingSongSlice = createSlice({
  name: "currentlyPlayingSong",
  initialState: initialCurrentlyPlayingSong,
  reducers: {
    changeCurrentlyPlayingSong: (state, action: PayloadAction<Song>) => {
      state.song = action.payload
      const str = `my-magic-protocol://getMediaFile/${action.payload.file.filePath}`
      if (state.songAudioObject) {
        state.songAudioObject.pause()
      }
      if (state.playingStatus) {
        state.playingStatus = false
      }
      state.songAudioObject = new Audio(str)
    },
    changeCurrentlyPlayingSongAudioObject: (
      state,
      action: PayloadAction<Song>
    ) => {
      const str = `my-magic-protocol://getMediaFile/${action.payload.file.filePath}`
      state.songAudioObject = new Audio(str)
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
export const currentlyPlayingSongReducer = currentlyPlayingSongSlice.reducer
export const currentlyPlayingSongSelector = (state: RootState) =>
  state.currentlyPlayingSong
