// React
import React from 'react'

// MUI
import { Stack } from '@mui/material'

// Custom
import DrawerTopper from '../DrawerTopper'
import UserLayer from './UserLayer'
import NodeLayer from './NodeLayer'


function MapDrawer() {

    return (
        <>
            <DrawerTopper>
            </DrawerTopper>
            <Stack sx={{ margin: 1 }}>
                <UserLayer />
                <NodeLayer />
            </Stack>
        </>
    )
}

export default MapDrawer