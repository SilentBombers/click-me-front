"use client"
import { Box, Button, Container, Grid, TextField, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createTheme } from "@mui/material/styles";
import { amber, deepOrange } from "@mui/material/colors";
import Nav from "@/components/Nav";
import CodeBlock from "@/components/CodeBlock";
import Ranking from "@/components/Ranking";
import { Rank } from "@/app/type/ranking";
import Description from "@/components/Description";
import GenerateCodeTextField from "@/components/GenerateCodeTextField";
import AreaChart from "@/components/AreaChart";
import {DailyClick, DailyClicksResponse} from "@/app/type/daily-clicks";

const theme = createTheme({
    palette: {
        primary: amber,
        secondary: deepOrange,
    },
});

const Page = () => {
    const [siteId, setSiteId] = useState<string>("");
    const [siteText, setSiteText] = useState<string>(
        '<a align="center" href="https://www.github.com/YourId">' +
        '<img src="https://clickme.today/api/v1/svg-image/increment?name=YourId"/>' +
        '</a>'
    );

    const generateCode = () => {
        setSiteText(
            '<a align="center" href="https://www.github.com/' + siteId + '">' +
            '<img src="https://clickme.today/api/v1/svg-image/increment?name=' + siteId + '"/>' +
            '</a>'
        );
    }

    const [rank, setRank] = useState<Rank[]>([]);
    const [chartId, setChartId] = useState<string>("YourId");
    const [chartData, setChartData] = useState<DailyClick[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const transformApiResponse = (apiResponse: DailyClicksResponse): DailyClick[] => {
        return apiResponse.clickCountHistories.map(item => ({
            date: item.date,
            clickCount: item.clickCount,
        }));
    }

    const generateChart = () => {
        setIsLoading(true);
        fetch(`https://clickme.today/api/v1/daily-click-count/${chartId}`)
            .then(res => res.json())
            .then((result: DailyClicksResponse) => {
                const formattedData = transformApiResponse(result);
                setChartData(formattedData);
                setIsLoading(false);
            }).catch(() => {
                setIsLoading(false);
            });
    }

    useEffect(() => {
        const s = new URLSearchParams({
            startRank: "0",
            endRank: "5",
        }).toString();

        fetch(`https://clickme.today/api/v1/rankings/live?${s}`)
            .then(res => res.json())
            .then((result) => {
                setRank(result as Rank[]);
            });
    }, []);

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        generateChart();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Nav />
            <Container fixed>
                <Box sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Description />
                    <GenerateCodeTextField
                        onButtonClick={generateCode}
                        setSiteId={setSiteId}
                        buttonText="Generate"
                    />
                    <Grid item xs={12} sx={{ pt: 2 }}></Grid>
                    <Grid container spacing={isSmallScreen ? 2 : 4}>
                        <Grid item xs={12} md={4} sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <a href="https://clickme.today/main">
                                <img src={`https://clickme.today/api/v1/svg-image?name=${siteId}`} />
                            </a>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <CodeBlock siteText={siteText} />
                        </Grid>
                        <Grid item xs={false} md={1}></Grid>
                    </Grid>
                </Box>
                <Ranking rank={rank || []} />
                <Typography variant="h2" sx={{ fontWeight: 'bold', textAlign: 'center', mt: 12 }}>
                    Click History
                </Typography>
                <Grid container spacing={1} sx={{
                    pt: 4,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: isSmallScreen ? "column" : "row",
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
                        }} className="responsive-button" onClick={generateChart}>
                            Show
                        </Button>
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                        {isLoading ? <div>Loading...</div> : <AreaChart data={chartData} />}
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default Page;
