'use client'
import "../../globals.css";
import { useEffect, useState } from "react";
import { Grid, Typography, Box } from '@mui/material';
import { Toilet, Trophy } from 'lucide-react';
import  TeamAvatar  from '../general/TeamAvatar.js';

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
        <Box className='container' sx={{  display: 'grid', 
                    gridTemplateColumns: '1fr 1fr',
                    gap: 2,
                    width: '100%', 
                    mt: 4
                    }}>

            {/*container for champion  */} 
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}> 
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'goldenrod'}}>
                    CHAMPION <Trophy color='gold' size={48}/>
                </Typography>
                <Typography variant='h4'>
                    {champs.champion?.teamName || "No champ found" } 
                    
                    <TeamAvatar 
                       avatarId={champs.champion?.avatar}
                       teamName={champs.champion?.teamName}
                       size={45}
                    />
                </Typography>

            </Box>

            {/*container for toilet king */} 
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}> 
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
                    TOILET KING <Toilet  color='brown' size={48}/>
                </Typography>
                <Typography variant='h4' >
                    {champs.toiletChamp.teamName || "No toilet king found"} 

                      <TeamAvatar 
                       avatarId={champs.toiletChamp?.avatar}
                       teamName={champs.toiletChamp?.teamName}
                       size={45}
                    />
                    
                </Typography>
            </Box>
        </Box>
    );
}


