import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialCurrentPage } from "./state"

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
