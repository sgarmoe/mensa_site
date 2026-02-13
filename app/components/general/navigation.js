"use client"

import "../../globals.css";
import { Stack, Divider, Button } from '@mui/material';

export default function Header() {
  return (
    <>
        <header>
          <h1>Minimally Entertaining NonChildbearing Sport Advocates</h1>
            <Stack 
            direction="row" 
            spacing={5}
            divider={<Divider orientation="vertical" flexItem/> } 
            sx={{
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              mb: 2,
            }}
            >
              <Button href="/" variant="contained" color="warning">Home</Button>
              <Button href="/rosters" variant="contained" color="warning">Rosters</Button>
              <Button href="/recentTransactions" variant="contained" color="warning">Recent Transactions</Button>
              <Button href="/matchups" variant="contained" color="warning">Matchups</Button>
              <Button href="/history" variant="contained" color="warning">League History</Button>
            </Stack>
        </header>
      <hr />
    </>
  );
}

export function Footer() {
  return (
    <>
      <hr />
        <footer >
            <Stack 
            direction="row" 
            spacing={10}
            divider={<Divider orientation="vertical" flexItem/> } 
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
            >
              <Button href="/" color="white">Home</Button>
              <Button href="/rosters" color="white">Rosters</Button>
              <Button href="/recentTransactions" color="white">Recent Transactions</Button>
              <Button href="/matchups" color="white">Matchups</Button>
              <Button href="/history" color="white">League History</Button>
            </Stack>
          <p className="attribute-self"> Created by Samuel Garmoe: 2024-2026 </p>
        </footer>
    </>
  );
}