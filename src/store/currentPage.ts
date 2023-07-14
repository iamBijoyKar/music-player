import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialCurrentPage } from "./state"
import { RootState } from "./store"
// Current page slice
export const currentPageSlice = createSlice({
  name: "currentPage",
  initialState: initialCurrentPage,
  reducers: {
    changeCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload
    },
  },
})

export const currentPageActions = currentPageSlice.actions
export const currentPageReducer = currentPageSlice.reducer
export const selectCount = (state: RootState) => state.currentPage.currentPage
