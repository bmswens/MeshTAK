// React
import React from 'react'

// MUI
import {IconButton, Tooltip} from '@mui/material'


function LogoButton() {

    return (
        <Tooltip
            title="About MeshTAK"
        >
            <IconButton

            >
                <img src="/MeshTAK.png" style={{height: "35px", width: "35px"}} alt="MeshTAK" />
            </IconButton>
        </Tooltip>
    )

}

export default LogoButton