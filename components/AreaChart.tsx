import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { DailyClick } from "@/app/type/daily-clicks";
import { useTheme, useMediaQuery } from "@mui/material";

type PropType = {
  data: DailyClick[];
}

export default function AreaChart({ data }: PropType) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const seriesData = data && data.length > 0 ? data.map(item => item.clickCount) : [0];
  const xAxisData = data && data.length > 0 ? data.map(item => item.date) : [''];

  return (
    <LineChart
      width={isSmallScreen ? 300 : 800}
      height={isSmallScreen ? 200 : 400}
      series={[{
        data: seriesData,
        label: 'daily clicks',
        area: true,
        showMark: false
      }]}
      xAxis={[{
        scaleType: 'point',
        data: xAxisData
      }]}
      sx={{
        margin: 'auto'
      }}
    />
  );
}
