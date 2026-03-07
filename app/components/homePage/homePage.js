'use client'
import { useEffect, useState } from "react";
import { Grid, Divider, Typography, Box, Skeleton, Button } from '@mui/material';
import AddPlayer from "../transactions/addPlayer.js";
import PlayoffBrackets from "./playoffBrackets.js";


const YEAR = 2026;

export default function HomePage() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const res = await fetch(`/api/populateRecentTransactions?year=${YEAR}`);
                if (!res.ok) throw new Error("Failed to populate transactions");

                const data = await res.json();
                setTransactions(data);
            } catch (err) {
                console.error("Fetch error: ", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);

    return (
        <Grid container spacing={{ xs: 4, md: 25 }} sx={{ p: { xs: 2, md: 5 }, backgroundColor: 'lightgray' }}>

            <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h3" sx={{ mb: 1, textAlign: 'center', p: 3, fontWeight: '700' }}>
                    2025 Results
                </Typography>
                <PlayoffBrackets />
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button href="/matchups" variant="outlined" size="medium" sx={{ mt: 2, backgroundColor: "white" }}>
                        View Full Playoff Results
                    </Button>
                </Box>
            </Grid>

            <Divider orientation="vertical" flexItem sx={{color: 'lightblue',  display: { xs: 'none', md: 'block' }, mx: -1  }} />

            <Grid item xs={12} md={4}>
                <Typography variant="h3" sx={{ mb: 1, textAlign: 'center', p: 3, fontWeight: '700' }}>
                    Recent Transactions
                </Typography>
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} variant="rounded" height={110} />
                        ))}
                    </Box>
                ) : (
                    <Box sx={{ width: '100%' }}>
                        {transactions.slice(0, 5).map((tx, i) => (
                            <AddPlayer key={tx.tx_id || tx.id || i} tx={tx} />
                        ))}
                        <Box sx={{ textAlign: 'center'}} >
                            <Button href="/recentTransactions" variant="outlined" size="small" sx={{ mt: 2, backgroundColor: "white" }}>
                                View All Transactions
                            </Button> 
                        </Box>
                    </Box>      
                )}
            </Grid>
        </Grid>
    );
}
