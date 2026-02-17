//component to display player added from waiver wire/FA

import { Grid, Divider, Typography, List, ListItem } from '@mui/material';

export default function AddPlayer({ tx }) {
    return (
        <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', px: 0}} >
            <Typography variant="subtitle2" color="primary">
                {tx.type} - {new Date(tx.timestamp).toLocaleDateString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                Team: {tx.team_name.teamName}
            </Typography>

            {tx.adds.map((a, idx) => (
                <Typography key={idx} variant="caption" display="block" sx={{ color: 'success.main' }}>
                    + {a.player}
                    <Avatar tx= {tx}/>
                    <p1>${tx.team_name?.avatar}</p1>
                </Typography>
                

            ))}
            {tx.drops.map((d, idx) => (
                <Typography key={idx} variant="caption" display="block" sx={{ color: 'error.main' }}>
                    - {d.player}
                </Typography>
            ))}
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
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
    </div> 
  )
 }