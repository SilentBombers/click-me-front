import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { DailyClicks } from "@/app/type/daily-clicks";
import { useTheme, useMediaQuery } from "@mui/material";

type PropType = {
    data: DailyClicks[]
}

export default function AreaChart(props: PropType) {
    const { data } = props;
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <LineChart
            width={isSmallScreen ? 300 : 800}
            height={isSmallScreen ? 200 : 400}
            series={[{
                data: data.map(it => it.clickCount),
                label: 'daily clicks',
                area: true,
                showMark: false
            }]}
            xAxis={[{
                scaleType: 'point',
                data: data.map(it => it.date)
            }]}
            sx={{
                margin: 'auto'
            }}
        />
    );
}
