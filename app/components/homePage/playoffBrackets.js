'use client'
import { useEffect, useState } from "react";
import { Typography, Box, Card, CardContent } from '@mui/material';
import { Toilet, Trophy, Award } from 'lucide-react';
import TeamAvatar from '../general/TeamAvatar.js';

const YEAR = 2025;

export default function PlayoffBrackets() {

    const [playoffBracket, setPlayoffBracket] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPlayoffBrackets() {
            try {
                const res = await fetch(`/api/playoffBrackets?year=${YEAR}`);
                if (!res.ok) throw new Error("Failed to fetch brackets");

                const data = await res.json();
                setPlayoffBracket(data);
            } catch (err) {
                console.error("Fetch error: ", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPlayoffBrackets();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (!playoffBracket?.champions) return null;

    return <Champion champs={playoffBracket.champions} />;
}


function ResultCard({ label, icon, teamName, avatarId, accentColor }) {
    return (
        <Card elevation={3} sx={{ borderTop: `4px solid ${accentColor}`, borderRadius: 2 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5, py: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {icon}
                    <Typography variant="h6" fontWeight="bold" sx={{ color: accentColor }}>
                        {label}
                    </Typography>
                </Box>
                <TeamAvatar avatarId={avatarId} teamName={teamName} size={56} />
                <Typography variant="h6" textAlign="center">
                    {teamName || "Unknown"}
                </Typography>
            </CardContent>
        </Card>
    );
}


function Champion({ champs }) {
    if (!champs) return null;

    return (
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' },
            gap: 2,
            width: '100%',
            mt: 2
        }}>
            <ResultCard
                label="Champion"
                icon={<Trophy color="gold" size={28} />}
                teamName={champs.champion?.teamName}
                avatarId={champs.champion?.avatar}
                accentColor="goldenrod"
            />
            <ResultCard
                label="Runner-Up"
                icon={<Award color="silver" size={28} />}
                teamName={champs.runnerUp?.teamName}
                avatarId={champs.runnerUp?.avatar}
                accentColor="#9e9e9e"
            />
            <ResultCard
                label="Toilet King"
                icon={<Toilet color="saddlebrown" size={28} />}
                teamName={champs.toiletChamp?.teamName}
                avatarId={champs.toiletChamp?.avatar}
                accentColor="#795548"
            />
        </Box>
    );
}
