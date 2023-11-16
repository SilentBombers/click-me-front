import {Grid, Typography} from "@mui/material";
import React from "react";

const Description = () => {

    return (
        <>
            <Grid item xs={12} sx={{pt: 2, pb: 4}}>
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
        </>
    );
}

export default Description;