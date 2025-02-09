"use client";

import {useState, useEffect, useCallback} from "react";
import {
    Box,
    Container,
    Grid,
    ThemeProvider,
    Typography,
    Button,
    TextField,
    useMediaQuery,
} from "@mui/material";
import {createTheme} from "@mui/material/styles";
import {amber, deepOrange} from "@mui/material/colors";
import Nav from "@/components/Nav";
import Ranking from "@/components/Ranking";
import Description from "@/components/Description";
import GenerateCodeTextField from "@/components/GenerateCodeTextField";
import UploadGif from "@/components/UploadGif";
import CodeBlock from "@/components/CodeBlock";
import AreaChart from "@/components/AreaChart";
import {DailyClick, DailyClicksResponse} from "@/app/type/daily-clicks";

const API_BASE_URL = "https://clickme.today";

const theme = createTheme({
    palette: {
        primary: amber,
        secondary: deepOrange,
    },
});

const Page = () => {
    const [svgSiteId, setSvgSiteId] = useState<string>("");
    const [historySiteId, setHistorySiteId] = useState<string>("");
    const [svgUrl, setSvgUrl] = useState<string | null>(null);
    const [displaySvgUrl, setDisplaySvgUrl] = useState<string>("");
    const [rank, setRank] = useState<any[]>([]);
    const [chartData, setChartData] = useState<DailyClick[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchClickHistory = useCallback(async () => {
        if (!historySiteId) return;
        setIsLoading(true);
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/daily-click-count/${historySiteId}`);
            if (!res.ok) throw new Error("Failed to fetch click history");
            const data: DailyClicksResponse = await res.json();
            setChartData(data.clickCountHistories);
        } catch (error) {
            console.error("Error fetching click history:", error);
            setChartData([]);
        } finally {
            setIsLoading(false);
        }
    }, [historySiteId]);

    const generateCode = useCallback((inputValue: string) => {
        if (!inputValue) return;
        setSvgSiteId(inputValue);
        const personalSvgUrl = `${API_BASE_URL}/api/v1/svg-image/increment?name=${inputValue}`;
        setDisplaySvgUrl(personalSvgUrl);
    }, []);

    const fetchRankings = useCallback(async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/rankings/live?startRank=0&endRank=5`);
            if (!res.ok) throw new Error("Failed to fetch rankings");
            const data = await res.json();
            setRank(data);
        } catch (error) {
            console.error("Error fetching rankings:", error);
            setRank([]);
        }
    }, []);

    useEffect(() => {
        fetchRankings();
    }, [fetchRankings]);

    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <ThemeProvider theme={theme}>
            <Nav/>
            <Container fixed>
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Description/>

                    <UploadGif onUpload={(url) => setSvgUrl(url)}/>

                    <GenerateCodeTextField
                        onButtonClick={generateCode}
                        setSiteId={setSvgSiteId}
                        buttonText="Generate"
                    />

                    {displaySvgUrl && svgSiteId && (
                        <Grid
                            container
                            spacing={2}
                            sx={{
                                marginTop: 4,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Grid
                                item
                                xs={12}
                                md={4}
                                sx={{display: "flex", justifyContent: "center"}}
                            >
                                <a href="https://clickme.today/main">
                                    <img
                                        src={`${API_BASE_URL}/api/v1/svg-image?name=${svgSiteId}&svgUrl=${svgUrl}`}
                                        alt="Generated SVG"
                                    />
                                </a>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <CodeBlock
                                    siteText={`<a align="center" href="https://www.github.com/${svgSiteId}">\n  <img src="${displaySvgUrl}" alt="Click Me SVG"/>\n</a>`}
                                />
                            </Grid>
                        </Grid>
                    )}
                    <Ranking rank={rank}/>

                    <Typography
                        variant="h2"
                        sx={{fontWeight: "bold", textAlign: "center", mt: 12}}
                    >
                        Click History
                    </Typography>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            pt: 4,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            md={8}
                            sx={{
                                mb: 5,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                fullWidth
                                InputProps={{
                                    style: {fontSize: 20},
                                    startAdornment: (
                                        <Typography
                                            sx={{fontSize: 20, pl: 2, fontWeight: "medium"}}
                                        >
                                            https://github.com/
                                        </Typography>
                                    ),
                                }}
                                value={historySiteId}
                                onChange={(e) => setHistorySiteId(e.target.value)}
                            />
                            <Button sx={{ml: 1, fontSize: 20}} onClick={fetchClickHistory}>
                                Show
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{display: "flex", justifyContent: "center"}}>
                            {isLoading ? <div>Loading...</div> : <AreaChart data={chartData}/>}
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    );
};

export default Page;
