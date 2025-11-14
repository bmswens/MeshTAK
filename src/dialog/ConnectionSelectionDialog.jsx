// React
import React from 'react'

// MUI
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Radio, RadioGroup } from '@mui/material'

// Prop Types
import PropTypes from 'prop-types'

// Custom
import DeviceContext from '../context/DeviceContext'


function ConnectionSelectionDialog(props) {

    const {connect} = React.useContext(DeviceContext)
    const {open, close} = props
    
    const [selected, setSelected] = React.useState("bluetooth")
    function onChange(event) {
        setSelected(event.target.value)
    }

    const [loading, setLoading] = React.useState(false)

    async function onClick() {
        setLoading(true)
    }

    React.useEffect(() => {
        async function load() {
            await connect(selected)
            setLoading(false)
            close()
        }
        if (loading) {
            load()
        }
    }, [loading])

    return (
        <Dialog
            open={open}
            onClose={close}
        >
            <DialogTitle align="center">
                Connection Method
            </DialogTitle>
            <DialogContent>
                <RadioGroup
                    value={selected}
                    onChange={onChange}
                >
                    <FormControlLabel value="bluetooth" control={<Radio />} label="Bluetooth" />
                    <FormControlLabel value="serial" control={<Radio />} label="Serial" />
                </RadioGroup>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                >
                    Close
                </Button>
                <Button
                    variant="contained"
                    onClick={onClick}
                    loading={loading}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

ConnectionSelectionDialog.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func
}

export default ConnectionSelectionDialog