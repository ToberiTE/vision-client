import { combineReducers, configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './reducers/dashboardSlice';
import _areaChartReducer from './reducers/_areaChartSlice';
import _barChartReducer from './reducers/_barChartSlice';
import _brushBarChartReducer from './reducers/_brushBarChartSlice';
import _lineChartReducer from './reducers/_lineChartSlice';
import _pieChartReducer from './reducers/_pieChartSlice';
import _radarChartReducer from './reducers/_radarChartSlice';
import _scatterChartReducer from './reducers/_scatterChartSlice';

const rootReducer = combineReducers({
    dashboardReducer,
    _areaChartReducer,
    _barChartReducer,
    _brushBarChartReducer,
    _lineChartReducer,
    _pieChartReducer,
    _radarChartReducer,
    _scatterChartReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;

export default store;