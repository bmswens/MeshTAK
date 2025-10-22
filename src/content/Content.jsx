// React
import React from 'react'

// MUI
import {Stack, Toolbar} from '@mui/material'

// Custom
import Map from './Map'


function Content() {

    return (
        <>
            <Toolbar />
            <Stack spacing={1}>
                <Map />
            </Stack>
        </>
    )
}

export default Content