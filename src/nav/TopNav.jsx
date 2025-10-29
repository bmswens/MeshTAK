// React
import React from 'react'

// MUI
import {AppBar, Box, IconButton, Toolbar, Tooltip, Typography} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'

// MUI Icons
import MessageIcon from '@mui/icons-material/Message';
import PolylineIcon from '@mui/icons-material/Polyline';

// Custom
import RightDrawer from './RightDrawer'
import ConnectionButton from './ConnectionButtion';

function TopNav() {

    const rightDrawer = React.useContext(RightDrawer)
    const theme = useTheme()

    function openMessages() {
        rightDrawer.next("messages")
    }

    function openNodes() {
        rightDrawer.next("nodes")
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
                    <Typography variant="h6">
                        MeshTAK
                    </Typography>
                    <DoubleArrowIcon />
                    <Tooltip
                        title="Messages"
                    >
                        <IconButton
                            onClick={openMessages}
                        >
                            <MessageIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        title="Nodes"
                    >
                        <IconButton
                            onClick={openNodes}
                        >
                            <PolylineIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                    <Box sx={{flexGrow: 1}} />
                    <ConnectionButton />
                </Toolbar>
            </AppBar>
        </Box>
    )

}

export default TopNav