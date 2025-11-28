// React
import React from 'react'

// MUI
import { Box, IconButton, Stack, Tooltip } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';

// Custom
import DrawerTopper from '../DrawerTopper'
import UserLocation from './UserLocation'
import NodeLayer from './NodeLayer'
import NewLayerDialog from '../../../dialog/NewLayerDialog'
import UserDefinedLayers from './UserDefinedLayers';

function NewLayerButton() {

    const [open, setOpen] = React.useState(false)

    return (
    <>
        <Tooltip
            title="Add Layer"
        >
            <IconButton
                onClick={() => setOpen(true)}
            >
                <LibraryAddIcon />
            </IconButton>
        </Tooltip>
        <NewLayerDialog
            open={open}
            close={() => setOpen(false)}
        />
    </>
    )
}


function MapDrawer() {

    return (
        <>
            <DrawerTopper>
                <Box sx={{flexGrow: 1}} />
                <NewLayerButton />
            </DrawerTopper>
            <Stack sx={{ margin: 1 }} spacing={1}>
                <UserLocation />
                <NodeLayer />
                <UserDefinedLayers />
            </Stack>
        </>
    )
}

export default MapDrawer