import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import React from "react";

const Nav = () => {
    return <>
        <Container maxWidth="xl">
            <AppBar position={"static"} elevation={0} sx={{
                backgroundColor: "white",
                borderRadius: 10,
                mt: 3,
                minHeight: 80,
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
            }}>
                <Toolbar sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: 'center',
                    alignItems: "center"
                }}>
                    <Typography variant={"h4"} sx={{color: "#ffc107", fontWeight: 'bold'}}>Click Me</Typography>
                </Toolbar>
            </AppBar>
        </Container>
    </>
}

export default Nav;