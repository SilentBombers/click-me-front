"use client"
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    InputBase,
    Paper, Slider,
    TextField,
    Toolbar,
    styled,
    Typography,
    ThemeProvider
} from "@mui/material";
import React, {useState} from "react";
import {createTheme} from "@mui/material/styles";
import {amber, deepOrange, orange} from "@mui/material/colors";
import Nav from "@/components/Nav";


const StyledTextField = styled(TextField)(({theme}) => ({
    '& .MuiOutlinedInput-root': {
        // border: `2px solid rgba(242, 162, 41)`,
        // borderRadius: 50,
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
            // borderRadius: 30,// 포커스 시 변경할 border 색상 설정
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
    const [isFocused, setIsFocused] = useState(false);
    return <>
        <ThemeProvider theme={theme}>
            <Nav></Nav>
        <Container fixed sx={{borderColor: "red"}}>
            <Box sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderColor: "primary.main",
                border: 1
            }}>
                <Grid item xs={12} sx={{pt: 2, pb: 2, borderColor: "primary.main", border: 1}}>
                    <Typography variant={"h1"}>
                        Add Click Me to Your Site
                    </Typography>
                </Grid>
                <Grid container sx={{pt: 8, justifyContent: "center",}}>
                    <Grid item xs={10} sx={{pt: 2, pb: 2}}>
                        {/*<CssTextField></CssTextField>*/}
                        <StyledTextField
                            fullWidth
                            InputProps={{
                                endAdornment: <Button sx={{color: "rgba(242, 162, 41)"}}>Generate</Button>,
                            }}
                            label={"hello"}
                            variant="outlined">
                        </StyledTextField>
                        <TextField label="메롱" variant="outlined"></TextField>
                    </Grid>
                </Grid>
                {/*이미지 박스*/}
                <Grid item xs={1.5} sx={{pt: 2}}>
                    <Paper variant="outlined">
                        <img src="http://clickme.today:8080/test1/justImage"/>
                    </Paper>
                </Grid>
            </Box>

        </Container>
        </ThemeProvider>

    </>
}


export default Page;