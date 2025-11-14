// React
import React from 'react'

// MUI
import { Stack } from '@mui/material'

// Custom
import DrawerTopper from '../DrawerTopper'
import AppSettings from './AppSettings';


function SettingsDrawer() {

    return (
        <>
            <DrawerTopper>
            </DrawerTopper>
            <Stack spacing={1} sx={{ margin: 1 }}>
                    <AppSettings />
            </Stack>
        </>
    )
}

export default SettingsDrawer