import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

const selectDashboardState = (state: RootState) => state.dashboardReducer;
const selectAreaChartState = (state: RootState) => state._areaChartReducer;
const selectLineChartState = (state: RootState) => state._lineChartReducer;
const selectBarChartState = (state: RootState) => state._barChartReducer;
const selectRadarChartState = (state: RootState) => state._radarChartReducer;
const selectPieChartState = (state: RootState) => state._pieChartReducer;
const selectScatterChartState = (state: RootState) =>
    state._scatterChartReducer;
const selectComposedChartState = (state: RootState) =>
    state._composedChartReducer;

export const selectDashboardFields = createSelector(
    selectDashboardState,
    (dashboard) => ({
        dashboardLayout: dashboard.dashboardLayout,
        selectedComponentIds: dashboard.selectedComponentIds,
        componentTables: dashboard.componentTables,
        toggleComponentFullscreen: dashboard.toggleComponentFullscreen,
    })
);

export const selectAreaChartFields = createSelector(
    selectAreaChartState,
    (areaChart) => ({
        areaChartSelectedTable: areaChart.areaChartSelectedTable,
        areaChartTitle: areaChart.areaChartTitle,
        areaChartData: areaChart.areaChartData,
        areaChartColorX: areaChart.areaChartColorX,
        areaChartColorY: areaChart.areaChartColorY,
        areaChartSorting: areaChart.areaChartSorting,
        areaChartGroupBy: areaChart.areaChartGroupBy,
        areaChartDisplayValues: areaChart.areaChartDisplayValues,
        areaChartToolbarVisible: areaChart.areaChartToolbarVisible,
    })
);

export const selectLineChartFields = createSelector(
    selectLineChartState,
    (lineChart) => ({
        lineChartSelectedTable: lineChart.lineChartSelectedTable,
        lineChartTitle: lineChart.lineChartTitle,
        lineChartColorX: lineChart.lineChartColorX,
        lineChartColorY: lineChart.lineChartColorY,
        lineChartSorting: lineChart.lineChartSorting,
        lineChartData: lineChart.lineChartData,
        lineChartGroupBy: lineChart.lineChartGroupBy,
        lineChartDisplayValues: lineChart.lineChartDisplayValues,
        lineChartToolbarVisible: lineChart.lineChartToolbarVisible,
    })
);

export const selectBarChartFields = createSelector(
    selectBarChartState,
    (barChart) => ({
        barChartSelectedTable: barChart.barChartSelectedTable,
        barChartTitle: barChart.barChartTitle,
        barChartColorX: barChart.barChartColorX,
        barChartColorY: barChart.barChartColorY,
        barChartSorting: barChart.barChartSorting,
        barChartData: barChart.barChartData,
        barChartGroupBy: barChart.barChartGroupBy,
        barChartDisplayValues: barChart.barChartDisplayValues,
        barChartToolbarVisible: barChart.barChartToolbarVisible,
    })
);

export const selectRadarChartFields = createSelector(
    selectRadarChartState,
    (radarChart) => ({
        radarChartSelectedTable: radarChart.radarChartSelectedTable,
        radarChartTitle: radarChart.radarChartTitle,
        radarChartColor: radarChart.radarChartColor,
        radarChartData: radarChart.radarChartData,
        radarChartToolbarVisible: radarChart.radarChartToolbarVisible,
        radarChartGroupBy: radarChart.radarChartGroupBy,
    })
);

export const selectPieChartFields = createSelector(
    selectPieChartState,
    (pieChart) => ({
        pieChartSelectedTable: pieChart.pieChartSelectedTable,
        pieChartTitle: pieChart.pieChartTitle,
        pieChartColor: pieChart.pieChartColor,
        pieChartLMin: pieChart.pieChartLMin,
        pieChartLMax: pieChart.pieChartLMax,
        pieChartSorting: pieChart.pieChartSorting,
        pieChartData: pieChart.pieChartData,
        pieChartToolbarVisible: pieChart.pieChartToolbarVisible,
        pieChartGroupBy: pieChart.pieChartGroupBy,
    })
);

export const selectScatterChartFields = createSelector(
    selectScatterChartState,
    (scatterChart) => ({
        scatterChartSelectedTable: scatterChart.scatterChartSelectedTable,
        scatterChartData: scatterChart.scatterChartData,
        scatterChartTitle: scatterChart.scatterChartTitle,
        scatterChartColor: scatterChart.scatterChartColor,
        scatterChartGroupBy: scatterChart.scatterChartGroupBy,
        scatterChartDisplayValues: scatterChart.scatterChartDisplayValues,
        scatterChartToolbarVisible: scatterChart.scatterChartToolbarVisible,
    })
);

export const selectComposedChartFields = createSelector(
    selectComposedChartState,
    (composedChart) => ({
        composedChartSelectedTable: composedChart.composedChartSelectedTable,
        composedChartData: composedChart.composedChartData,
        activeDataset: composedChart.activeDataset,
        composedChartTitle: composedChart.composedChartTitle,
        composedChartColorX: composedChart.composedChartColorX,
        composedChartColorY: composedChart.composedChartColorY,
        composedChartColorZ: composedChart.composedChartColorZ,
        composedChartSorting: composedChart.composedChartSorting,
        composedChartGroupBy: composedChart.composedChartGroupBy,
        composedChartDisplayValues: composedChart.composedChartDisplayValues,
        composedChartToolbarVisible: composedChart.composedChartToolbarVisible,
        forecastPeriod: composedChart.forecastPeriod,
        isForecastData: composedChart.isForecastData,
    })
);