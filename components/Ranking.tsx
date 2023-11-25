import React from "react";
import {Avatar, Grid, LinearProgress, linearProgressClasses, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import {Rank} from "@/app/type/ranking";

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 12,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? 'rgba(242, 162, 41)' : 'rgba(242, 162, 41)',
    },
}));

interface PropType {
    rank: Rank[];
}

const Ranking = (props: PropType) => {
    const {rank} = props;

    return (
        <>
            <Typography variant={"h2"} sx={{fontWeight: 'bold', textAlign: 'center', mt: 8}}>
                Ranking
            </Typography>
            <Grid container spacing={1} sx={{
                pt: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Grid item xs={2} sx={{
                    display: "flex", justifyContent: "flex-end",
                    alignItems: "flex-end"
                }}>1</Grid>
                <Grid item xs={1}><Avatar
                    src={rank[0]?.profileImage}/>
                </Grid>
                <Grid item xs={6}><BorderLinearProgress variant="determinate"
                                                        value={rank[0]?.count / rank[0]?.count * 100}/> </Grid>
                <Grid item xs={3}> {rank[0]?.count}</Grid>
                <Grid item xs={2} sx={{
                    display: "flex", justifyContent: "flex-end",
                    alignItems: "flex-end"
                }}>2</Grid>
                <Grid item xs={1}><Avatar
                    src={rank[1]?.profileImage}/>
                </Grid>
                <Grid item xs={6}><BorderLinearProgress variant="determinate"
                                                        value={rank[1]?.count / rank[0]?.count * 100}/> </Grid>
                <Grid item xs={3}> {rank[1]?.count}</Grid>
                <Grid item xs={2} sx={{
                    display: "flex", justifyContent: "flex-end",
                    alignItems: "flex-end"
                }}>3</Grid>
                <Grid item xs={1}><Avatar alt="Remy Sharp"
                                          src={rank[2]?.profileImage}/>
                </Grid>
                <Grid item xs={6}><BorderLinearProgress variant="determinate"
                                                        value={rank[3]?.count / rank[0]?.count * 100}/> </Grid><Grid
                item
                xs={3}> {rank[2]?.count}</Grid>
                <Grid item xs={2} sx={{
                    display: "flex", justifyContent: "flex-end",
                    alignItems: "flex-end"
                }}>4</Grid>
                <Grid item xs={1}><Avatar src={rank[3]?.profileImage}/>
                </Grid>
                <Grid item xs={6}><BorderLinearProgress variant="determinate"
                                                        value={rank[3]?.count / rank[0]?.count * 100}/> </Grid><Grid
                item
                xs={3}> {rank[3]?.count}</Grid>
            </Grid>
        </>
    );
}

export default Ranking;