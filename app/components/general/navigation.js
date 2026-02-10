"use client"

import "../../globals.css";
import { Stack, Divider, Button } from '@mui/material';




//TODO
//color scheme for header:
  //MENSA not showing white
  //buttons should be orange, not space between them
//clean up button experimenting
//set actual button layouts for header and footer
//properly plan color, MENSA text appearance, etc. 


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
              <Button href="/">Home</Button>
              <Button href="/rosters">Rosters</Button>
              <Button href="/recentTransactions">Recent Transactions</Button>
              <Button href="/matchups">Matchups</Button>
              <Button href="/history">League History</Button>
            </Stack>
          <p className="attribute-self"> Created by Samuel Garmoe: 2024-2026 </p>
        </footer>
    </>
  );
}
