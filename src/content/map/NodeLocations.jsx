// React
import React from 'react'

// leaflet
import { Marker, Popup } from 'react-leaflet'

// Dexie
import { useLiveQuery } from 'dexie-react-hooks'

// custom
import DeviceContext from '../../context/DeviceContext'
import db from '../../db'

function NodeLocations() {

    const { device } = React.useContext(DeviceContext)

    const locations = useLiveQuery(() => {
        return db.locations.toArray()
    }, [], [])

    const display = useLiveQuery(async () => {
        let setting = await db.settings.get("map.nodelayer.display")
        if (setting === undefined) {
            setting = {
                value: true
            }
        }
        return setting.value
    }, [], [])

    if (device === null || !display) {
        return null
    }

    return (
        <div data-testid="node-layer">
            {
                locations.map(location => {
                    return (
                        <Marker position={[location.lat, location.lon]} key={location.nodeNum} data-testid={`node-marker-${location.nodeNum}`}>
                            <Popup>
                                {location.nodeNum}: {location.lastSeen.toISOString()}
                            </Popup>
                        </Marker>
                    )
                })
            }
        </div>
    )

}

export default NodeLocations