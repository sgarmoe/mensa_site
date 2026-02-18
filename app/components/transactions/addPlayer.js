//component to display player added from waiver wire/FA

import { Grid, Divider, Typography, List, ListItem, Stack, Box, Paper } from '@mui/material';

export default function AddPlayer({ tx }) {
    return (
        <Paper
            elevation={2}
            sx={{ borderRadius: 2,
                p: 2,
                mb: 2,
                width: '100%',
                overflow: 'hidden'
            }} >
            
                <Stack 
                direction="row" 
                sx={{ 
                    width: '100%', 
                    justifyContent: "space-between",
                    alignItems:'center',
                    typography: 'body1',
                    fontWeight: '500',
                    fontSize: 'h6.fontSize',
                    mb: 1
                    }}>
                    <Typography color="primary">
                        {tx.type} - {tx.team_name.teamName}
                    </Typography>
                    <Avatar tx= {tx}/>
                </Stack>

                <Divider sx={{ width: '100%', mb: 1.5 }}/>

                <Stack direction="row" 
                spacing={0.5} 
                sx={{ 
                    mb: 1.5,
                    }}> 
                    {tx.adds.map((a, idx) => (
                        <Typography key={idx} variant="caption" display="block" sx={{ color: 'success.main' }}>
                            + {a.player}
                        </Typography>
                    ))}
                    {tx.drops.map((d, idx) => (
                        <Typography key={idx} variant="caption" display="block" sx={{ color: 'error.main' }}>
                            - {d.player}
                        </Typography>
                ))}
                </Stack>

                <Box
                sx={{
                    width: '100%',
                    textAlign: 'center'
                }}>
                    <Typography variant="caption" display="block"
                    > 
                        {new Date(tx.timestamp).toLocaleString(undefined, {
                            dateStyle: 'short',
                            timeStyle: 'short'
                        }

                        )}
                    </Typography>
                </Box>
        </Paper>
    );
}

function Avatar ({ tx }) {

    const rawAvatar = tx.team_name?.avatar;

    const avatarUrl = rawAvatar.startsWith('http')
        ? rawAvatar
        : rawAvatar
            ?   `https://sleepercdn.com/avatars/thumbs/${rawAvatar}`
            :   `https://sleepercdn.com`

    const handleImageError = (e) => {
        e.target.src = "https://sleepercdn.com";
        e.target.onerror = null;
  }
  
  return (
    <div>
        <img
            src={avatarUrl}
            alt={`${tx.team_name?.teamName || 'Team' } avatar`}
            onError={handleImageError}
            style={{ width: '35px', height: '35px', borderRadius: '50%' }}
        />
    </div> 
  )
 }