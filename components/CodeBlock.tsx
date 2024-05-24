import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";

interface PropType {
    siteText: string;
}

const CodeBlock = (props: PropType) => {
    const { siteText } = props;

    return (
        <Paper sx={{ backgroundColor: "#282a36", borderRadius: 5, p: 3 }}>
            <Typography color="white" variant="h6" sx={{ pb: 0 }}>
                {siteText}
            </Typography>
            <Grid container sx={{ justifyContent: "flex-end", alignItems: "center", pt: 1 }}>
                <CopyToClipboardButton siteText={siteText} />
            </Grid>
        </Paper>
    );
};

export default CodeBlock;
