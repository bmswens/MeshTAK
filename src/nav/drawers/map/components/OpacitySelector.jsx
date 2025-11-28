// React
import React from 'react'

// MUI
import { Slider, Typography } from '@mui/material'

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// prop types
import PropTypes from  'prop-types'

// custom
import db from '../../../../db'

function OpacitySelector(props) {

    const { id } = props
    
    const style = useLiveQuery(async () => {
        let layer = await db.layers.get(id)
        let style = layer.style
        return style
    }, [], {fillOpacity: 0.2})

    const [localOpacity, setLocalOpacity] = React.useState(style.fillOpacity)

    React.useEffect(() => {
        if (style.fillOpacity !== localOpacity) {
            setLocalOpacity(style.fillOpacity)
        }
    }, [style])

    async function handleCommit(event, newValue) {
        await db.layers.upsert(id, {style: {...style, fillOpacity: newValue}})
    }

    async function handleChange(event,  newValue) {
        setLocalOpacity(newValue)
    }

    return (
        <>
            <Typography>Layer Fill Opacity</Typography>
            <Slider
                value={localOpacity}
                onChange={handleChange}
                onChangeCommitted={handleCommit}
                min={0}
                max={1.0}
                step={.1}
                marks
            />
        </>
    )
}

OpacitySelector.propTypes = {
    id: PropTypes.string
}

export default OpacitySelector