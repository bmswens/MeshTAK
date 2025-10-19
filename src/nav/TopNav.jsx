// React
import React from 'react'

// MUI
import {AppBar, Box, Toolbar, Typography} from '@mui/material'

function TopNav() {

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        MeshTAK
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )

}

export default TopNav