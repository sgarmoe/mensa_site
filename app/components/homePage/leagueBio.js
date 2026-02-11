//component for league bio on home page

import Grid from '@mui/material/Grid';

export default function Bio() {
    return (
        <Grid container spacing = {10}>
            <Grid 
            size={8} 
            sx = {{
                borderRight: 'var(--Grid-borderWidth solid',
                borderColor: 'divider',
            }}>
                <p1>
                Testing first grid <br/>
                Testing if lines are skipped 
                </p1>
            </Grid>
            <Grid size={4}>
                Testing second grid
            </Grid>
        </Grid>

    )
}