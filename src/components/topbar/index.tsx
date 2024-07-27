import React, { useState } from "react";
import {AppBar, Button, Stack, Toolbar, Typography, Menu, MenuItem, Link, Box} from "@mui/material";

interface TopbarProps {
    type: string;
}

export const Topbar = ( {type} : TopbarProps) =>
{
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path: string) => {
        window.location.href = path;
    };

    return (
        <AppBar className="top-nav-bar" position="static" style={{ backgroundColor: 'rgba(15,15,21,0.88)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box className = "topbar-titles">
                    <Button color="inherit" onClick={() => handleNavigate('/about')}>
                        <h3>{type}</h3>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}