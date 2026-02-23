'use client'
import { useEffect, useState } from "react";
import { Grid, Divider, Typography, List, ListItem } from '@mui/material';

const YEAR = 2025; //brackets for prior season

export default function PlayoffBrackets() {

    const [playoffBracket, setPlayoffBracket] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPlayoffBrackets() {
            try {
                const res = await fetch (`/api/playoffBrackets?year=${YEAR}`);
                if (!res.ok) throw new Error("Failed to fetch brackets");

                const data = await res.json();
                console.log("playoff brackets: ", data)
                setPlayoffBracket(data);
            } catch (err) {
                console.error("Fetch error: ", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPlayoffBrackets();
    }, []);
    
    if (loading) return <Typography>Loading...</Typography>;
    if (!playoffBracket || !playoffBracket.champions) return null;


    return (
        <Grid container>
            <Champion champs={playoffBracket.champions}/>
        </Grid>
        
    )
}


function Champion({ champs }) {

    if (!champs) return null;
    
    return (
        <Typography variant="h4">
            {champs.champion?.teamName || "No champ found" } <br/>
            {champs.toiletChamp.teamName || "No toilet king found"} 
        </Typography>
    );
}


