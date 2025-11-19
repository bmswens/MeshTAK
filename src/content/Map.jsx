// React
import React from 'react'

// Leaflet
import { MapContainer, TileLayer} from 'react-leaflet'

// custom
import UserLocation from './map/UserLocation'
import NodeLocations from './map/NodeLocations';

function Map() {

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
            <NodeLocations />
        </MapContainer>
    )

}

export default Map