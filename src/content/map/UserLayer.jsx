// React
import React from 'react'

// Dexie
import { useLiveQuery } from 'dexie-react-hooks'

// custom
import Feature from './Feature'
import db from '../../db'

function UserLayer(props) {

    const { id, style } = props

    const rows = useLiveQuery(async () => {
        let rows = await db.layerData.where({layer: id}).toArray()
        return rows
    }, [], [])

    return rows.map((row, index) => <Feature geojson={row} style={style} key={`${id}-${index}`}/>)

}

export default UserLayer