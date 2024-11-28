import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios from "axios";
import { PREFIX } from "../helpers/API";
import { RooState } from "./store";

export const JWT_PERESI_STATE = 'userData';


interface LoginResponse {
    access_token: string;
}

export interface UserPersistentState {
    jwt: string | null;
}

export  interface Profile {
    id: number;
    email: string;
    address: string;
    name: string;
    phone: string;
}

export interface UserState {
    jwt: string | null;
    loginErrorMessage: string;
    profile?: Profile;
}


const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERESI_STATE)?.jwt ?? null,
    loginErrorMessage: ''
}

// Асинхронный `thunk` для входа пользователя
export const login = createAsyncThunk(
    'user/login',
    async (params: { email: string, password: string }) => {
        const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
            email: params.email,
            password: params.password,

        });
        return data;
    }
);
// Асинхронный `thunk` для регистрации пользователя
export const register = createAsyncThunk(
    'user/register',
    async (params: { email: string, password: string, name: string }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
                email: params.email,
                password: params.password,
                name: params.name,
            });
            return data;
        } catch (error: any) {
            console.error('Ошибка регистрации:', error.response?.data || error.message);
            return rejectWithValue(error.response?.data || 'Ошибка регистрации');
        }
    }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RooState }>(
    'user/profile',
    async (_, thunkApi) => {
        const jwt = thunkApi.getState().user.jwt;
        const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });
        return data; 
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload;
        },
        logout: (state) => {
            state.jwt = null
        },
    },
    
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
            state.jwt = action.payload.access_token;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loginErrorMessage = action.error.message || '';
        });
        builder.addCase(getProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
            state.profile = action.payload;
        });
           builder.addCase(register.fulfilled, (state, action ) => {
            if(!action.payload){
                return
            }
        });
      
      
    },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
