// React
import React from 'react'

// MUI
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Slider, Switch, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// color picker
import { MuiColorInput } from 'mui-color-input'

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// custom
import db from '../../../db';

function ColorSetting() {

    const theme = useTheme()
    const defaultColor = theme.palette.primary[theme.palette.mode]
    const settingName = "map.userlocation.color"

    const color = useLiveQuery(async () => {
        let setting = await db.settings.get(settingName)
        if (setting === undefined) {
            setting = {
                value: defaultColor
            }
        }
        return setting.value
    }, [], defaultColor)

    async function handleChange(newValue) {
        if (!newValue) {
            newValue = defaultColor
        }
        await db.settings.upsert(settingName, {value: newValue})
    }

    return (
        <>
            <Typography>Marker Color</Typography>
            <MuiColorInput 
                format="hex" 
                value={color} 
                onChange={handleChange} 
            />
        </>
    )

}

function SizeSetting() {

    const settingName = "map.userlocation.size"

    const size = useLiveQuery(async () => {
        let setting = await db.settings.get(settingName)
        if (setting === undefined) {
            setting = {
                value: 36
            }
        }
        return setting.value
    }, [], 36)

    async function handleChange(event, newValue) {
        await db.settings.upsert(settingName, {value: newValue})
    }

    return (
        <>
            <Typography>Marker Size</Typography>
            <Slider
                value={size}
                onChange={handleChange}
                max={48}
                min={12}
                step={12}
                marks
                aria-label='Marker Size'
                valueLabelDisplay="auto"
            />
        </>
    )
}

function DisplaySetting() {

    const settingName = "map.userlocation.display"

    const display = useLiveQuery(async () => {
        let setting = await db.settings.get(settingName)
        if (setting === undefined) {
            setting = {
                value: true
            }
        }
        return setting.value
    }, [], [])

    async function handleChange(event) {
        await db.settings.upsert(settingName, { value: event.target.checked })
    }

    return (
        <Stack direction="row">
            <Typography>Display</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Switch
                checked={display}
                onChange={handleChange}
                slotProps={{ input: { 'aria-label': 'display user layer' } }}
            />
        </Stack>
    )
}


function UserLocation() {

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="user-layer"
                id="user-layer"
            >
                <Stack alignItems="center" direction="row" gap={1} >
                    {/* <LayerVisbilityButton
                        layerName="userlocation"
                    /> */}
                    <Typography variant="h6">User Layer</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={1}>
                    <DisplaySetting />
                    <SizeSetting />
                    <ColorSetting />
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default UserLocation