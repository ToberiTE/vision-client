import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RadarChartState
{
    radarChartData: any[];
    radarChartSelectedTable: string;
    radarChartTitle: string,
    radarChartColor: string,
    radarChartGroupBy: string,
    radarChartToolbarVisible: boolean,
}

const initialState: RadarChartState = {
    radarChartData: [],
    radarChartSelectedTable: "",
    radarChartTitle: "",
    radarChartColor: "#A0A0A0",
    radarChartGroupBy: "",
    radarChartToolbarVisible: true,
};

export const radarChartSlice = createSlice({
    name: 'radarChartSlice',
    initialState,
    reducers: {
        setRadarChartData: (state, action: PayloadAction<any[]>) =>
        {
            state.radarChartData = action.payload;
        },
        setRadarChartSelectedTable: (state, action: PayloadAction<string>) =>
        {
            state.radarChartSelectedTable = action.payload;
        },
        setRadarChartTitle: (state, action: PayloadAction<string>) =>
        {
            state.radarChartTitle = action.payload;
        },
        setRadarChartColor: (state, action: PayloadAction<string>) =>
        {
            state.radarChartColor = action.payload;
        },
        setRadarChartGroupBy: (state, action: PayloadAction<string>) =>
        {
            state.radarChartGroupBy = action.payload;
        },
        setRadarChartToolbarVisible: (state, action: PayloadAction<boolean>) =>
        {
            state.radarChartToolbarVisible = action.payload;
        },
    },
});

export const { setRadarChartData, setRadarChartSelectedTable, setRadarChartTitle, setRadarChartColor, setRadarChartGroupBy, setRadarChartToolbarVisible } = radarChartSlice.actions;

export default radarChartSlice.reducer;