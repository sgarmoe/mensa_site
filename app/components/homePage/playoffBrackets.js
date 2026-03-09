'use client'
import { useEffect, useState } from "react";
import { Typography, Box } from '@mui/material';
import { Trophy, Award, Toilet } from 'lucide-react';
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


function PodiumSlot({ label, icon, teamName, avatarId, podiumHeight, podiumGradient, podiumLabel, avatarSize = 80 }) {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Team info card above the podium block */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                px: 1,
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {icon}
                    <Typography variant="body2" fontWeight="bold" sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {label}
                    </Typography>
                </Box>
                <TeamAvatar avatarId={avatarId} teamName={teamName} size={avatarSize} />
                <Typography variant="body1" textAlign="center" fontWeight={700} sx={{ maxWidth: 140 }}>
                    {teamName || 'Unknown'}
                </Typography>
            </Box>

            {/* Podium block */}
            <Box sx={{
                width: { xs: 110, sm: 155 },
                height: podiumHeight,
                background: podiumGradient,
                borderRadius: '8px 8px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 -2px 8px rgba(0,0,0,0.15)',
            }}>
                <Typography variant="h4" fontWeight="bold" sx={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
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
            gap: { xs: 2, sm: 3 },
            width: '100%',
            mt: 3,
        }}>
            {/* 2nd — Runner-Up, left, medium height */}
            <PodiumSlot
                label="Runner-Up"
                icon={<Award color="silver" size={28} />}
                teamName={champs.runnerUp?.teamName}
                avatarId={champs.runnerUp?.avatar}
                podiumHeight={160}
                podiumGradient="linear-gradient(180deg, #e0e0e0 0%, #9e9e9e 100%)"
                podiumLabel="2"
                avatarSize={80}
            />

            {/* 1st — Champion, center, tallest */}
            <PodiumSlot
                label="Champion"
                icon={<Trophy color="gold" size={32} />}
                teamName={champs.champion?.teamName}
                avatarId={champs.champion?.avatar}
                podiumHeight={200}
                podiumGradient="linear-gradient(180deg, #FFD700 0%, #DAA520 100%)"
                podiumLabel="1"
                avatarSize={100}
            />

            {/* 3rd place — right of champion */}
            <PodiumSlot
                label="3rd Place"
                icon={<Award color="#cd7f32" size={24} />}
                teamName={champs.thirdPlace?.teamName}
                avatarId={champs.thirdPlace?.avatar}
                podiumHeight={120}
                podiumGradient="linear-gradient(180deg, #cd7f32 0%, #a0522d 100%)"
                podiumLabel="3"
                avatarSize={72}
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
                <Toilet color='brown'/>  Toilet King <Toilet color='brown'/> 
            </Typography>

            {/* Avatar hovering above the toilet */}
            <TeamAvatar avatarId={toiletChamp.avatar} teamName={toiletChamp.teamName} size={72} />
            <Typography variant="body1" fontWeight={700} sx={{ mt: 0.5, mb: 1 }}>
                {toiletChamp.teamName || 'Unknown'}
            </Typography>

            {/* Toilet */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Tank (cistern) */}
                <Box sx={{
                    width: 80, height: 60,
                    bgcolor: porcelain,
                    border: `2px solid ${porcelainBorder}`,
                    borderRadius: '5px 5px 2px 2px',
                    borderBottom: 'none',
                    boxShadow: shadow,
                }} />

                {/* Lid */}
                <Box sx={{
                    width: 112, height: 14,
                    bgcolor: porcelain,
                    border: `2px solid ${porcelainBorder}`,
                    borderRadius: '5px 5px 0 0',
                    boxShadow: shadow,
                }} />

                {/* Seat */}
                <Box sx={{
                    width: 106, height: 10,
                    bgcolor: '#e8e8e0',
                    border: `2px solid ${porcelainBorder}`,
                    borderTop: 'none',
                }} />

                {/* Bowl */}
                <Box sx={{
                    width: 100, height: 70,
                    bgcolor: porcelain,
                    border: `2px solid ${porcelainBorder}`,
                    borderTop: 'none',
                    borderRadius: '0 0 50px 50px',
                    boxShadow: shadow,
                }} />

                {/* Base */}
                <Box sx={{
                    width: 122, height: 16,
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
