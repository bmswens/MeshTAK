// React
import React from 'react'

// Leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function Map() {

    return (
        <MapContainer 
            center={[51.505, -0.09]} 
            zoom={13} 
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
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )

}

export default Map