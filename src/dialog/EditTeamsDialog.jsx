// React
import React from 'react'

// MUI
import {Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'


function EditTeamsDialog(props) {

    const {open, close, submit, teams} = props
    
    const [value, setValue] = React.useState(teams)

    function onChange(event, newValue) {
        setValue(newValue)
    }

    async function onClick() {
        await submit(value)
        close()
    }

    const disabled = new Set(teams).symmetricDifference(new Set(value)).size === 0

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle align="center">
                Edit Teams
            </DialogTitle>
            <DialogContent>
                <Autocomplete
                    options={teams}
                    multiple
                    freeSolo
                    limitTags={5}
                    renderInput={params => <TextField label="Teams" helperText="Press enter after each team name." {...params} />}
                    value={value}
                    onChange={onChange}
                    sx={{marginTop: 1}}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={onClick}
                    disabled={disabled}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default EditTeamsDialog