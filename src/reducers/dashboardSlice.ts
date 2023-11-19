import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DashboardState
{
    dashboardLayout: number;
    selectedComponentIds: string[];
    componentTables: string[];
    componentWillAnimate: boolean;
}

const initialState: DashboardState = {
    dashboardLayout: 0,
    selectedComponentIds: [],
    componentTables: [],
    componentWillAnimate: true,
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
        setComponentWillAnimate: (state, action: PayloadAction<boolean>) =>
        {
            state.componentWillAnimate = action.payload;
        },

    },
});

export const { setDashboardLayout, setSelectedComponentIds, setComponentTables, setComponentWillAnimate } = dashboardSlice.actions;

export default dashboardSlice.reducer;