import { createSlice } from '@reduxjs/toolkit';

type InitialState = {
    name: string;
};

const initialState: InitialState = {
    name: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
});

export default userSlice.reducer;
// export const {} = userSlice.actions;
