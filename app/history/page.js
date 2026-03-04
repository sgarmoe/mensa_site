"use client"
import { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography, Avatar, Divider, Grid } from '@mui/material';
import TeamAvatar from '../components/general/TeamAvatar';
import "../globals.css";

export default function LeagueHistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const res = await fetch(`/api/leagueHistory`);
                if (!res.ok) throw new Error("Failed to acquire league history");
                const data = await res.json();
                setHistory(data || []);
            } catch (err) {
                setError(err.message || String(err));
            } finally {
                setLoading(false);
            }
        }
        fetchHistory();
    }, []);

    if (loading) return <Typography align="center">Loading history...</Typography>;
    if (error) return <Typography align="center" color="error">Error: {error}</Typography>;

    // sort by wins desc
    const sorted = [...history].sort((a, b) => (b.wins || 0) - (a.wins || 0));

    return (
        <Box sx={{ maxWidth: 1100, mx: 'auto', p: 3 }}>
            <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 700 }}>
                League History — All-time Records
            </Typography>

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
    const winPct = games > 0 ? ((wins / games) * 100).toFixed(1) : '0.0';

    return (
        <Paper elevation={2} sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
            <Box>
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TeamAvatar avatarId={team.team_name?.avatar || team.avatar} teamName={team.team_name?.teamName || team.team} size={56} />
                        <Box>
                            <Typography variant="h6">{team.team_name?.teamName || team.team || 'Unknown'}</Typography>
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
                        <Typography>{team.pf || 0}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary">Points Against</Typography>
                        <Typography>{team.pa || 0}</Typography>
                    </Box>
                </Stack>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">View more details</Typography>
            </Box>
        </Paper>
    );
}