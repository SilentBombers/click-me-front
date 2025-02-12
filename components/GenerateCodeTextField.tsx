import { Button, Grid, TextField, Typography } from "@mui/material";
import React, {useState} from "react";
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
    onButtonClick?: (value: string) => void;
    setSiteId?: (s: string) => void;
    buttonText: string;
}

const GenerateCodeTextField = (props: PropType) => {
  const { onButtonClick, setSiteId, buttonText } = props;
  const [localInput, setLocalInput] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalInput(e.target.value);
  };

    const handleClick = () => {
        // 업데이트 후 바로 localInput 값을 부모에 전달
        if (setSiteId) {
            setSiteId(localInput);
        }
        if (onButtonClick) {
            onButtonClick(localInput);
        }
    };

  return (
    <Grid container sx={{ pt: 8, justifyContent: "center" }}>
      <Grid item xs={10} sx={{ pt: 2, pb: 2 }}>
        <StyledTextField
          fullWidth
          value={localInput}
          onChange={handleChange}
          placeholder="YourId"
          InputProps={{
            startAdornment: <ResponsiveTypography>https://github.com/</ResponsiveTypography>,
            endAdornment: (
              <ResponsiveButton onClick={handleClick} aria-label="generate code">
                {buttonText}
              </ResponsiveButton>
            ),
          }}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default GenerateCodeTextField;
