import { Paper, Typography } from '@mui/material';

export default function SectionHeader({ children, variant = 'h4', sx = {} }) {
  return (
    <Paper
      elevation={4}
      sx={{
        px: 5,
        py: 1.5,
        mb: 3,
        borderRadius: 3,
        border: '1px solid rgba(0,0,0,0.10)',
        background: '#ffffff',
        width: 'fit-content',
        mx: 'auto',
        boxShadow: '0 4px 12px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)',
        ...sx,
      }}
    >
      <Typography variant={variant} sx={{ fontWeight: 700, textAlign: 'center' }}>
        {children}
      </Typography>
    </Paper>
  );
}
