import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import DifferenceIcon from '@mui/icons-material/Difference';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { theme } from '../common/muiStyles';

const pages = ['Dashboard', 'Create'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = useState(null);
  
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  
    return (
      <AppBar position="static">
          <Toolbar >
            <DifferenceIcon style={{color:theme.palette.custom.dark}}  />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                <MenuItem>
                    <Link to="dashboard">Dashboard</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="templates">Template</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="project">Project</Link>
                </MenuItem>
            </Box>
  
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton  onClick={handleOpenUserMenu}>
                  <AccountBoxIcon style={{color:theme.palette.custom.dark}}  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
      </AppBar>
    );
}
export default ResponsiveAppBar;