'use client'
import { useEffect, useState } from "react";
import { Grid, Divider, Typography, List, ListItem } from '@mui/material';
import AddPlayer from "../transactions/addPlayer.js";

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
        <Grid container spacing = {12}>
            <Grid 
            size={7} 
            >
                <h2>MENSA</h2>
                <p1>
                Welcome to the home page for the dynasty fantasy football league, MENSA! 

                <br/>
                <br/>
                Founded in 2023 as a desperate attempt to get an ever-elusive dopamine hit from fantasy football, 
                this league consists of 12 friends who are in it for the love of the game. Some of us seek satisfaction through winning
                now, while some (see: toilet bowl champion) prefer to build over long periods for many seasons of success.
                <br/><br/>

                While we are not the real MENSA, the confusion is understandable. Many a stray soul have encountered our members
                and been astounded at the collective intellect. Our league may be young, but we are mighty! 

                </p1>   

            </Grid>

             <Divider orientation="vertical" flexItem sx={{ mx: -5, minHeight: '100%' }} />

        
            <Grid size={4}>
                
                <Typography variant="h4" sx={{ mb:1, textAlign: 'center', p:3, fontWeight: '700' }}> Recent Transactions</Typography>
                {loading ? (
                    <Typography variant="body2"> Loading...</Typography>
                ) : (           
                    <List sx={{ width: '100%' }}>
                        {transactions.slice(0, 10).map((tx, i) => (
                            <div key={i}>
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
