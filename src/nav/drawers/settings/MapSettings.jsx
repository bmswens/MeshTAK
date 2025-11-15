// React
import React from 'react'

// MUI
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Switch, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// custom
import db from '../../../db';


function AutomaticCenterSetting() {

    const settingName = "centerOnLoad"
    
    const centerOnLoad = useLiveQuery(async () => {
        let setting = await db.settings.get(settingName)
        if (setting === undefined) {
            setting = {
                value: true
            }
        }
        return setting.value
    }, [], [])

    async function handleChange(event) {
        await db.settings.upsert(settingName, {value: event.target.checked})
    }

    return (
        <Stack direction="row">
            <Typography>Automatic Center</Typography>
            <Box sx={{flexGrow: 1}} />
            <Switch 
                checked={centerOnLoad}
                onChange={handleChange}
                slotProps={{ input: { 'aria-label': 'center-on-load' } }}
            />
        </Stack>
    )
}


function MapSettings() {

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="map-settings"
                id="map-settings"
            >
                <Typography variant="h6">Map Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={1}>
                    <AutomaticCenterSetting />
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default MapSettings