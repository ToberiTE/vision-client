import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState
{
    dashboardLayout: number;
    selectedComponentIds: string[];
    componentTables: string[];
    toggleComponentFullscreen: string;
}

const initialState: DashboardState = {
    dashboardLayout: 0,
    selectedComponentIds: [],
    componentTables: [],
    toggleComponentFullscreen: "",
};

export const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {
        setDashboardLayout: (state, action: PayloadAction<number>) =>
        {
            state.dashboardLayout = action.payload;
        },
        setSelectedComponentIds: (state, action: PayloadAction<string[]>) =>
        {
            state.selectedComponentIds = action.payload;
        },
        setComponentTables: (state, action: PayloadAction<string[]>) =>
        {
            state.componentTables = action.payload;
        },
        setToggleComponentFullscreen: (state, action: PayloadAction<string>) =>
        {
            state.toggleComponentFullscreen = action.payload;
        },
    },
});

export const { setDashboardLayout, setSelectedComponentIds, setComponentTables, setToggleComponentFullscreen } = dashboardSlice.actions;

export default dashboardSlice.reducer;