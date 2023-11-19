import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './reducers/dashboardSlice';
import _areaChartReducer from './reducers/_areaChartSlice';
import _barChartReducer from './reducers/_barChartSlice';
import _brushBarChartReducer from './reducers/_brushBarChartSlice';
import _lineChartReducer from './reducers/_lineChartSlice';
import _pieChartReducer from './reducers/_pieChartSlice';
import _radarChartReducer from './reducers/_radarChartSlice';
import _scatterChartReducer from './reducers/_scatterChartSlice';

const store = configureStore({
    reducer: {
        dashboardLayout: dashboardReducer,
        selectedComponentIds: dashboardReducer,
        componentTables: dashboardReducer,
        componentWillAnimate: dashboardReducer,
        areaChartData: _areaChartReducer,
        barChartData: _barChartReducer,
        brushBarChartData: _brushBarChartReducer,
        lineChartData: _lineChartReducer,
        pieChartData: _pieChartReducer,
        radarChartData: _radarChartReducer,
        scatterChartData: _scatterChartReducer,
        areaChartSelectedTable: _areaChartReducer,
        barChartSelectedTable: _barChartReducer,
        brushBarChartSelectedTable: _brushBarChartReducer,
        lineChartSelectedTable: _lineChartReducer,
        pieChartSelectedTable: _pieChartReducer,
        radarChartSelectedTable: _radarChartReducer,
        scatterChartSelectedTable: _scatterChartReducer,
        areaChartTitle: _areaChartReducer,
        barChartTitle: _barChartReducer,
        brushBarChartTitle: _brushBarChartReducer,
        lineChartTitle: _lineChartReducer,
        pieChartTitle: _pieChartReducer,
        radarChartTitle: _radarChartReducer,
        scatterChartTitle: _scatterChartReducer,
        areaChartColorX: _areaChartReducer,
        areaChartColorY: _areaChartReducer,
        barChartColorX: _barChartReducer,
        barChartColorY: _barChartReducer,
        brushBarChartColorX: _brushBarChartReducer,
        brushBarChartColorY: _brushBarChartReducer,
        lineChartColorX: _lineChartReducer,
        lineChartColorY: _lineChartReducer,
        radarChartColor: _radarChartReducer,
        scatterChartColor: _scatterChartReducer,
        pieChartColor: _pieChartReducer,
        pieChartLMin: _pieChartReducer,
        pieChartLMax: _pieChartReducer,
        areaChartSorting: _areaChartReducer,
        lineChartSorting: _lineChartReducer,
        barChartSorting: _barChartReducer,
        brushBarChartSorting: _brushBarChartReducer,
        pieChartSorting: _pieChartReducer,
        areaChartFilterStart: _areaChartReducer,
        areaChartFilterEnd: _areaChartReducer,
        lineChartFilterStart: _lineChartReducer,
        lineChartFilterEnd: _lineChartReducer,
        barChartFilterStart: _barChartReducer,
        barChartFilterEnd: _barChartReducer,
        brushBarChartFilterStart: _brushBarChartReducer,
        brushBarChartFilterEnd: _brushBarChartReducer,
        pieChartFilterStart: _pieChartReducer,
        pieChartFilterEnd: _pieChartReducer,
        areaChartGroupBy: _areaChartReducer,
        lineChartGroupBy: _lineChartReducer,
        barChartGroupBy: _barChartReducer,
        brushBarChartGroupBy: _brushBarChartReducer,
        radarChartGroupBy: _radarChartReducer,
        pieChartGroupBy: _pieChartReducer,
        scatterChartToolbarVisible: _scatterChartReducer,
        areaChartToolbarVisible: _areaChartReducer,
        lineChartToolbarVisible: _lineChartReducer,
        barChartToolbarVisible: _barChartReducer,
        brushBarChartToolbarVisible: _brushBarChartReducer,
        radarChartToolbarVisible: _radarChartReducer,
        pieChartToolbarVisible: _pieChartReducer,
    },
    devTools: false,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;