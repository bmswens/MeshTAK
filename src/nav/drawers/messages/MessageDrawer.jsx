// React
import React from 'react'

// MUI
import { Stack } from '@mui/material'

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// Custom
import DrawerTopper from '../DrawerTopper'
import db from '../../../db';
import MessageCard from './MessageCard';


function MessageDrawer() {

    const messages = useLiveQuery(() => {
        return db.messages.toArray()
    }, [], [])

    messages.sort((a, b) => a.rxTime - b.rxTime)

    return (
        <>
            <DrawerTopper />
            <Stack spacing={1} sx={{margin: 1}}>
                {messages.map(message => <MessageCard {...message} key={message.id} />)}
            </Stack>
        </>
    )
}

export default MessageDrawer