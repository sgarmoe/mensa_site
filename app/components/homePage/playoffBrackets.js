'use client'
import { useEffect, useState } from "react";
import { Typography, Box } from '@mui/material';
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

    return (
        <>
            <Podium champs={playoffBracket.champions} />
            <ToiletThrone toiletChamp={playoffBracket.champions.toiletChamp} />
        </>
    );
}


function PodiumSlot({ label, icon, teamName, avatarId, podiumHeight, podiumGradient, podiumLabel, avatarSize = 56 }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Team info card above the podium block */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.75,
                mb: 1.5,
                px: 1,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {icon}
                    <Typography variant="caption" fontWeight="bold" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {label}
                    </Typography>
                </Box>
                <TeamAvatar avatarId={avatarId} teamName={teamName} size={avatarSize} />
                <Typography variant="body2" textAlign="center" fontWeight={700} sx={{ maxWidth: 110 }}>
                    {teamName || 'Unknown'}
                </Typography>
            </Box>

            {/* Podium block */}
            <Box sx={{
                width: { xs: 90, sm: 120 },
                height: podiumHeight,
                background: podiumGradient,
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 -2px 8px rgba(0,0,0,0.15)',
            }}>
                <Typography variant="h5" fontWeight="bold" sx={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                    {podiumLabel}
                </Typography>
            </Box>
        </Box>
    );
}


function Podium({ champs }) {
    if (!champs) return null;

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: { xs: 1, sm: 2 },
            width: '100%',
            mt: 3,
        }}>
            {/* 2nd — Runner-Up, left, medium height */}
            <PodiumSlot
                label="Runner-Up"
                icon={<Award color="silver" size={18} />}
                teamName={champs.runnerUp?.teamName}
                avatarId={champs.runnerUp?.avatar}
                podiumHeight={90}
                podiumGradient="linear-gradient(180deg, #e0e0e0 0%, #9e9e9e 100%)"
                podiumLabel="2"
                avatarSize={48}
            />

            {/* 1st — Champion, center, tallest */}
            <PodiumSlot
                label="Champion"
                icon={<Trophy color="gold" size={22} />}
                teamName={champs.champion?.teamName}
                avatarId={champs.champion?.avatar}
                podiumHeight={130}
                podiumGradient="linear-gradient(180deg, #FFD700 0%, #DAA520 100%)"
                podiumLabel="1"
                avatarSize={64}
            />

            {/* Toilet King, right, shortest */}
            <PodiumSlot
                label="Toilet King"
                icon={<Toilet color="saddlebrown" size={18} />}
                teamName={champs.toiletChamp?.teamName}
                avatarId={champs.toiletChamp?.avatar}
                podiumHeight={60}
                podiumGradient="linear-gradient(180deg, #a1887f 0%, #795548 100%)"
                podiumLabel="💩"
                avatarSize={48}
            />
        </Box>
    );
}


function ToiletThrone({ toiletChamp }) {
    if (!toiletChamp) return null;

    const porcelain = '#f5f5f0';
    const porcelainBorder = '#c8c8be';
    const shadow = '0 2px 6px rgba(0,0,0,0.15)';

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
            <Typography variant="caption" fontWeight="bold" sx={{ textTransform: 'uppercase', letterSpacing: 1, color: 'text.secondary', mb: 1.5 }}>
                🚽 Throne of Shame
            </Typography>

            {/* Avatar hovering above the toilet */}
            <TeamAvatar avatarId={toiletChamp.avatar} teamName={toiletChamp.teamName} size={52} />
            <Typography variant="body2" fontWeight={700} sx={{ mt: 0.5, mb: 1 }}>
                {toiletChamp.teamName || 'Unknown'}
            </Typography>

            {/* Toilet */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Tank (cistern) */}
                <Box sx={{
                    width: 58, height: 44,
                    bgcolor: porcelain,
                    border: `2px solid ${porcelainBorder}`,
                    borderRadius: '5px 5px 2px 2px',
                    borderBottom: 'none',
                    boxShadow: shadow,
                }} />

                {/* Lid (open/upright) */}
                <Box sx={{
                    width: 82, height: 10,
                    bgcolor: porcelain,
                    border: `2px solid ${porcelainBorder}`,
                    borderRadius: '5px 5px 0 0',
                    boxShadow: shadow,
                }} />

                {/* Seat */}
                <Box sx={{
                    width: 78, height: 8,
                    bgcolor: '#e8e8e0',
                    border: `2px solid ${porcelainBorder}`,
                    borderTop: 'none',
                }} />

                {/* Bowl */}
                <Box sx={{
                    width: 74, height: 52,
                    bgcolor: porcelain,
                    border: `2px solid ${porcelainBorder}`,
                    borderTop: 'none',
                    borderRadius: '0 0 37px 37px',
                    boxShadow: shadow,
                }} />

                {/* Base */}
                <Box sx={{
                    width: 90, height: 12,
                    bgcolor: porcelain,
                    border: `2px solid ${porcelainBorder}`,
                    borderTop: 'none',
                    borderRadius: '0 0 6px 6px',
                    boxShadow: shadow,
                }} />
            </Box>
        </Box>
    );
}
