"use client"
import { useEffect, useState } from "react";
import { Box, Grid, Typography, Paper, Stack, Divider } from '@mui/material';
import TeamAvatar from '../components/general/TeamAvatar';
import SectionHeader from "../components/general/SectionHeader.js";
import "../globals.css";

const YEAR = 2025; // show last season playoffs by default

function Header({ title }) {
    return (
        <Typography variant="h4" align="center" sx={{ mb: 2 }}>
            {title}
        </Typography>
    );
}

export default function MatchupsPage() {
    const [brackets, setBrackets] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBrackets() {
            try {
                const res = await fetch(`/api/playoffBrackets?year=${YEAR}`);
                if (!res.ok) throw new Error('Failed to fetch playoff brackets');
                const data = await res.json();
                setBrackets(data || {});
            } catch (err) {
                setError(err.message || String(err));
            } finally {
                setLoading(false);
            }
        }
        fetchBrackets();
    }, []);

    if (loading) return <Typography align="center">Loading playoff brackets...</Typography>;
    if (error) return <Typography align="center" color="error">Error: {error}</Typography>;

    const { processedWBracket, processedLBracket } = brackets || {};

    return (
        <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
            <SectionHeader>Playoff Brackets — {YEAR}</SectionHeader>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>Winner's Bracket</Typography>
                    <Bracket rounds={processedWBracket} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mb: 1, textAlign: 'center' }}>Loser's Bracket</Typography>
                    <Bracket rounds={processedLBracket} />
                </Grid>
                <Grid>
                    <Typography variant="h6" sx={{ mb: 1, textAlign: 'center', p: 3, fontWeight: '700' }}>
                    Check back later for 2026 Matchups! 
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}

function Bracket({ rounds = {} }) {
    // rounds is an object where keys are round numbers
    const roundKeys = Object.keys(rounds).sort((a, b) => Number(a) - Number(b));

    if (roundKeys.length === 0) return <Typography>No bracket data</Typography>;

    return (
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
                {roundKeys.map((rk) => (
                    <Paper key={rk} sx={{ p: 1, minWidth: 220 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1, textAlign: 'center' }}>Round {rk}</Typography>
                        <Divider sx={{ mb: 1 }} />
                        <Stack spacing={1}>
                            {rounds[rk].map((m) => (
                                <MatchCard key={m.matchId} match={m} />
                            ))}
                        </Stack>
                    </Paper>
                ))}
            </Stack>
        </Box>
    );
}

function MatchCard({ match }) {
    const { team1, team2, winner, loser, isBye, team1Score, team2Score } = match;

    return (
        <Paper sx={{ p: 1 }} elevation={1}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                    <TeamAvatar avatarId={team1?.avatar} teamName={team1?.teamName || team1?.displayName} size={36} />
                    <Stack>
                        <Typography variant="body2" sx={{ fontWeight: winner === team1?.roster_id ? '700' : '400' }}>{team1?.teamName || team1?.displayName}</Typography>
                        {team1Score != null && (
                            <Typography variant="caption" color="text.secondary">Score: {team1Score}</Typography>
                        )}
                    </Stack>
                </Stack>

                <Typography variant="caption">vs</Typography>

                {isBye ? (
                    <Typography variant="body2" color="text.secondary">BYE</Typography>
                ) : (
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Stack sx={{ textAlign: 'right' }}>
                            {team2Score != null && (
                                <Typography variant="caption" color="text.secondary">Score: {team2Score}</Typography>
                            )}
                            <Typography variant="body2" sx={{ fontWeight: winner === team2?.roster_id ? '700' : '400' }}>{team2?.teamName || team2?.displayName}</Typography>
                        </Stack>
                        <TeamAvatar avatarId={team2?.avatar} teamName={team2?.teamName || team2?.displayName} size={36} />
                    </Stack>
                )}
            </Stack>
        </Paper>
    );
}