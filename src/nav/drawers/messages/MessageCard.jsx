// React
import React from 'react'

// MUI
import {Avatar, Box, Card, CardActions, CardContent, CardHeader, Chip, Grid, IconButton, Skeleton, Typography, Tooltip} from '@mui/material'
import ReplyIcon from '@mui/icons-material/Reply';

// custom
import db from '../../../db'


function MessageCard(props) {

    const {
        from,
        rxTime,
        data
    } = props

    const [sender, setSender] = React.useState(null)

    React.useEffect(() => {
        if (sender === null) {
            db.nodes.get(from)
            .then(node => {
                if (node) {
                    setSender(node)
                }
                else {
                    setSender({
                        longName: "Unknown",
                        shortName: "UNK"
                    })
                }
            })
        }
    }, [sender, from])

    if (sender === null) {
        return (
            <Skeleton
                variant="rectangular"
                width="100%"
                height="300px"
            />
        )
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar variant='rounded' sx={{width: "55px"}}>
                        {sender.shortName}
                    </Avatar>
                }
                title={sender.longName}
                subheader={rxTime.toISOString()}
            />
            <CardContent>
                <Typography>
                    {data}
                </Typography>
            </CardContent>
            <CardActions>
                <Box sx={{flexGrow: 1}} />
                <Tooltip
                    title="Reply"
                >
                    <IconButton>
                        <ReplyIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default MessageCard