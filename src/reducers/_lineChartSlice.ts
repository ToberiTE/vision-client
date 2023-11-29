import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LineChartState
{
    lineChartData: any[];
    lineChartSelectedTable: string;
    lineChartTitle: string,
    lineChartColorX: string,
    lineChartColorY: string,
    lineChartSorting: boolean,
    lineChartGroupBy: string,
    lineChartDisplayValues: boolean,
    lineChartToolbarVisible: boolean,
}

const initialState: LineChartState = {
    lineChartData: [],
    lineChartSelectedTable: "",
    lineChartTitle: "",
    lineChartColorX: "#A0A0A0",
    lineChartColorY: "#A0A0A0",
    lineChartSorting: false,
    lineChartGroupBy: "",
    lineChartDisplayValues: false,
    lineChartToolbarVisible: true,
};

export const _lineChartSlice = createSlice({
    name: 'lineChartSlice',
    initialState,
    reducers: {
        setLineChartData: (state, action: PayloadAction<any[]>) =>
        {
            state.lineChartData = action.payload;
        },
        setLineChartSelectedTable: (state, action: PayloadAction<string>) =>
        {
            state.lineChartSelectedTable = action.payload;
        },
        setLineChartTitle: (state, action: PayloadAction<string>) =>
        {
            state.lineChartTitle = action.payload;
        },
        setLineChartColorX: (state, action: PayloadAction<string>) =>
        {
            state.lineChartColorX = action.payload;
        },
        setLineChartColorY: (state, action: PayloadAction<string>) =>
        {
            state.lineChartColorY = action.payload;
        },
        setLineChartSorting: (state, action: PayloadAction<boolean>) =>
        {
            state.lineChartSorting = action.payload;
        },
        setLineChartGroupBy: (state, action: PayloadAction<string>) =>
        {
            state.lineChartGroupBy = action.payload;
        },
        setLineChartDisplayValues: (state, action: PayloadAction<boolean>) =>
        {
            state.lineChartDisplayValues = action.payload;
        },
        setLineChartToolbarVisible: (state, action: PayloadAction<boolean>) =>
        {
            state.lineChartToolbarVisible = action.payload;
        },
    },
});

export const { setLineChartData, setLineChartSelectedTable, setLineChartTitle, setLineChartColorX, setLineChartColorY, setLineChartSorting, setLineChartGroupBy, setLineChartDisplayValues, setLineChartToolbarVisible } = _lineChartSlice.actions;

export default _lineChartSlice.reducer;