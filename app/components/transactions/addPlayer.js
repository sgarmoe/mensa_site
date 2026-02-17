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

    const avatarId = tx.team_avatar || tx.avatar;

    const avatarUrl = avatarId?.startsWith('http')
        ? avatarId
        : `https://sleepercdn.com/avatars/thumbs/${avatarId}`;

    const handleImageError = (e) => {
        e.target.src = "https://sleepercdn.com";
        e.target.onerror = null;
  }


  //THIS FUCKS UP THE DISPLAY 
  
//   return (
//     <img
//         src={avatarUrl || "https.//sleepercdn.com"}
//         alt={`${tx.team_name} avatar`}
//         onError={handleImageError}
//         style={{ width: '25px', height: '25px', borderRadius: '50%' }}
//     />

//   )
 }