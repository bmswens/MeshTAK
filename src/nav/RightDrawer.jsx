// React
import React from 'react'

// MUI
import { Drawer } from '@mui/material'

// Prop Types
import PropTypes from 'prop-types'

// Custom
import MessageDrawer from './drawers/messages/MessageDrawer'
import NodeDrawer from './drawers/nodes/NodeDrawer'

const RightDrawer = React.createContext({
    next: /* v8 ignore next */ () => { },
    close: /* v8 ignore next */ () => { }
})

const drawers = {
    messages: MessageDrawer,
    nodes: NodeDrawer
}


function RightDrawerProvider(props) {

    const [open, setOpen] = React.useState(false)
    const [CurrentDrawer, setDrawer] = React.useState(null)
    const [upNext, setNext] = React.useState(null)
    const [data, setData] = React.useState({})

    // probably make this a setting later
    const drawerWidth = "15vw"

    function next(target, opts) {
        setNext(target)
        if (opts === undefined) {
            opts = {}
        }
        setData(opts)
    }

    function close() {
        setOpen(false)
    }

    // On Deck
    React.useEffect(() => {
        if (upNext !== null && open) {
            setOpen(false)
        }
        else if (upNext !== null && !open) {
            let NextDrawer = drawers[upNext]
            setDrawer(<NextDrawer {...data} />)
            setNext(null)
            setTimeout(() => setOpen(true), 200)
        }
    }, [upNext, open, data])

    return (
        <RightDrawer.Provider value={{ next, close }}>
            {props.children}
            <Drawer
                anchor="right"
                open={open}
                onClose={close}
                variant="persistent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                {CurrentDrawer}
            </Drawer>
        </RightDrawer.Provider>
    )
}

RightDrawerProvider.propTypes = {
    children: PropTypes.any
}

export default RightDrawer
export { RightDrawerProvider }