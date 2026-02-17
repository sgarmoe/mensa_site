//component to display player added from waiver wire/FA

import { Grid, Divider, Typography, List, ListItem, Stack, Box } from '@mui/material';

export default function AddPlayer({ tx }) {
    return (
        <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', px: 0, py: 1}} >
            
                <Stack direction="row" alignItems="center" spacing={1} sx={{ width: '100%', mb: 0.5 }}>
                    <Typography variant="subtitle2" color="primary">
                        {tx.type} - {tx.team_name.teamName}
                    </Typography>
                    <Avatar tx= {tx}/>
                </Stack>

                <Box sx={{  }}> 
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
                </Box>

                <Box alignItems="center">
                    <Typography variant="body1"> 
                        {new Date(tx.timestamp).toLocaleDateString()}
                    </Typography>
                </Box>

        </ListItem>
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