
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from '../../ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../constans/constant';

// chart data
import chartData from './chart-data/total-growth-bar-chart';
import type { RootState } from '../../redux/store';
import PriceFormat from 'ui-component/extended/PriceFormat';



// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading  ,data} : {isLoading: boolean , data: {
    labels : string[],
    series :any[]
  }}) => {
  
    const theme : any = useTheme();
    const customization  = useSelector((state : RootState) => state.custom);
    
    const { mode } = customization;
    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const grey500 = theme.palette.grey[500];

    const primary200 = theme.palette.primary[200];
    const primaryDark = theme.palette.primary.dark;
    const secondaryMain = theme.palette.secondary.main;
    const secondaryLight = theme.palette.secondary.light;

    useEffect(() => {
    
        const newChartData = {
            ...chartData.options,
            colors: [ secondaryMain ,primaryDark],
            xaxis: {
                type: 'category',
                categories: data.labels,
                style: {
                                colors: [primary]
                            },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: [primary]
                    },

                    formatter: function (value : number) {

                        const numberFormat = new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          });
                        return numberFormat.format(value)
                      }
                }
            },
            grid: {
                borderColor: grey200
            },
            tooltip: {
                theme: 'light'
            },
            legend: {
                labels: {
                    colors: grey500
                }
            },
            series: data.series
            
        };

        // do not load chart when loading
        if (!isLoading) {
            ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
        }
    }, [ data.labels , data.series ,mode, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight, grey200, isLoading, grey500]);

    return (
        <>
            {isLoading ? (
                <SkeletonTotalGrowthBarChart />
            ) : (
                // <MainCard>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Grid container direction="column" spacing={1}>
                                        <Grid item>
                                            <Typography variant="h4">Khoản thu & Khoản chi </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5">Thu nhập ròng: <PriceFormat value={ data.series?.[1]?.data - data.series?.[0]?.data || 0 }  /></Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Chart {...chartData} />
                        </Grid>
                    </Grid>
                // </MainCard>
            )}
        </>
    );
};



export default TotalGrowthBarChart;
