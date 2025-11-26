// React
import React from 'react'

// Dexie
import { useLiveQuery } from 'dexie-react-hooks'

// custom
import Feature from './Feature'
import db from '../../db'

function UserLayer(props) {

    const { name } = props

    const rows = useLiveQuery(async () => {
        let rows = await db.layerData.where({layer: name}).toArray()
        return rows
    }, [], [])

    return rows.map((row, index) => <Feature geojson={row} key={`${name}-${index}`}/>)

}

export default UserLayer