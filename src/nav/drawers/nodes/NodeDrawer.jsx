// React
import React from 'react'

// MUI
import {IconButton, Stack, TextField, Tooltip} from '@mui/material'
import SortIcon from '@mui/icons-material/Sort';

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// Custom
import DrawerTopper from '../DrawerTopper'
import db from '../../../db'
import NodeCard from './NodeCard'
import utils from './utils';


function NodeDrawer() {

    const [searchText, setSearchText] = React.useState('')

    const nodes = useLiveQuery(() => {
        return db.nodes.toArray()
    }, [], [])

    const finalNodes = utils.search(nodes, searchText)

    return (
        <>
        <DrawerTopper>
            <TextField
                label="Search"
                fullWidth
                value={searchText}
                onChange={event => setSearchText(event.target.value)}
                placeholder='Regex enabled search'
            />
            <Tooltip
                title="Sort Method"
            >
                <IconButton

                >
                    <SortIcon />
                </IconButton>
            </Tooltip>
        </DrawerTopper>
        <Stack spacing={1} sx={{margin: 1}}>
            {finalNodes.map(node => <NodeCard {...node} key={node.nodeNum} />)}
        </Stack>
        </>
    )
}

export default NodeDrawer