import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Switch,
  useTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = ({ darkMode, toggleTheme }) => {
  const theme = useTheme();

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          Retail Credit Score
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
            sx={{ '&:hover': { color: theme.palette.primary.main } }}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/credit-score"
            color="inherit"
            sx={{ '&:hover': { color: theme.palette.primary.main } }}
          >
            Calculate Score
          </Button>
          <Button
            component={RouterLink}
            to="/report"
            color="inherit"
            sx={{ '&:hover': { color: theme.palette.primary.main } }}
          >
            Reports
          </Button>
          <IconButton
            sx={{ ml: 1 }}
            onClick={toggleTheme}
            color="inherit"
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Switch
            checked={darkMode}
            onChange={toggleTheme}
            sx={{ ml: 1 }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
