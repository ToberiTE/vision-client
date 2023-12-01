import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScatterChartState
{
    scatterChartData: any[];
    scatterChartSelectedTable: string;
    scatterChartTitle: string,
    scatterChartColor: string,
    scatterChartGroupBy: string,
    scatterChartDisplayValues: boolean,
    scatterChartToolbarVisible: boolean,
}

const initialState: ScatterChartState = {
    scatterChartData: [],
    scatterChartSelectedTable: "",
    scatterChartTitle: "",
    scatterChartColor: "#A0A0A0",
    scatterChartGroupBy: "",
    scatterChartDisplayValues: false,
    scatterChartToolbarVisible: true,
};

export const _scatterChartSlice = createSlice({
    name: 'scatterChartSlice',
    initialState,
    reducers: {
        setScatterChartData: (state, action: PayloadAction<any[]>) =>
        {
            state.scatterChartData = action.payload;
        },
        setScatterChartSelectedTable: (state, action: PayloadAction<string>) =>
        {
            state.scatterChartSelectedTable = action.payload;
        },
        setScatterChartTitle: (state, action: PayloadAction<string>) =>
        {
            state.scatterChartTitle = action.payload;
        },
        setScatterChartColor: (state, action: PayloadAction<string>) =>
        {
            state.scatterChartColor = action.payload;
        },
        setScatterChartGroupBy: (state, action: PayloadAction<string>) =>
        {
            state.scatterChartGroupBy = action.payload;
        },
        setScatterChartDisplayValues: (state, action: PayloadAction<boolean>) =>
        {
            state.scatterChartDisplayValues = action.payload;
        },
        setScatterChartToolbarVisible: (state, action: PayloadAction<boolean>) =>
        {
            state.scatterChartToolbarVisible = action.payload;
        },
    },
});

export const { setScatterChartData, setScatterChartSelectedTable, setScatterChartTitle, setScatterChartColor, setScatterChartGroupBy, setScatterChartDisplayValues, setScatterChartToolbarVisible } = _scatterChartSlice.actions;

export default _scatterChartSlice.reducer;