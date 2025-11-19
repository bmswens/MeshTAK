// React
import React from 'react'

// MUI
import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Switch, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// custom
import db from '../../../db';

function DisplaySetting() {

    const settingName = "map.userlayer.display"

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
                slotProps={{ input: { 'aria-label': 'displaye user layer' } }}
            />
        </Stack>
    )
}


function UserLayer() {

    const display = useLiveQuery(async () => {
        let setting = await db.settings.get("map.userlayer.display")
        if (setting === undefined) {
            setting = {
                value: true
            }
        }
        return setting.value
    }, [], [])

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="user-layer"
                id="user-layer"
            >
                <Stack alignItems="center" direction="row" gap={1} >
                    {display ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    <Typography variant="h6">User Layer</Typography>
                </Stack>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={1}>
                    <DisplaySetting />
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default UserLayer