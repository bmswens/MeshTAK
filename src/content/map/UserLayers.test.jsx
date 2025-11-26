import { render, screen, waitFor } from '@testing-library/react'
import Feature from './Feature'
import { MapContainer } from "react-leaflet"
import db from '../../db'
import UserLayer from './UserLayer'
import UserLayers from './UserLayers'

describe('<Feature>', function () {
    beforeEach(async () => {
        await db.layers.add({id: 33, name: "My Layer", display: 1})
        await db.layerData.add({
            id: 44,
            geometry: {
                type: "Point",
                coordinates: [0, 0]
            },
            type: "Feature",
            name: "Center",
            layer: "My Layer"
        })
        await db.layerData.add({
            id: 45,
            geometry: {
                type: "Point",
                coordinates: [0, 0]
            },
            type: "Feature",
            name: "Center 2",
            layer: "Not My Layer",
        })
    })
    afterEach(async () => {
        await db.delete()
        await db.open()
    })
    it("should render data for the layer", async function () {
        render(
            <MapContainer
                center={[39.833333, -98.583333]}
                zoom={5}
                style={{
                    height: "calc(100vh - 64px)",
                    width: "100%"
                }}
                attributionControl={false}
            >
                <UserLayers />
            </MapContainer>
        )
        await waitFor(() => {
            let marker = screen.getAllByAltText("Marker")
            expect(marker.length).toEqual(1)
        })
    })
})