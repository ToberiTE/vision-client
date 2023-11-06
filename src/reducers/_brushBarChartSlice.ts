import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BrushBarChartState
{
    brushBarChartData: any[];
    brushBarChartSelectedTable: string;
    brushBarChartTitle: string,
    brushBarChartColorX: string
    brushBarChartColorY: string,
    brushBarChartSorting: boolean,
    brushBarChartFilterStart: string,
    brushBarChartFilterEnd: string,
    brushBarChartGroupBy: string,
    brushBarChartToolbarVisible: boolean,
}

const initialState: BrushBarChartState = {
    brushBarChartData: [],
    brushBarChartSelectedTable: "",
    brushBarChartTitle: "",
    brushBarChartColorX: "#A0A0A0",
    brushBarChartColorY: "#A0A0A0",
    brushBarChartSorting: false,
    brushBarChartFilterStart: "",
    brushBarChartFilterEnd: "",
    brushBarChartGroupBy: "",
    brushBarChartToolbarVisible: true,
};

export const _brushBarChartSlice = createSlice({
    name: 'brushBarChartSlice',
    initialState,
    reducers: {
        setBrushBarChartData: (state, action: PayloadAction<any[]>) =>
        {
            state.brushBarChartData = action.payload;
        },
        setBrushBarChartSelectedTable: (state, action: PayloadAction<string>) =>
        {
            state.brushBarChartSelectedTable = action.payload;
        },
        setBrushBarChartTitle: (state, action: PayloadAction<string>) =>
        {
            state.brushBarChartTitle = action.payload;
        },
        setBrushBarChartColorX: (state, action: PayloadAction<string>) =>
        {
            state.brushBarChartColorX = action.payload;
        },
        setBrushBarChartColorY: (state, action: PayloadAction<string>) =>
        {
            state.brushBarChartColorY = action.payload;
        },
        setBrushBarChartSorting: (state, action: PayloadAction<boolean>) =>
        {
            state.brushBarChartSorting = action.payload;
        },
        setBrushBarChartFilterStart: (state, action: PayloadAction<string>) =>
        {
            state.brushBarChartFilterStart = action.payload;
        },
        setBrushBarChartFilterEnd: (state, action: PayloadAction<string>) =>
        {
            state.brushBarChartFilterEnd = action.payload;
        },
        setBrushBarChartGroupBy: (state, action: PayloadAction<string>) =>
        {
            state.brushBarChartGroupBy = action.payload;
        },
        setBrushBarChartToolbarVisible: (state, action: PayloadAction<boolean>) =>
        {
            state.brushBarChartToolbarVisible = action.payload;
        },
    },
});

export const { setBrushBarChartData, setBrushBarChartSelectedTable, setBrushBarChartTitle, setBrushBarChartColorX, setBrushBarChartColorY, setBrushBarChartSorting, setBrushBarChartFilterStart, setBrushBarChartFilterEnd, setBrushBarChartGroupBy, setBrushBarChartToolbarVisible } = _brushBarChartSlice.actions;

export default _brushBarChartSlice.reducer;