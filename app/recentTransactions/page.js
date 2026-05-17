"use client"
import { useEffect, useState } from "react";
import { Box, Paper, Typography, Stack, Avatar, Divider, Chip } from '@mui/material';
import TeamAvatar from '../components/general/TeamAvatar';
import SectionHeader from "../components/general/SectionHeader.js";
import "../globals.css";
import { CURRENT_YEAR } from "../backend/config/seasons.js";


function playerInitials(name) {
  if (!name) return '';
  const parts = name.split(' ');
  return (parts[0][0] || '') + (parts[1] ? parts[1][0] : '');
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch(`/api/populateRecentTransactions?year=${CURRENT_YEAR}`);
        if (!res.ok) throw new Error("Failed to populate transactions");

        const data = await res.json();
        setTransactions(data || []);
      } catch (err) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  if (loading) return <Typography align="center">Loading Transactions...</Typography>;
  if (error) return <Typography align="center" color="error">Error: {error}</Typography>;

  // sort most recent first
  const sorted = [...transactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
      <SectionHeader>Recent Transactions</SectionHeader>

      <Stack spacing={2}>
        {sorted.map((tx, i) => (
          <Transaction key={tx.transactionId || i} tx={tx} />
        ))}
      </Stack>
    </Box>
  );
}

function Transaction({ tx }) {
  const ts = tx.timestamp ? new Date(tx.timestamp) : null;

  if (tx.type === "Trade") {
    return (
      <Paper elevation={2} sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={600}>Trade</Typography>
          <Typography variant="caption" color="text.secondary">
            {ts && ts.toLocaleString()}
          </Typography>
        </Stack>

        <Divider sx={{ mb: 1.5 }} />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          {(tx.sides || []).map((side, i) => (
            <Box key={side.roster_id || i} sx={{ flex: 1 }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                <TeamAvatar avatarId={side.avatar} teamName={side.team_name} size={32} />
                <Typography variant="subtitle2" fontWeight={600}>{side.team_name}</Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary">Received</Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap', mt: 0.5 }}>
                {side.received.length > 0
                  ? side.received.map((item, idx) => (
                      <Chip
                        key={idx}
                        avatar={<Avatar>{playerInitials(item)}</Avatar>}
                        label={item}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mr: 0.5, mt: 0.5 }}
                      />
                    ))
                  : <Typography variant="caption" color="text.secondary">—</Typography>
                }
              </Stack>
            </Box>
          ))}
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>
          Transaction ID: {tx.transactionId || '—'}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" spacing={2} alignItems="center">
          <TeamAvatar avatarId={tx.avatar} teamName={tx.team_name} size={56} />
          <div>
            <Typography variant="h6">{tx.team_name || 'Unknown Team'}</Typography>
            <Typography variant="caption" color="text.secondary">
              {tx.type} {ts && `• ${ts.toLocaleString()}`}
            </Typography>
          </div>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {ts && ts.toLocaleDateString()}
        </Typography>
      </Stack>

      <Divider sx={{ my: 1 }} />

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-start">
        <Stack spacing={1} sx={{ minWidth: 0, flex: 1 }}>
          {tx.adds && tx.adds.length > 0 && (
            <Box>
              <Typography variant="subtitle2" color="success.main">Adds</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {tx.adds.map((a, idx) => (
                  <Chip
                    key={idx}
                    avatar={<Avatar>{playerInitials(a.player)}</Avatar>}
                    label={a.player}
                    color="success"
                    size="small"
                    sx={{ mr: 1, mt: 1 }}
                  />
                ))}
              </Stack>
            </Box>
          )}
          {tx.drops && tx.drops.length > 0 && (
            <Box>
              <Typography variant="subtitle2" color="error.main">Drops</Typography>
              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                {tx.drops.map((d, idx) => (
                  <Chip
                    key={idx}
                    avatar={<Avatar>{playerInitials(d.player)}</Avatar>}
                    label={d.player}
                    color="default"
                    size="small"
                    sx={{ mr: 1, mt: 1 }}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </Stack>
        <Stack spacing={1} sx={{ alignItems: { xs: 'flex-start', md: 'flex-end' } }}>
          <Typography variant="caption" color="text.secondary">
            Transaction ID: {tx.transactionId || '—'}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}



