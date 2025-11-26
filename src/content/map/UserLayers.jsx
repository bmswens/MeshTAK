// React
import React from 'react'

// Dexie
import { useLiveQuery } from 'dexie-react-hooks'

// custom
import UserLayer from './UserLayer'
import db from '../../db'

function UserLayers() {

    const layers = useLiveQuery(async () => {
        // Dexie doesn't support bool data types, must use int for truthy
        let layers = await db.layers.where("display").equals(1).toArray()
        return layers
    }, [], [])

    return layers.map(layer => <UserLayer {...layer} key={layer.name} />)
}

export default UserLayers