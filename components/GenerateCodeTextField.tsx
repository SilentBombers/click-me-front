import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)(({ theme }) => ({
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

const ResponsiveButton = styled(Button)(({ theme }) => ({
    color: "rgba(242, 162, 41)",
    height: "60px",
    fontSize: 30,
    fontWeight: "bold",
    marginRight: theme.spacing(2),
    minWidth: "180px",
    justifyContent: "center",
    [theme.breakpoints.down('sm')]: {
        fontSize: 20,
        minWidth: "140px",
    },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
    fontSize: 40,
    paddingLeft: theme.spacing(2),
    fontWeight: 'medium',
    [theme.breakpoints.down('sm')]: {
        fontSize: 25,
    },
}));

interface PropType {
    onButtonClick?: () => void;
    setSiteId?: (s: string) => void;
    buttonText: string;
}

const GenerateCodeTextField = (props: PropType) => {
    const { onButtonClick, setSiteId, buttonText } = props;

    return (
        <Grid container sx={{ pt: 8, justifyContent: "center" }}>
            <Grid item xs={10} sx={{ pt: 2, pb: 2 }}>
                <StyledTextField
                    fullWidth
                    InputProps={{
                        startAdornment: <ResponsiveTypography>https://github.com/</ResponsiveTypography>,
                        placeholder: "YourId",
                        endAdornment: (
                            <ResponsiveButton onClick={onButtonClick} aria-label="generate code">
                                {buttonText}
                            </ResponsiveButton>
                        ),
                    }}
                    variant="outlined"
                    onChange={(e) => {
                        setSiteId?.(e.target.value);
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default GenerateCodeTextField;
