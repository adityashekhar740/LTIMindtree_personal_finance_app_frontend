import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface User{
    email:string; 
    name:string;
_id:string;
}
interface UserState{
    currentUser:User|null,
    error:string|null,
    loading:boolean,
}

const initialState: UserState={
    currentUser: null,
    error: null,
    loading: false
}

export const UserSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
         signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action:PayloadAction<{_id:string,name:string,email:string}>) => {
        const {_id,name,email}=action.payload;
      state.currentUser = {_id,name,email};
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action:PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logOutStart:(state)=>{
      state.currentUser=null;
    }
    }
})

export default UserSlice.reducer;
export const {signInStart,signInSuccess,signInFailure,logOutStart}=UserSlice.actions;