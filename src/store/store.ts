console.log("store.ts")
import { configureStore } from "@reduxjs/toolkit"
import { songListSlice } from "./songList"
import { currentPageSlice } from "./currentPage"
import { currentlyPlayingSongSlice } from "./currentlyPlayingSong"

// State store and reducer
const store = configureStore({
  reducer: {
    // reducer
    songList: songListSlice.reducer,
    currentPage: currentPageSlice.reducer,
    currentlyPlayingSong: currentlyPlayingSongSlice.reducer,
  },
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
