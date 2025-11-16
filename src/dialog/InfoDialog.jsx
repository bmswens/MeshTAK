// React
import React from 'react'

// MUI
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';
import BugReportIcon from '@mui/icons-material/BugReport';

// Prop Types
import PropTypes from 'prop-types'


function InfoDialog(props) {

    const {open, close} = props

    return (
        <Dialog
            open={open}
            onClose={close}
            scroll="body"
        >
            <DialogTitle align="center">
                About MeshTAK
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} alignItems="center" >
                    <img src="/MeshTAK-512.png" style={{height: "256px", width: "256px"}} alt="MeshTAK" />
                    <Divider />
                    <Typography align="center">
                        MeshTAK is a progressive web app, which enables text messaging, location sharing, COT data, and more over a decentralized mesh network.
                    </Typography>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                >
                    Close
                </Button>
                <Box sx={{flexGrow: 1}} />
                <Tooltip
                    title="Bug Report"
                >
                    <IconButton
                        href="https://github.com/bmswens/MeshTAK/issues/new"
                        target="_blank"
                    >
                        <BugReportIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title="Source Code"
                >
                    <IconButton
                        href="https://github.com/bmswens/MeshTAK"
                        target="_blank"
                    >
                        <GitHubIcon fontSize="large" />
                    </IconButton>
                </Tooltip>
            </DialogActions>
        </Dialog>
    )
}

InfoDialog.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func
}

export default InfoDialog