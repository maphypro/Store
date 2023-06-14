import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type UserState = {
  isAuth: boolean
  role: string,
  email: string
}

export const defaultUserState: UserState = {
  isAuth: false,
  role: 'GUEST',
  email: 'NONE'
}

const userSlice = createSlice({
  name: 'user',
  initialState: defaultUserState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.isAuth = action.payload.isAuth;
      state.role = action.payload.role;
      state.email = action.payload.email;
    },
  }
})


export const { setUser } = userSlice.actions;
export default userSlice.reducer;