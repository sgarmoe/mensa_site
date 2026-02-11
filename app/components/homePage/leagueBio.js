//component for league bio on home page

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

export default function Bio() {
    return (
        <Grid container spacing = {10}>
            <Grid 
            size={8} 
            >
                <p1>
                Testing first grid <br/>
                Testing if lines are skipped 
                </p1>   
            </Grid>

             <Divider orientation="vertical" flexItem sx={{ mx: -5 }} />

            <Grid size={4}>
                Testing second grid
            </Grid>
        </Grid>

    )
}