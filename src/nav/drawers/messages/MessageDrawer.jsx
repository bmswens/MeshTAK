// React
import React from 'react'

// MUI
import { Box, Divider, IconButton, Stack, TextField, Tooltip } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import SendIcon from '@mui/icons-material/Send';

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// Custom
import DrawerTopper from '../DrawerTopper'
import db from '../../../db';
import MessageCard from './MessageCard';
import DeviceContext from '../../../context/DeviceContext';


function MessageArea() {

    const theme = useTheme()
    const { device } = React.useContext(DeviceContext)
    const [shouldSubmit, setShouldSubmit] = React.useState(false)
    const [text, setText] = React.useState('')

    const drawerWidth = useLiveQuery(async () => {
        let w = await db.settings.get("drawerWidth")
        if (w === undefined) {
            w = {
                value: 25
            }
        }
        return w.value
    }, [], 25)

    React.useEffect(() => {
        function submit() {
            device.sendText(text)
            setText('')
            setShouldSubmit(false)
        }
        if (shouldSubmit) {
            submit()
        }
    }, [shouldSubmit])

    return (
        <Box
            spacing={1}
            sx={{
                position: "fixed",
                right: "1em",
                bottom: 0,
                width: `calc(${drawerWidth}vw - 1em)`,
                zIndex: 9999,
                background: theme.palette.background.default,
            }}
        >
            <Stack spacing={1} sx={{ margin: 1 }}>
                <Divider />
                <TextField
                    label="Send Message"
                    placeholder="Let your voice be heard."
                    fullWidth
                    slotProps={{
                        input: {
                            endAdornment:
                                <Tooltip
                                    title="Send"
                                >
                                    <span>
                                        <IconButton
                                            size='small'
                                            disabled={text.length === 0}
                                            onClick={() => setShouldSubmit(true)}
                                            loading={shouldSubmit}
                                            aria-label="Send"
                                        >
                                            <SendIcon fontSize='small' />
                                        </IconButton>
                                    </span>
                                </Tooltip>

                        }
                    }}
                    value={text}
                    onChange={event => setText(event.target.value)}
                />
            </Stack>
        </Box>
    )
}


function MessageDrawer() {

    const bottom = React.useRef()

    const messages = useLiveQuery(() => {
        return db.messages.toArray()
    }, [], [])

    messages.sort((a, b) => a.rxTime - b.rxTime)

    React.useEffect(() => {
        bottom.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            <DrawerTopper />
            <Stack spacing={1} sx={{ margin: 1 }} >
                <MessageArea />
                {messages.map(message => <MessageCard {...message} key={message.id} />)}
                <Box sx={{ height: "64px" }} ref={bottom} />
            </Stack>
        </>
    )
}

export default MessageDrawer