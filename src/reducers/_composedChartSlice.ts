import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ComposedChartState
{
    composedChartData: any[];
    composedChartSelectedTable: string;
    composedChartTitle: string,
    composedChartColorX: string,
    composedChartColorY: string,
    composedChartColorZ: string,
    composedChartSorting: boolean,
    composedChartGroupBy: string,
    composedChartDisplayValues: boolean,
    composedChartToolbarVisible: boolean,
}

const initialState: ComposedChartState = {
    composedChartData: [],
    composedChartSelectedTable: "",
    composedChartTitle: "",
    composedChartColorX: "#A0A0A0",
    composedChartColorY: "#A0A0A0",
    composedChartColorZ: "#A0A0A0",
    composedChartSorting: false,
    composedChartGroupBy: "",
    composedChartDisplayValues: false,
    composedChartToolbarVisible: true,
};

export const _composedChartSlice = createSlice({
    name: 'composedChartSlice',
    initialState,
    reducers: {
        setComposedChartData: (state, action: PayloadAction<any[]>) =>
        {
            state.composedChartData = action.payload;
        },
        setComposedChartSelectedTable: (state, action: PayloadAction<string>) =>
        {
            state.composedChartSelectedTable = action.payload;
        },
        setComposedChartTitle: (state, action: PayloadAction<string>) =>
        {
            state.composedChartTitle = action.payload;
        },
        setComposedChartColorX: (state, action: PayloadAction<string>) =>
        {
            state.composedChartColorX = action.payload;
        },
        setComposedChartColorY: (state, action: PayloadAction<string>) =>
        {
            state.composedChartColorY = action.payload;
        },
        setComposedChartColorZ: (state, action: PayloadAction<string>) =>
        {
            state.composedChartColorZ = action.payload;
        },
        setComposedChartSorting: (state, action: PayloadAction<boolean>) =>
        {
            state.composedChartSorting = action.payload;
        },
        setComposedChartGroupBy: (state, action: PayloadAction<string>) =>
        {
            state.composedChartGroupBy = action.payload;
        },
        setComposedChartDisplayValues: (state, action: PayloadAction<boolean>) =>
        {
            state.composedChartDisplayValues = action.payload;
        },
        setComposedChartToolbarVisible: (state, action: PayloadAction<boolean>) =>
        {
            state.composedChartToolbarVisible = action.payload;
        },
    },
});

export const { setComposedChartData, setComposedChartSelectedTable, setComposedChartTitle, setComposedChartColorX, setComposedChartColorY, setComposedChartColorZ, setComposedChartSorting, setComposedChartGroupBy, setComposedChartDisplayValues, setComposedChartToolbarVisible } = _composedChartSlice.actions;

export default _composedChartSlice.reducer;