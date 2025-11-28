// React
import React from 'react'

// MUI
import {IconButton, Tooltip} from '@mui/material'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

// Dexie
import { useLiveQuery } from "dexie-react-hooks"

// prop types
import PropTypes from  'prop-types'

// custom
import db from '../../../../db'


function LayerVisbilityButton(props) {

    const { id } = props

    const display = useLiveQuery(async () => {
        let layer = await db.layers.get(id)
        return layer.display
    }, [], 1)

    async function handleClick() {
        if (display) {
            await db.layers.upsert(id, {display: 0})
        }
        else {
            await db.layers.upsert(id, {display: 1})
        }
    }

    return (
        <Tooltip
            title={display ? "Hide Layer" : "Show Layer"}
        >
            <IconButton
                onClick={handleClick}
            >
                {display ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
        </Tooltip>
    )
}

LayerVisbilityButton.propTypes = {
    id: PropTypes.string
}

export default LayerVisbilityButton