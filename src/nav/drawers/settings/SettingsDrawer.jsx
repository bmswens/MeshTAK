// React
import React from 'react'

// MUI
import { Stack } from '@mui/material'

// Custom
import DrawerTopper from '../DrawerTopper'
import AppSettings from './AppSettings';
import MapSettings from './MapSettings';


function SettingsDrawer() {

    return (
        <>
            <DrawerTopper>
            </DrawerTopper>
            <Stack sx={{ margin: 1 }}>
                <AppSettings />
                <MapSettings />
            </Stack>
        </>
    )
}

export default SettingsDrawer