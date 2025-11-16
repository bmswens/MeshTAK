// React
import React from 'react'

// MUI
import {IconButton, Tooltip} from '@mui/material'
import InfoDialog from '../dialog/InfoDialog'


function LogoButton() {

    const [open, setOpen] = React.useState(false)

    function close() {
        setOpen(false)
    }

    return (
        <>
            <Tooltip
                title="About MeshTAK"
            >
                <IconButton
                    onClick={() => setOpen(true)}
                >
                    <img src="/MeshTAK-512.png" style={{height: "35px", width: "35px"}} alt="MeshTAK" />
                </IconButton>
            </Tooltip>
            <InfoDialog
                open={open}
                close={close}
            />
        </>
    )

}

export default LogoButton