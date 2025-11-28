// React
import React from 'react'

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// custom
import db from '../../../db';
import UserDefinedGeoLayer from './UserDefinedGeoLayer';

function UserDefinedLayers() {

    const layers = useLiveQuery(async () => {
        return await db.layers.toArray()
    }, [], [])

    return layers.map(layer => <UserDefinedGeoLayer {...layer} key={layer.id} />)
}

export default UserDefinedLayers