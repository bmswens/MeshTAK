// React
import React from 'react'

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// custom
import db from '../db'
import UserLocation from './map/UserLocation'

function Map() {

    const locations = useLiveQuery(() => {
        return db.locations.toArray()
    }, [], [])

    return (
        <MapContainer 
            center={[39.833333, -98.583333]} 
            zoom={5} 
            style={{
                height: "calc(100vh - 64px)",
                width: "100%"
            }}
            attributionControl={false}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                className='map-tiles'
                // TODO: Add tile caching capability
                // tile load start can be used to intercept src and rewrite if in cache
                // eventHandlers={{
                //     tileloadstart: (x, y) => x.tile.src = "http://bad.com"
                // }}
            />
            <UserLocation />
            {
                locations.map(location => {
                    return (
                        <Marker position={[location.lat, location.lon]} key={location.nodeNum}>
                            <Popup>
                                {location.nodeNum}: {location.lastSeen.toISOString()}
                            </Popup>
                        </Marker>
                    )
                })
            }
        </MapContainer>
    )

}

export default Map