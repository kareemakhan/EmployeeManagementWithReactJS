import { AppBar, Badge, Button, Grid, IconButton, InputBase, Toolbar } from '@mui/material';
import React from 'react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';

const headerStyles = {backgroundColor: '#ffffff'}

function Header() {
    return (
        <AppBar position="static" style={headerStyles}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item>
                        <InputBase
                            className = "searchInput"
                            placeholder="Search topics"
                            startAdornment={<SearchIcon fontSize="small" style={{marginRight: '8px'}} />}
                        />
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent={4} style={{color: '#FF6D00'}}>
                                <NotificationsNoneIcon fontSize="small" />
                            </Badge>
                        </IconButton>
                        <Button variant="text" style={{color: '#FF6D00', fontSize: "small"}}>Login</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;