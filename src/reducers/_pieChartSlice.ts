import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PieChartState
{
    pieChartData: any[];
    pieChartSelectedTable: string;
    pieChartTitle: string;
    pieChartColor: string;
    pieChartLMin: number;
    pieChartLMax: number;
    pieChartSorting: boolean,
    pieChartGroupBy: string;
    pieChartToolbarVisible: boolean,
}

const initialState: PieChartState = {
    pieChartData: [],
    pieChartSelectedTable: "",
    pieChartTitle: "",
    pieChartColor: "#A0A0A0",
    pieChartLMin: 0,
    pieChartLMax: 100,
    pieChartSorting: false,
    pieChartGroupBy: "",
    pieChartToolbarVisible: true,
};

export const _pieChartSlice = createSlice({
    name: 'pieChartSlice',
    initialState,
    reducers: {
        setPieChartData: (state, action: PayloadAction<any[]>) =>
        {
            state.pieChartData = action.payload;
        },
        setPieChartSelectedTable: (state, action: PayloadAction<string>) =>
        {
            state.pieChartSelectedTable = action.payload;
        },
        setPieChartTitle: (state, action: PayloadAction<string>) =>
        {
            state.pieChartTitle = action.payload;
        },
        setPieChartColor: (state, action: PayloadAction<string>) =>
        {
            state.pieChartColor = action.payload;
        },
        setPieChartLMin: (state, action: PayloadAction<number>) =>
        {
            state.pieChartLMin = action.payload;
        },
        setPieChartLMax: (state, action: PayloadAction<number>) =>
        {
            state.pieChartLMax = action.payload;
        },
        setPieChartSorting: (state, action: PayloadAction<boolean>) =>
        {
            state.pieChartSorting = action.payload;
        },
        setPieChartGroupBy: (state, action: PayloadAction<string>) =>
        {
            state.pieChartGroupBy = action.payload;
        },
        setPieChartToolbarVisible: (state, action: PayloadAction<boolean>) =>
        {
            state.pieChartToolbarVisible = action.payload;
        },

    },
});

export const { setPieChartData, setPieChartSelectedTable, setPieChartTitle, setPieChartColor, setPieChartLMin, setPieChartLMax, setPieChartSorting, setPieChartGroupBy, setPieChartToolbarVisible } = _pieChartSlice.actions;

export default _pieChartSlice.reducer;