// React
import React from 'react'

// MUI
import { Accordion, AccordionDetails, AccordionSummary, Box, Slider, Stack, Switch, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// custom
import db from '../../../db';

function NotificationsSetting() {

    const settingName = "notifications"

    const notifications = useLiveQuery(async () => {
        let setting = await db.settings.get(settingName)
        if (setting === undefined) {
            setting = {
                value: false
            }
        }
        return setting.value
    }, [], [])

    async function handleChange(event) {
        await db.settings.upsert(settingName, { value: event.target.checked })
    }

    return (
        <Stack direction="row">
            <Typography>Allow Notifications</Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Switch
                checked={notifications}
                onChange={handleChange}
                slotProps={{ input: { 'aria-label': 'allow-notifications' } }}
                disabled={Notification.permission === "default"}
            />
        </Stack>
    )
}


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
        await db.settings.upsert(settingName, { value: newValue })
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
                    <NotificationsSetting />
                    <DrawerWidthSetting />
                </Stack>
            </AccordionDetails>
        </Accordion>
    )
}

export default AppSettings