"use client"
import {Box, Button, Container, Grid, TextField, ThemeProvider, Typography} from "@mui/material";
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
        '<a align="center" href="https://www.github.com/YourId">' + '<img src="https://clickme.today/api/clicks/count?id=YourId"/>' + '</a>')
    const generateCode = () => {
        setSiteText('<a align="center" href="https://www.github.com/' + siteId + '">' + '<img src="https://clickme.today/api/clicks/count?id=' + siteId + '"/>' + '</a>')
    }

    const [rank, setRank] = useState<Rank[]>([])

    const [chartId, setChartId] = useState<string>("YourId");
    const [charData, setChartData] = useState<DailyClicks[]>(data);

    //TODO 여기를 고치시오.
    const generateChart = () => {
        //주석을 해제하고 밑에 주소를 바꾸면 됩니다.
        // fetch(`https://clickme.today/api/clicks/realtime?` + chartId)
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             setChartData(result as DailyClicks[]);
        //         }
        //     )
    }

    useEffect(() => {
        const s = new URLSearchParams({
            startRank: "1",
            endRank: "5",
        }).toString();

        fetch(`https://clickme.today/api/clicks/realtime?` + s)
            .then(res => res.json())
            .then(
                (result) => {
                    setRank(result as Rank[]);
                }
            )
    }, [])

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
                    <Grid item xs={1.5} sx={{pt: 2}}></Grid>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={4} sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <a href={"https://clickme.today/main"}><img
                                src={"http://localhost:8080/api/clicks/count?id=123"}/></a>
                        </Grid>
                        <Grid item xs={6}>
                            <CodeBlock siteText={siteText}/>
                        </Grid>
                        <Grid item xs={1}></Grid>
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
                    alignItems: "center"
                }}>
                    <Grid item xs={8} sx={{mb: 5}}>
                        <TextField fullWidth
                                   InputProps={{
                                       style: {fontSize: 25},
                                       startAdornment: <Typography sx={{
                                           fontSize: 30,
                                           pl: 2,
                                           fontWeight: 'medium'
                                       }}>https://github.com/</Typography>,
                                       placeholder: "YourId",
                                       endAdornment: <Button sx={{
                                           height: "50px",
                                           fontSize: 30,
                                           fontWeight: "bold",
                                           mr: 1,
                                           minWidth: "120px",
                                           justifyContent: "center",
                                       }} onClick={generateChart}>Show</Button>,
                                   }}
                                   onChange={(e) => setChartId(e.target.value)}
                        ></TextField>
                    </Grid>
                    <AreaChart data={data}/>
                </Grid>
            </Container>
        </ThemeProvider>
    </>
}

export default Page;

const data: DailyClicks[] = [
    {
        "date": "2023-11-09",
        "clicks": 27
    },
    {
        "date": "2023-11-10",
        "clicks": 202
    },
    {
        "date": "2023-11-11",
        "clicks": 155
    },
    {
        "date": "2023-11-12",
        "clicks": 219
    },
    {
        "date": "2023-11-13",
        "clicks": 185
    },
    {
        "date": "2023-11-14",
        "clicks": 209
    },
    {
        "date": "2023-11-15",
        "clicks": 226
    },
    {
        "date": "2023-11-15",
        "clicks": 84
    },
]
