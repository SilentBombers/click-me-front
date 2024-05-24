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

    const renderRankingItem = (index: number) => (
        <>
            <Grid item xs={2} sx={{
                display: "flex", justifyContent: "flex-end",
                alignItems: "flex-end"
            }}>{index + 1}</Grid>
            <Grid item xs={1}>
                <a href={`https://github.com/${rank[index]?.nickname}`} target="_blank" rel="noopener noreferrer">
                    <Avatar src={rank[index]?.profileImage} />
                </a>
            </Grid>
            <Grid item xs={6}>
                <BorderLinearProgress variant="determinate"
                    value={rank[index]?.count / rank[0]?.count * 100} />
            </Grid>
            <Grid item xs={3}>
                {rank[index]?.count}
            </Grid>
        </>
    );

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
                {rank.slice(0, 5).map((_, index) => renderRankingItem(index))}
            </Grid>
        </>
    );
}

export default Ranking;
