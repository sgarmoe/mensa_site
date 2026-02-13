'use client'
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid'; 
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function HomePage() {

    const [transactions, setTransactions] = useState([]);
    const [loading, setloading] = useState(true);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const res = await fetch (`/api/populateRecentTransactions?year=${YEAR}`);
                if (!res.ok) throw new Error("Failed to populate transactions");

                const data = await res.json();
                setTransactions(data);
            } catch (err) {
                console.error("Fetch error: ", error);
            } finally {
                setloading(false);
            }
        }
        fetchTransactions();
    }, []);

    //DO FRONTEND RENDERING
    
    return (
        <Grid container spacing = {12}>
            <Grid 
            size={8} 
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

             <Divider orientation="vertical" flexItem sx={{ mx: -5 }} />

            <Grid size={3}>
                <Typography variant={h6} sx={{ mb:2 }}> Recent Transactions</Typography>
                {loading ? (
                    <Typography variant="body2"> Loading...</Typography>
                ) : (           
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {transactions.slice(0, 10).map((tx, i) => (
                            <div key={i}>
                                <MUITransactionItem tx={tx} />
                                <Divider variant="inset" component="li" />
                            </div>
                        ))}
                    </List>
                )}
            </Grid>
        </Grid>
    );
};


function MUITransactionItem({ tx }) {
    return (
        <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', px: 0}} >
            <Typography variant="subtitle2" color="primary">
                {tx.type} - {new Date(tx.timestamp).toLocaleDateString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
                Team: {tx.team_name.teamName}
            </Typography>

            {tx.adds.map((a, idx) => (
                <Typography key={idx} variant="caption" display="block" sx={{ color: 'success.main' }}>
                    + {a.player}
                </Typography>
            ))}
            {tx.drops.map((d, idx) => (
                <Typography key={idx} variant="caption" display="block" sx={{ color: 'error.main' }}>
                    - {d.player}
                </Typography>
            ))}
        </ListItem>
    );
}