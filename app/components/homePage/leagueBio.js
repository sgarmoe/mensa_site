import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export default function Bio() {
    return (
        <Grid container spacing = {12}>
            <Grid 
            size={8} 
            >

                <h2>MENSA</h2>
                <p1>
                Welcome to the home page for the dynasty fantasy football league, MENSA! 

                <br/>
                <br/>
                Founded in 2023 as a desperate attempt to get an ever-elusive dopamine hit from fantasy football, 
                this league consists of 12 friends who are in it for the love of the game. Some of us seek satisfaction through winning
                now, while some (see: toilet bowl champion) prefer to build over long periods for many seasons of success.
                <br/><br/>

                While we are not the real MENSA, the confusion is understandable. Many a stray soul have encountered our members
                and been astounded at the collective intellect. Our league may be young, but we are mighty! 

                </p1>   

            </Grid>

             <Divider orientation="vertical" flexItem sx={{ mx: -5 }} />

            <Grid size={3}>
                Testing second grid
                //will contain recent TX
            </Grid>
        </Grid>
    )
}