// React
import React from 'react'

// MUI
import {Box, Divider, IconButton, Stack, Tooltip} from '@mui/material'
import {useTheme} from '@mui/material/styles'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// Prop Types
import PropTypes from 'prop-types'

// custom
import RightDrawer from '../RightDrawer'

function DrawerTopper(props) {

    const rightDrawer = React.useContext(RightDrawer)
    const theme = useTheme()

    return (
        <>
            <Box
                sx={{
                    padding: theme.spacing(0, 1),
                    ...theme.mixins.toolbar
                }}
                direction="row"
            />
            <Stack
                spacing={1}
                direction="row"
                sx={{
                    margin: 1
                }}
            >
                <Tooltip
                    title="Close"
                >
                    <IconButton
                        onClick={rightDrawer.close}
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Tooltip>
                {props.children}
            </Stack>
            <Divider />
        </>
    )
}

DrawerTopper.propTypes = {
    children: PropTypes.any
}

export default DrawerTopper