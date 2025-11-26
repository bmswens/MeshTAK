// React
import React from 'react'

// MUI
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import UploadFileIcon from '@mui/icons-material/UploadFile';

// Prop Types
import PropTypes from 'prop-types'

// custom
import utils from '../db/utils';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
})

function UploadButton(props) {

    const { onChange } = props

    return (
        <Button
            variant="contained"
            component="label"
            role={undefined}
            tabIndex={-1}
            startIcon={<UploadFileIcon />}
            fullWidth
        >
            Upload GeoJSON
            <VisuallyHiddenInput
                type="file"
                onChange={onChange}
                data-testid="file-input"
            />
        </Button>
    )
}

UploadButton.propTypes = {
    onChange: PropTypes.func
}

function EditTeamsDialog(props) {

    const { open, close } = props

    const [name, setName] = React.useState("")
    const [file, setFile] = React.useState(null)
    const [shouldSubmit, setShouldSubmit] = React.useState(false)
    const [error, setError] = React.useState(false)

    React.useEffect(() => {
        if (shouldSubmit) {
            utils.featureCollectionToTable(name, file[0])
            .then(() => {
                setShouldSubmit(false)
                close()
            })
            .catch(err => {
                setError(true)
                setShouldSubmit(false)
            })
        }
    }, [shouldSubmit, name, file])

    React.useEffect(() => {
        setError(false)
    }, [file])

    const disabled = file === null || name.length === 0

    return (
        <Dialog
            open={open}
            onClose={close}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle align="center">
                Add A Layer
            </DialogTitle>
            <DialogContent>
                <Stack spacing={1} sx={{marginTop: 1}}>
                    <TextField
                        label="Layer Name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                        fullWidth
                    />
                    <UploadButton
                        onChange={event => setFile(event.target.files)}
                    />
                    { error ? <Typography variant="body2" color="error" >File must be geo json, array of geo json, or newline geojson.</Typography> : null }
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={close}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => setShouldSubmit(true)}
                    disabled={disabled}
                    loading={shouldSubmit}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

EditTeamsDialog.propTypes = {
    open: PropTypes.bool,
    close: PropTypes.func
}

export default EditTeamsDialog