// React
import React from 'react'

// MUI
import {Stack} from '@mui/material'
// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// Custom
import DrawerTopper from '../DrawerTopper'
import db from '../../../db'
import NodeCard from './NodeCard'


function NodeDrawer() {

    const nodes = useLiveQuery(() => {
        return db.nodes.toArray()
    }, [], [])

    return (
        <>
        <DrawerTopper />
        <Stack spacing={1} sx={{margin: 1}}>
            {nodes.map(node => <NodeCard {...node} key={node.nodeNum} />)}
        </Stack>
        </>
    )
}

export default NodeDrawer