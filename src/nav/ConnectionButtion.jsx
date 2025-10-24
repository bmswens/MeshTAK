// React
import React from 'react'

// MUI
import { Badge, IconButton, Tooltip } from '@mui/material'
import RouterIcon from '@mui/icons-material/Router';

// Custom
import DeviceContext from '../context/DeviceContext'
import ConnectionSelectionDialog from '../dialog/ConnectionSelectionDialog';

function ConnectedButton() {

    const { disconnect } = React.useContext(DeviceContext)

    return (
        <Tooltip
            title="Disconnect"
        >
            <IconButton
                onClick={disconnect}
            >
                <Badge
                    color="success"
                    badgeContent=" "
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    variant='dot'
                    overlap="circular"
                >
                    <RouterIcon fontSize='large' />
                </Badge>
            </IconButton>
        </Tooltip>
    )
}

function DisconnectedButton() {

    const [open, setOpen] = React.useState(false)

    function onClick() {
        setOpen(true)
    }

    function close() {
        setOpen(false)
    }

    return (
        <>
            <Tooltip
                title="Connect"
            >
                <IconButton
                    onClick={onClick}
                >
                    <Badge
                        color="error"
                        badgeContent=" "
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        variant="dot"
                        overlap="circular"
                    >
                        <RouterIcon fontSize='large' />
                    </Badge>
                </IconButton>
            </Tooltip>
            <ConnectionSelectionDialog
                open={open}
                close={close}
            />
        </>
    )
}


function ConnectionButton() {

    const { device } = React.useContext(DeviceContext)

    if (device !== null) {
        return (
            <ConnectedButton />
        )
    }
    return (
        <DisconnectedButton />
    )
}

export default ConnectionButton