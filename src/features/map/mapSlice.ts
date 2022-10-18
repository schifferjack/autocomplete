import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface MapState {
    center: {lat: number, lng: number};
    address: string;
    searchHistroy: string[];
    selected: {lat: number, lng: number}
    placeID: string[];
}
const initialState: MapState = {
    center: {lat: 3.139003, lng: 101.686855}, //Kuala Lumpur,
    address: "",
    searchHistroy: [],
    selected: {lat: 3.139003, lng: 101.686855},
    placeID: [],
}

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLatLng: (state, action: PayloadAction<{lat: number, lng: number}>) => {
            state.selected = action.payload;
            state.center = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setPlaceID: (state, action: PayloadAction<string>) => {
            state.placeID.push(action.payload);
        },
        setSearchHistory: (state, action: PayloadAction<string>) => {
            state.searchHistroy.push(action.payload);
        },
    }
});
export const { setLatLng, setAddress, setSearchHistory } = mapSlice.actions;
export const currentLatLng = (state:RootState) => state.map.selected;
export const initLatLng = (state: RootState) => state.map.center;
export const getSearchHistory = (state: RootState) => state.map.searchHistroy;
export const getSelectedAddress = (state: RootState) => state.map.address;
export default mapSlice.reducer;