import { calculateAllTimeStatistics } from '../backend/helpers/processAllTimeData.js';
import { Box, Paper, Stack, Typography, Divider, Grid } from '@mui/material';
import TeamAvatar from '../components/general/TeamAvatar';
import SectionHeader from "../components/general/SectionHeader.js";

export const revalidate = 3600;

export default async function LeagueHistoryPage() {
    const history = await calculateAllTimeStatistics();
    const sorted = [...history].sort((a, b) => {
        const winDiff = (b.wins || 0) - (a.wins || 0);
        if (winDiff !== 0) return winDiff;
        const pctDiff = parseFloat(b.winPercentage || 0) - parseFloat(a.winPercentage || 0);
        if (pctDiff !== 0) return pctDiff;
        return (b.pf || 0) - (a.pf || 0);
    });

    return (
        <Box sx={{ maxWidth: 1100, mx: 'auto', p: 3, backgroundColor: 'lightgray', minHeight: '100vh' }}>
            <SectionHeader>
                League History — All-Time Records
            </SectionHeader>

            <Grid container spacing={2} alignItems="stretch">
                {sorted.map((team, i) => (
                    <Grid item xs={12} md={6} key={team.roster_id || i} sx={{ display: 'flex', alignItems: 'stretch' }}>
                        <TeamHistoryCard team={team} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

function TeamHistoryCard({ team }) {
    const wins = team.wins || 0;
    const losses = team.losses || 0;
    const games = wins + losses || 0;
    const winPct = team.winPercentage
        ? (parseFloat(team.winPercentage) * 100).toFixed(1)
        : '0.0';

    return (
        <Paper elevation={2} sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
            <Box>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TeamAvatar avatarId={team.avatar} teamName={team.team_name} size={56} />
                        <Box>
                            <Typography variant="h6">{team.team_name || 'Unknown'}</Typography>
                            <Typography variant="caption" color="text.secondary">Roster ID: {team.roster_id || '—'}</Typography>
                        </Box>
                    </Stack>

                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6">{wins} - {losses}</Typography>
                        <Typography variant="caption" color="text.secondary">{games} games • {winPct}%</Typography>
                    </Box>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Stack direction="row" spacing={2}>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Points For</Typography>
                        <Typography>{(team.pf || 0).toFixed(2)}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Points Against</Typography>
                        <Typography>{(team.pa || 0).toFixed(2)}</Typography>
                    </Box>
                </Stack>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">View more details</Typography>
            </Box>
        </Paper>
    );
}
