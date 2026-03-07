"use client"

import React, { useState } from 'react';
import "../../globals.css";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Rosters', href: '/rosters' },
  { label: 'Recent Transactions', href: '/recentTransactions' },
  { label: 'Matchups', href: '/matchups' },
  { label: 'League History', href: '/history' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ flexDirection: 'column', alignItems: 'center', py: 3 }}>
          <Typography
            variant={isMdUp ? 'h4' : 'h5'}
            component="div"
            sx={{ fontFamily: 'Times New Roman, Times, serif', textAlign: 'center', mb: 1 }}
          >
            {[
              { first: 'M', rest: 'inimally', color: '#e53935' },
              { first: 'E', rest: 'ntertaining', color: '#fb8c00' },
              { first: 'N', rest: 'onChildbearing', color: '#43a047' },
              { first: 'S', rest: 'port', color: 'brown' },
              { first: 'A', rest: 'dvocates', color: '#8e24aa' },
            ].map(({ first, rest, color }, i, arr) => (
              <span key={first}>
                <span style={{ color }}>{first}</span>{rest}{i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </Typography>

          {isMdUp ? (
            <Box sx={{ width: '70%', display: 'flex', gap: 4, justifyContent: 'center' }}>
              {navItems.map((it) => (
                <Button
                  key={it.href}
                  href={it.href}
                  variant="contained"
                  color="secondary"
                  sx={{ flex: 1, textTransform: 'none' }}
                >
                  {it.label}
                </Button>
              ))}
            </Box>
          ) : (
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
          <List>
            {navItems.map((item) => (
              <ListItemButton key={item.href} component="a" href={item.href}>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
    </>
  );
}

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 2, mt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
        {navItems.map((it) => (
          <Button key={it.href} href={it.href} sx={{ color: 'white' }}>
            {it.label}
          </Button>
        ))}
      </Box>
      <Typography align="center" sx={{ fontFamily: 'Times New Roman, Times, serif', fontWeight: 'bold' }}>
        Created by Samuel Garmoe: 2024-2026
      </Typography>
    </Box>
  );
}