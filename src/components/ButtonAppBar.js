import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import DrawerButton from './Drawer';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar sx={{position: "fixed", background: "transparent", boxShadow: 0}}>
                <Toolbar sx={{ justifyContent: "space-between", color:"black"}}>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="connect"
                        sx={{ ml: 2 }}
                    >
                        <MailIcon />
                    </IconButton> */}
                    <Typography variant="h6" component="div">
                        Caden Juang
                    </Typography>
                    {/* <DrawerButton/> */}
                </Toolbar>
            </AppBar>
        </Box>
    );
}