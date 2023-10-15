"use client"
import {
    Box,
    Button,
    Container,
    Grid,
    Paper,
    TextField,
    Typography,
    ThemeProvider
} from "@mui/material";
import React, {useState} from "react";
import {createTheme, styled} from "@mui/material/styles";
import {amber, deepOrange} from "@mui/material/colors";
import Nav from "@/components/Nav";
import CodeBlock from "@/components/CodeBlock";


const StyledTextField = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        height: "80px",
        fontSize: 35,
        '& fieldset': {
            border: `5px solid rgba(242, 162, 41, 0.5)`, // 기본 border 색상 설정
            borderRadius: 50,
            transition: 'border-color 0.3s ease',
        },
        '&:hover fieldset': {
            border: `5px solid rgba(242, 162, 41)`, // 호버 시 변경할 border 색상 설정
        },
        '&.Mui-focused fieldset': {
            border: `5px solid rgba(242, 162, 41)`,
        },
    },
}));


const theme = createTheme({
    palette: {
        primary: amber,
        secondary: deepOrange,
    },
});

const Page = () => {
    const [siteUrl, setSiteUrl] = useState<string>("");
    const [siteText, setSiteText] = useState<string>(
        '<a align="center" href="https://www.github.com/YourId">' + '<img src="https://clickme.today/api/clicks/count?id=YourId"/>' + '</a>')
    const generateCode = () => {
        setSiteText('<a align="center" href="' + siteUrl + '">' + '<img src="https://clickme.today/api/clicks/count?id=' + siteUrl + '"/>' + '</a>')
    }

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
                    <Grid item xs={12} sx={{pt: 2, pb: 3}}>
                        <Typography variant={"h1"} sx={{fontWeight: 'bold'}}>
                            Add Click Me to
                        </Typography>
                        <Typography variant={"h1"} sx={{fontWeight: 'bold', textAlign: 'center'}}>
                            Your readme
                        </Typography>
                    </Grid>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <Typography variant={"h4"} sx={{textAlign: 'center'}}>
                                Add Click Me. Make your friends to click your Click Me. </Typography>
                            <Typography variant={"h4"} sx={{textAlign: 'center'}}> How to start? Just add this
                                simple
                                code in your readme.</Typography>
                        </Grid>
                    </Grid>
                    <Grid container sx={{pt: 8, justifyContent: "center",}}>
                        <Grid item xs={10} sx={{pt: 2, pb: 2}}>
                            <Typography variant={"h6"} sx={{textAlign: 'center', pb: 1}}> Copy and paste your site's URL</Typography>
                            <StyledTextField
                                fullWidth
                                InputProps={{
                                    placeholder: "https://github.com/YourId",
                                    endAdornment: <Button sx={{
                                        color: "rgba(242, 162, 41)",
                                        height: "60px",
                                        fontSize: 30,
                                        fontWeight: "bold",
                                        mr: 2,
                                        minWidth: "180px",
                                        justifyContent: "center",
                                    }}
                                                          onClick={generateCode}>Generate</Button>,
                                }}
                                variant="outlined"
                                onChange={(e) => {
                                    setSiteUrl(e.target.value)
                                }}
                            >
                            </StyledTextField>
                        </Grid>
                    </Grid>
                    <Grid item xs={1.5} sx={{pt: 2}}>
                    </Grid>
                    <Grid container>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={4} sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                                <a href={"https://clickme.today/main"}><img
                                    src={"https://clickme.today/api/clicks/count?id=" + siteUrl}/></a>
                        </Grid>
                        <Grid item xs={6}>
                            <CodeBlock siteText={siteText}/>
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </Box>
            </Container>
        </ThemeProvider>
    </>
}

export default Page;