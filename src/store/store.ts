import { configureStore } from "@reduxjs/toolkit";
import  userSlice, { JWT_PERESI_STATE }  from './user.slice.ts'
import { saveState } from "./storage.ts";
import cartActions from "./Cart.slice";


export const store = configureStore({
    reducer: {
       user: userSlice,
       cart: cartActions
    }

});

store.subscribe(() => {
    saveState({jwt: store.getState().user.jwt }, JWT_PERESI_STATE)
})



export type RooState =  ReturnType <typeof store.getState>;
export type typeAppDispatch = typeof store.dispatch;

export default store