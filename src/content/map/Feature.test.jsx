import {render, screen} from '@testing-library/react'
import Feature from './Feature'
import { MapContainer } from "react-leaflet"

describe('<Feature>', function() {
    it("should render a marker", async function () {
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
                    <Feature 
                        geojson={{
                            type: "Feature",
                            geometry: {
                                type: "Point",
                                coordinates: [0, 0]
                            }
                        }}
                    />
                </MapContainer>
        )
        let marker = screen.getByAltText("Marker")
        expect(marker).not.toBeNull()
    })
})