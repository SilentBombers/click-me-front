import {AppBar, Toolbar, Typography} from "@mui/material";
import React from "react";

const Nav = () => {
    return <>
        <AppBar position={"static"}>
            <Toolbar sx={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Typography variant={"h4"}>Click Me</Typography>
            </Toolbar>
        </AppBar>
    </>
}

export default Nav;