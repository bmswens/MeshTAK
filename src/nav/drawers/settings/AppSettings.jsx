// React
import React from 'react'

// MUI
import { Accordion, AccordionDetails, AccordionSummary, Slider, Stack, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// custom
import db from '../../../db';


function DrawerWidthSetting() {

    const settingName = "drawerWidth"
    
    const width = useLiveQuery(async () => {
        let w = await db.settings.get(settingName)
        if (w === undefined) {
            w = {
                value: 25
            }
        }
        return w.value
    }, [], [])

    const [localWidth, setLocalWidth] = React.useState(25)

    React.useEffect(() => {
        setLocalWidth(width)
    }, [width])

    async function handleCommit(event, newValue) {
        await db.settings.upsert(settingName, {value: newValue})
    }

    async function handleChange(event, newValue) {
        setLocalWidth(newValue)
    }

    return (
        <>
            <Typography>Drawer Width</Typography>
            <Slider
                value={localWidth}
                onChange={handleChange}
                onChangeCommitted={handleCommit}
                max={75}
                min={10}
                aria-label='Volume'
            />
        </>
    )
}


function AppSettings() {

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="app-settings"
                id="app-settings"
            >
                <Typography variant="h6">App Settings</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={1}>
                    <DrawerWidthSetting />
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default AppSettings