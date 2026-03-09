'use client'
import { useEffect, useState } from "react";
import { Divider, Box, Skeleton, Button } from '@mui/material';
import AddPlayer from "../transactions/addPlayer.js";
import PlayoffBrackets from "./playoffBrackets.js";
import SectionHeader from "../general/SectionHeader.js";


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
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'flex-start' },
            p: { xs: 2, md: 5 },
            backgroundColor: 'lightgray',
            minHeight: '100%',
        }}>
            {/* Left half — 2025 Results */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 1, md: 3 } }}>
                <SectionHeader>2025 Results</SectionHeader>
                <PlayoffBrackets />
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button href="/matchups" variant="outlined" size="medium" sx={{ mt: 2, backgroundColor: "white" }}>
                        View Full Playoff Results
                    </Button>
                </Box>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' } }} />

            {/* Right half — Recent Transactions */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', px: { xs: 1, md: 3 } }}>
                <SectionHeader>Recent Transactions</SectionHeader>
                {loading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} variant="rounded" height={110} />
                        ))}
                    </Box>
                ) : (
                    <Box sx={{ width: '100%' }}>
                        {transactions.slice(0, 5).map((tx, i) => (
                            <AddPlayer key={tx.tx_id || tx.id || i} tx={tx} />
                        ))}
                        <Box sx={{ textAlign: 'center' }}>
                            <Button href="/recentTransactions" variant="outlined" size="small" sx={{ mt: 2, backgroundColor: "white" }}>
                                View All Transactions
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
