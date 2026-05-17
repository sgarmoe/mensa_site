import { Divider, Typography, Stack, Box, Paper } from '@mui/material';
import TeamAvatar from '../general/TeamAvatar.js';

export default function AddPlayer({ tx }) {
    return (
        <Paper
            elevation={2}
            sx={{
                borderRadius: 2,
                p: 2,
                mb: 2,
                width: '100%',
                overflow: 'hidden'
            }}>

            <Stack
                direction="row"
                sx={{
                    width: '100%',
                    justifyContent: "space-between",
                    alignItems: 'center',
                    mb: 1
                }}>
                <Typography color="primary" variant="h6" fontWeight={500}>
                    {tx.type} - {tx.team_name}
                </Typography>
                <TeamAvatar avatarId={tx.avatar} teamName={tx.team_name} size={35} />
            </Stack>

            <Divider sx={{ width: '100%', mb: 1.5 }} />

            <Stack direction="column" spacing={0.5} sx={{ mb: 1.5 }}>
                {tx.adds.map((a, idx) => (
                    <Typography key={idx} variant="body2" sx={{ color: 'success.main' }}>
                        + {a.player}
                    </Typography>
                ))}
                {tx.drops.map((d, idx) => (
                    <Typography key={idx} variant="body2" sx={{ color: 'error.main' }}>
                        - {d.player}
                    </Typography>
                ))}
            </Stack>

            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography variant="caption" display="block">
                    {new Date(tx.timestamp).toLocaleString(undefined, {
                        dateStyle: 'short',
                        timeStyle: 'short'
                    })}
                </Typography>
            </Box>
        </Paper>
    );
}
