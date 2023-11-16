import {LineChart} from '@mui/x-charts/LineChart';
import {DailyClicks} from "@/app/type/daily-clicks";

type PropType = {
    data: DailyClicks[]
}

export default function AreaChart(props: PropType) {
    const {data} = props;
    return (
        <LineChart
            width={800}
            height={400}
            series={[{data: data.map(it => it.clicks), label: 'daily clicks', area: true, showMark: false}]}
            xAxis={[{scaleType: 'point', data: data.map(it => it.date)}]}
            sx={{
                '.MuiLineElement-root': {
                    display: 'none',
                },
            }}
        />
    );
}