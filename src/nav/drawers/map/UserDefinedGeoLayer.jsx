// React
import React from 'react'

// MUI
import { Card, CardContent, CardHeader, Collapse, IconButton, Stack, Tooltip } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// prop types
import PropTypes from 'prop-types'

// custom
import LayerVisbilityButton from './components/LayerVisibilityButton'
import ColorSelector from './components/ColorSelector';
import db from '../../../db';
import OpacitySelector from './components/OpacitySelector';

function LayerHeader(props) {

    const { id, name, expanded, setExpanded } = props

    const count = useLiveQuery(async () => {
        return await db.layerData.where({layer: id}).count()
    }, [], 0)

    return (
        <CardHeader
            avatar={<LayerVisbilityButton id={id} />}
            title={name}
            subheader={`${count} entries`}
            action={
                <Tooltip
                    title="Show Settings"
                >
                    <IconButton
                        onClick={() => setExpanded(!expanded)}
                    >
                        { expanded ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
                    </IconButton>
                </Tooltip>
            }
        />
    )
}

LayerHeader.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    expanded: PropTypes.bool,
    setExpanded: PropTypes.func
}

function LayerSettings(props) {

    const { id, expanded } = props

    return (
        <Collapse
            in={expanded}
            timeout="auto"
            unmountOnExit
        >
            <CardContent>
                <Stack spacing={1}>
                    <ColorSelector
                        id={id}
                        property="color"
                        label="Line Color"
                    />
                    <ColorSelector
                        id={id}
                        property="fillColor"
                        label="Fill Color"
                    />
                    <OpacitySelector
                        id={id}
                    />
                </Stack>
            </CardContent>
        </Collapse>
    )
}

LayerSettings.propTypes = {
    id: PropTypes.string,
    expanded: PropTypes.bool
}

function UserDefinedGeoLayer(props) {

    const { name, id } = props

    const [expanded, setExpanded] = React.useState(false)

    return (
        <Card>
            <LayerHeader
                id={id}
                name={name}
                expanded={expanded}
                setExpanded={setExpanded}
            />
            <LayerSettings
                id={id}
                expanded={expanded}
            />
        </Card>
    )
}

UserDefinedGeoLayer.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string
}

export default UserDefinedGeoLayer