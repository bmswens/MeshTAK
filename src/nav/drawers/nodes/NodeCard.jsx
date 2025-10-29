// React
import React from 'react'

// MUI
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, Chip, Grid, IconButton, Tooltip} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import MessageIcon from '@mui/icons-material/Message'
import MapIcon from '@mui/icons-material/Map';
import GroupsIcon from '@mui/icons-material/Groups';
import EditTeamsDialog from '../../../dialog/EditTeamsDialog'
import db from '../../../db'


function NodeCard(props) {

    const {
        shortName,
        longName,
        lastHeard,
        favorite,
        teams,
        nodeNum
    } = props

    const lastHeardString = lastHeard ? lastHeard.toISOString() : ""
    const teamsMapper = teams ? teams : []

    async function handleFavorite() {

    }

    const [open, setOpen] = React.useState(false)

    async function setTeams(teams) {
        await db.nodes.update(nodeNum, {teams})
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar variant='rounded' sx={{width: "55px"}}>
                        {shortName}
                    </Avatar>
                }
                title={longName}
                subheader={`Last Contact: ${lastHeardString}`}
                action={
                    <Tooltip
                        title={favorite ? "Unfavorite" : "Favorite"}
                    >
                        <IconButton
                            onClick={handleFavorite}
                        >
                            {favorite ? <StarIcon /> : <StarOutlineIcon />}
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                <Grid container spacing={1}>
                    {teamsMapper.map(team => {
                        return (
                            <Grid size={{xs: 12, md: 6, lg: 2}} key={`${shortName}-${team}`}>
                                <Chip label={team} />
                            </Grid>
                        )
                    })}
                </Grid>
            </CardContent>
            <CardActions>
                <EditTeamsDialog
                    open={open}
                    close={() => setOpen(false)}
                    teams={teams}
                    submit={setTeams}
                />
                <Tooltip
                    title="Modify Teams"
                >
                    <IconButton
                        onClick={() => setOpen(true)}
                    >
                        <GroupsIcon />
                    </IconButton>
                </Tooltip>
                <Box sx={{flexGrow: 1}} />
                <Tooltip
                    title="Show On Map"
                >
                    <IconButton>
                        <MapIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip
                    title="Direct Message"
                >
                    <IconButton>
                        <MessageIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default NodeCard