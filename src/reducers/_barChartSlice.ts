import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BarChartState
{
    barChartData: any[];
    barChartSelectedTable: string;
    barChartTitle: string,
    barChartColorX: string,
    barChartColorY: string,
    barChartSorting: boolean,
    barChartGroupBy: string,
    barChartDisplayValues: boolean,
    barChartToolbarVisible: boolean,
}

const initialState: BarChartState = {
    barChartData: [],
    barChartSelectedTable: "",
    barChartTitle: "",
    barChartColorX: "#A0A0A0",
    barChartColorY: "#A0A0A0",
    barChartSorting: false,
    barChartGroupBy: "",
    barChartDisplayValues: false,
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
        setBarChartGroupBy: (state, action: PayloadAction<string>) =>
        {
            state.barChartGroupBy = action.payload;
        },
        setBarChartDisplayValues: (state, action: PayloadAction<boolean>) =>
        {
            state.barChartDisplayValues = action.payload;
        },
        setBarChartToolbarVisible: (state, action: PayloadAction<boolean>) =>
        {
            state.barChartToolbarVisible = action.payload;
        },
    },
});

export const { setBarChartData, setBarChartSelectedTable, setBarChartTitle, setBarChartColorX, setBarChartColorY, setBarChartSorting, setBarChartGroupBy, setBarChartDisplayValues, setBarChartToolbarVisible } = _barChartSlice.actions;

export default _barChartSlice.reducer;