"use client"
import {Box, Button, Container, Grid, TextField, ThemeProvider, Typography, useMediaQuery} from "@mui/material";
import React, {useEffect, useState} from "react";
import {createTheme} from "@mui/material/styles";
import {amber, deepOrange} from "@mui/material/colors";
import Nav from "@/components/Nav";
import CodeBlock from "@/components/CodeBlock";
import Ranking from "@/components/Ranking";
import {Rank} from "@/app/type/ranking";
import Description from "@/components/Description";
import GenerateCodeTextField from "@/components/GenerateCodeTextField";
import AreaChart from "@/components/AreaChart";
import {DailyClicks} from "@/app/type/daily-clicks";

const theme = createTheme({
    palette: {
        primary: amber,
        secondary: deepOrange,
    },
});

const Page = () => {
    const [siteId, setSiteId] = useState<string>("");
    const [siteText, setSiteText] = useState<string>(
        '<a align="center" href="https://www.github.com/YourId">' + '<img src="https://clickme.today/api/v1/svg-image/increment?name=YourId"/>' + '</a>')
    const generateCode = () => {
        setSiteId(siteId)
        setSiteText('<a align="center" href="https://www.github.com/' + siteId + '">' + '<img src="https://clickme.today/api/v1/svg-image/increment?name=' + siteId + '"/>' + '</a>')
    }

    const [rank, setRank] = useState<Rank[]>([])

    const [chartId, setChartId] = useState<string>("YourId");
    const [chartData, setChartData] = useState<DailyClicks[]>();

    const generateChart = () => {
        fetch(`https://clickme.today/api/v1/daily-click-count/` + chartId)
            .then(res => res.json())
            .then(
                (result) => {
                    setChartData(result as DailyClicks[]);
                }
            )
    }

    useEffect(() => {
        const s = new URLSearchParams({
            startRank: "0",
            endRank: "4",
        }).toString();

        fetch(`https://clickme.today/api/v1/rankings/live?` + s)
            .then(res => res.json())
            .then(
                (result) => {
                    setRank(result as Rank[]);
                }
            )
    }, [])

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return <>
        <ThemeProvider theme={theme}>
            <Nav></Nav>
            <Container fixed>
                <Box sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Description/>
                    <GenerateCodeTextField onButtonClick={generateCode} setSiteId={setSiteId} buttonText={"Generate"}/>
                    <Grid item xs={12} sx={{pt: 2}}></Grid>
                    <Grid container spacing={isSmallScreen ? 2 : 4}>
                        <Grid item xs={12} md={4} sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <a href={"https://clickme.today/main"}><img
                                src={"https://clickme.today/api/v1/svg-image?name=" + siteId}/></a>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CodeBlock siteText={siteText}/>
                        </Grid>
                        <Grid item xs={false} md={1}></Grid>
                    </Grid>
                </Box>
                <Ranking rank={rank || []}></Ranking>
                <Typography variant={"h2"} sx={{fontWeight: 'bold', textAlign: 'center', mt: 12}}>
                    Click History
                </Typography>
                <Grid container spacing={1} sx={{
                    pt: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: isSmallScreen ? "column" : "row"
                }} className="responsive-container">
                    <Grid item xs={12} md={8} sx={{mb: 5, display: 'flex', flexDirection: isSmallScreen ? "column" : "row"}}>
                        <TextField fullWidth
                                   className="responsive-textfield"
                                   InputProps={{
                                       style: {fontSize: isSmallScreen ? 20 : 25},
                                       startAdornment: <Typography sx={{
                                           fontSize: isSmallScreen ? 20 : 30,
                                           pl: 2,
                                           fontWeight: 'medium'
                                       }}>https://github.com/</Typography>,
                                   }}
                                   onChange={(e) => setChartId(e.target.value)}
                        />
                        <Button sx={{
                            height: "50px",
                            fontSize: isSmallScreen ? 20 : 30,
                            fontWeight: "bold",
                            ml: isSmallScreen ? 0 : 1,
                            mt: isSmallScreen ? 1 : 0,
                            minWidth: "120px",
                            justifyContent: "center",
                        }} className="responsive-button" onClick={generateChart}>Show</Button>
                    </Grid>
                    <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <AreaChart data={chartData == undefined ? data : chartData} />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    </>
}

export default Page;

const data: DailyClicks[] = [
    {
        "date": "2023-11-09",
        "clickCount": 27
    },
    {
        "date": "2023-11-10",
        "clickCount": 202
    },
    {
        "date": "2023-11-11",
        "clickCount": 155
    },
    {
        "date": "2023-11-12",
        "clickCount": 219
    },
    {
        "date": "2023-11-13",
        "clickCount": 185
    },
    {
        "date": "2023-11-14",
        "clickCount": 209
    },
    {
        "date": "2023-11-15",
        "clickCount": 226
    },
    {
        "date": "2023-11-15",
        "clickCount": 84
    },
]
