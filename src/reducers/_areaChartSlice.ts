import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AreaChartState
{
    areaChartData: any[];
    areaChartSelectedTable: string;
    areaChartTitle: string,
    areaChartColorX: string,
    areaChartColorY: string,
    areaChartSorting: boolean,
    areaChartFilterStart: string,
    areaChartFilterEnd: string,
    areaChartGroupBy: string,
    areaChartToolbarVisible: boolean,
}

const initialState: AreaChartState = {
    areaChartData: [],
    areaChartSelectedTable: "",
    areaChartTitle: "",
    areaChartColorX: "#A0A0A0",
    areaChartColorY: "#A0A0A0",
    areaChartSorting: false,
    areaChartFilterStart: "",
    areaChartFilterEnd: "",
    areaChartGroupBy: "",
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
        setAreaChartFilterStart: (state, action: PayloadAction<string>) =>
        {
            state.areaChartFilterStart = action.payload;
        },
        setAreaChartFilterEnd: (state, action: PayloadAction<string>) =>
        {
            state.areaChartFilterEnd = action.payload;
        },
        setAreaChartGroupBy: (state, action: PayloadAction<string>) =>
        {
            state.areaChartGroupBy = action.payload;
        },
        setAreaChartToolbarVisible: (state, action: PayloadAction<boolean>) =>
        {
            state.areaChartToolbarVisible = action.payload;
        },
    },
});

export const { setAreaChartData, setAreaChartSelectedTable, setAreaChartTitle, setAreaChartColorX, setAreaChartColorY, setAreaChartSorting, setAreaChartFilterStart, setAreaChartFilterEnd, setAreaChartGroupBy, setAreaChartToolbarVisible } = _areaChartSlice.actions;

export default _areaChartSlice.reducer;