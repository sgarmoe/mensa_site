'use client'
import { useEffect, useState } from "react";
import { Grid, Divider, Typography, List, ListItem } from '@mui/material';
import AddPlayer from "../transactions/addPlayer.js";
import PlayoffBrackets from "./playoffBrackets.js";


const YEAR = 2026;

export default function HomePage() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const res = await fetch (`/api/populateRecentTransactions?year=${YEAR}`);
                if (!res.ok) throw new Error("Failed to populate transactions");

                const data = await res.json();
                console.log(data);
                setTransactions(data);
            } catch (err) {
                console.error("Fetch error: ", err);
            } finally {
                setloading(false);
            }
        }
        fetchTransactions();
    }, []);
    
    return (
        <Grid container spacing={{ xs: 4, md: 10 }} sx={{ p: { xs: 2, md: 4 } }}>

            <Grid item xs={12} md={7}>

               

                <Typography variant="h4" sx={{ mb:1 , textAlign: 'center', p:3, fontWeight: '700' }}> 
                            2025 Results
                </Typography>
                <PlayoffBrackets />
            </Grid>

             <Divider orientation="vertical" flexItem sx={{ display: {xs: 'none', md: 'block', }, mx: -1 }} />
            
            <Grid item xs={12} md={5}>
                
                <Typography variant="h4" sx={{ mb:1, textAlign: 'center', p:3, fontWeight: '700' }}> 
                    Recent Transactions
                </Typography>
                {loading ? (
                    <Typography variant="body2"> Loading...</Typography>
                ) : (           
                    <List sx={{ width: '100%' }}>
                        {transactions.slice(0, 10).map((tx, i) => (
                            <div key={tx.tx_id || tx.id || i}>
                                <AddPlayer tx={tx} />
                                { i - transactions.length - 1  && <Divider variant="inset" component="li" />}
                            </div>
                        ))}
                    </List>
                )}
            </Grid>
        </Grid>
    );
};
