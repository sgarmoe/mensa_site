import { Divider, Typography, Stack, Box, Paper } from '@mui/material';
import TeamAvatar from '../general/TeamAvatar.js';

export default function AddPlayer({ tx }) {
    const timestamp = tx.timestamp
        ? new Date(tx.timestamp).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })
        : '';

    if (tx.type === "Trade") {
        return (
            <Paper elevation={2} sx={{ borderRadius: 2, p: 2, mb: 2, width: '100%', overflow: 'hidden' }}>
                <Typography color="primary" variant="h6" fontWeight={500} sx={{ mb: 1 }}>
                    Trade
                </Typography>
                <Divider sx={{ width: '100%', mb: 1.5 }} />
                <Stack direction="column" spacing={1} sx={{ mb: 1.5 }}>
                    {(tx.sides || []).map((side, i) => (
                        <Box key={side.roster_id || i}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                                <TeamAvatar avatarId={side.avatar} teamName={side.team_name} size={24} />
                                <Typography variant="body2" fontWeight={600}>{side.team_name} received:</Typography>
                            </Stack>
                            {side.received.map((item, idx) => (
                                <Typography key={idx} variant="body2" sx={{ color: 'primary.main', pl: 4 }}>
                                    + {item}
                                </Typography>
                            ))}
                        </Box>
                    ))}
                </Stack>
                <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Typography variant="caption" display="block">{timestamp}</Typography>
                </Box>
            </Paper>
        );
    }

    return (
        <Paper elevation={2} sx={{ borderRadius: 2, p: 2, mb: 2, width: '100%', overflow: 'hidden' }}>
            <Stack direction="row" sx={{ width: '100%', justifyContent: "space-between", alignItems: 'center', mb: 1 }}>
                <Typography color="primary" variant="h6" fontWeight={500}>
                    {tx.type} - {tx.team_name}
                </Typography>
                <TeamAvatar avatarId={tx.avatar} teamName={tx.team_name} size={35} />
            </Stack>

            <Divider sx={{ width: '100%', mb: 1.5 }} />

            <Stack direction="column" spacing={0.5} sx={{ mb: 1.5 }}>
                {(tx.adds || []).map((a, idx) => (
                    <Typography key={idx} variant="body2" sx={{ color: 'success.main' }}>
                        + {a.player}
                    </Typography>
                ))}
                {(tx.drops || []).map((d, idx) => (
                    <Typography key={idx} variant="body2" sx={{ color: 'error.main' }}>
                        - {d.player}
                    </Typography>
                ))}
            </Stack>

            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Typography variant="caption" display="block">{timestamp}</Typography>
            </Box>
        </Paper>
    );
}
