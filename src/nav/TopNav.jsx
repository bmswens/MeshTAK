// React
import React from 'react'

// MUI
import {AppBar, Box, Divider, IconButton, Toolbar, Tooltip} from '@mui/material'
import {useTheme} from '@mui/material/styles'

// MUI Icons
import MessageIcon from '@mui/icons-material/Message';
import PolylineIcon from '@mui/icons-material/Polyline';
import MapIcon from '@mui/icons-material/Map';
import SettingsIcon from '@mui/icons-material/Settings';

// Custom
import RightDrawer from './RightDrawer'
import ConnectionButton from './ConnectionButtion';
import LogoButton from './LogoButton';
import DeviceContext from '../context/DeviceContext';

function TopNav() {

    const { device } = React.useContext(DeviceContext)
    const rightDrawer = React.useContext(RightDrawer)
    const theme = useTheme()

    function openMessages() {
        rightDrawer.next("messages")
    }

    function openNodes() {
        rightDrawer.next("nodes")
    }

    function openSettings() {
        rightDrawer.next("settings")
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar
                position="fixed"
                sx={{
                    zIndex: theme.zIndex.drawer + 1
                }}
            >
                <Toolbar>
                    <LogoButton />
                    <Divider orientation="vertical" flexItem variant='middle' sx={{marginLeft: 1, marginRight: 1}} />
                    <Tooltip
                        title="Messages"
                    >
                        <span>
                            <IconButton
                                onClick={openMessages}
                                disabled={device === null}
                                aria-label="Messages"
                            >
                                <MessageIcon fontSize="large" />
                            </IconButton>

                        </span>
                    </Tooltip>
                    <Tooltip
                        title="Nodes"
                    >
                        <span>
                            <IconButton
                                onClick={openNodes}
                                disabled={device === null}
                            >
                                <PolylineIcon fontSize="large" />
                            </IconButton>
                        </span>
                    </Tooltip>
                    <Tooltip
                        title="Map Layers"
                    >
                        <IconButton
                        
                        >
                            <MapIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Box sx={{flexGrow: 1}} />
                    <ConnectionButton />
                    <Tooltip
                        title="Settings"
                    >
                        <IconButton
                            onClick={openSettings}
                        >
                            <SettingsIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
        </Box>
    )

}

export default TopNav