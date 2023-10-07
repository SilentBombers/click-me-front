import React from "react";
import {Grid, Paper, Typography} from "@mui/material";
import CopyToClipboardButton from "@/components/CopyToClipboardButton";

interface PropType {
    siteText: string;
}

const CodeBlock = (props: PropType) => {
    const {siteText} = props

    return (
        <>
            <Paper sx={{backgroundColor: "#282a36", borderRadius: 5}}>
                <Typography color={"white"} variant={"h6"} sx={{p: 3, pb: 0}}>
                    {siteText}
                </Typography>
                <Grid container sx={{
                    direction: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    p: 2,
                    pt: 1,
                }}>
                    {/*<Button variant="contained" size="medium" sx={{borderRadius: 2, fontWeight: "bold",}}> Copy</Button>*/}
                    <CopyToClipboardButton siteText={siteText}></CopyToClipboardButton>
                </Grid>
            </Paper>
        </>
    );
}

export default CodeBlock;