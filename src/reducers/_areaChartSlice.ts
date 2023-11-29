import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AreaChartState
{
    areaChartData: any[];
    areaChartSelectedTable: string;
    areaChartTitle: string,
    areaChartColorX: string,
    areaChartColorY: string,
    areaChartSorting: boolean,
    areaChartGroupBy: string,
    areaChartDisplayValues: boolean,
    areaChartToolbarVisible: boolean,
}

const initialState: AreaChartState = {
    areaChartData: [],
    areaChartSelectedTable: "",
    areaChartTitle: "",
    areaChartColorX: "#A0A0A0",
    areaChartColorY: "#A0A0A0",
    areaChartSorting: false,
    areaChartGroupBy: "",
    areaChartDisplayValues: false,
    areaChartToolbarVisible: true,
};

export const _areaChartSlice = createSlice({
    name: 'areaChartSlice',
    initialState,
    reducers: {
        setAreaChartData: (state, action: PayloadAction<any[]>) =>
        {
            state.areaChartData = action.payload;
        },
        setAreaChartSelectedTable: (state, action: PayloadAction<string>) =>
        {
            state.areaChartSelectedTable = action.payload;
        },
        setAreaChartTitle: (state, action: PayloadAction<string>) =>
        {
            state.areaChartTitle = action.payload;
        },
        setAreaChartColorX: (state, action: PayloadAction<string>) =>
        {
            state.areaChartColorX = action.payload;
        },
        setAreaChartColorY: (state, action: PayloadAction<string>) =>
        {
            state.areaChartColorY = action.payload;
        },
        setAreaChartSorting: (state, action: PayloadAction<boolean>) =>
        {
            state.areaChartSorting = action.payload;
        },
        setAreaChartGroupBy: (state, action: PayloadAction<string>) =>
        {
            state.areaChartGroupBy = action.payload;
        },
        setAreaChartDisplayValues: (state, action: PayloadAction<boolean>) =>
        {
            state.areaChartDisplayValues = action.payload;
        },
        setAreaChartToolbarVisible: (state, action: PayloadAction<boolean>) =>
        {
            state.areaChartToolbarVisible = action.payload;
        },
    },
});

export const { setAreaChartData, setAreaChartSelectedTable, setAreaChartTitle, setAreaChartColorX, setAreaChartColorY, setAreaChartSorting, setAreaChartGroupBy, setAreaChartDisplayValues, setAreaChartToolbarVisible } = _areaChartSlice.actions;

export default _areaChartSlice.reducer;