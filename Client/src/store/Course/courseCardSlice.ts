import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CourseCardType } from "../../types/CourseCardTypes";


type CourseCardState = {
  cards: CourseCardType[]
}

const initialState: CourseCardState = {
  cards: [] as CourseCardType[]
}

const courseCardSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loadCourseCards(state, action: PayloadAction<CourseCardType[]>) {
        state.cards = action.payload
    }
  }
})


export const { loadCourseCards } = courseCardSlice.actions;
export default courseCardSlice.reducer;