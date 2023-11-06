import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BarChartState
{
    barChartData: any[];
    barChartSelectedTable: string;
    barChartTitle: string,
    barChartColorX: string,
    barChartColorY: string,
    barChartSorting: boolean,
    barChartFilterStart: string,
    barChartFilterEnd: string,
    barChartGroupBy: string,
    barChartToolbarVisible: boolean,
}

const initialState: BarChartState = {
    barChartData: [],
    barChartSelectedTable: "",
    barChartTitle: "",
    barChartColorX: "#A0A0A0",
    barChartColorY: "#A0A0A0",
    barChartSorting: false,
    barChartFilterStart: "",
    barChartFilterEnd: "",
    barChartGroupBy: "",
    barChartToolbarVisible: true,
};

export const _barChartSlice = createSlice({
    name: 'barChartSlice',
    initialState,
    reducers: {
        setBarChartData: (state, action: PayloadAction<any[]>) =>
        {
            state.barChartData = action.payload;
        },
        setBarChartSelectedTable: (state, action: PayloadAction<string>) =>
        {
            state.barChartSelectedTable = action.payload;
        },
        setBarChartTitle: (state, action: PayloadAction<string>) =>
        {
            state.barChartTitle = action.payload;
        },
        setBarChartColorX: (state, action: PayloadAction<string>) =>
        {
            state.barChartColorX = action.payload;
        },
        setBarChartColorY: (state, action: PayloadAction<string>) =>
        {
            state.barChartColorY = action.payload;
        },
        setBarChartSorting: (state, action: PayloadAction<boolean>) =>
        {
            state.barChartSorting = action.payload;
        },
        setBarChartFilterStart: (state, action: PayloadAction<string>) =>
        {
            state.barChartFilterStart = action.payload;
        },
        setBarChartFilterEnd: (state, action: PayloadAction<string>) =>
        {
            state.barChartFilterEnd = action.payload;
        },
        setBarChartGroupBy: (state, action: PayloadAction<string>) =>
        {
            state.barChartGroupBy = action.payload;
        },
        setBarChartToolbarVisible: (state, action: PayloadAction<boolean>) =>
        {
            state.barChartToolbarVisible = action.payload;
        },
    },
});

export const { setBarChartData, setBarChartSelectedTable, setBarChartTitle, setBarChartColorX, setBarChartColorY, setBarChartSorting, setBarChartFilterStart, setBarChartFilterEnd, setBarChartGroupBy, setBarChartToolbarVisible } = _barChartSlice.actions;

export default _barChartSlice.reducer;