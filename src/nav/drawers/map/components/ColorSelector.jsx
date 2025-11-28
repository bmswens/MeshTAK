// React
import React from 'react'

// MUI
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

// color picker
import { MuiColorInput } from 'mui-color-input'

// prop types
import PropTypes from  'prop-types'

// Dexie
import { useLiveQuery } from "dexie-react-hooks";
import db from '../../../../db';

function ColorSelector(props) {

    const { id, property, label } = props


    const theme = useTheme()
    const defaultColor = theme.palette.primary[theme.palette.mode]

    const style = useLiveQuery(async () => {
        let layer = await db.layers.get(id)
        let style = layer.style
        return style
    }, [], {[property]: defaultColor})

    async function handleChange(newValue) {
        if (!newValue) {
            newValue = defaultColor
        }
        await db.layers.upsert(id, {style: {...style, [property]: newValue}})
    }

    return (
        <>
            <Typography>Layer {label}</Typography>
            <MuiColorInput 
                format="hex" 
                value={style[property]} 
                onChange={handleChange} 
            />
        </>
    )
}

ColorSelector.propTypes = {
    id: PropTypes.string,
    property: PropTypes.string,
    label: PropTypes.string
}

export default ColorSelector