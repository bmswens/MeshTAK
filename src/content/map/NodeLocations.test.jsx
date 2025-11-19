import { render, screen, waitFor } from "@testing-library/react"
import UserLocation from "./UserLocation"
import { MapContainer } from "react-leaflet"
import NodeLocations from "./NodeLocations"
import DeviceContext from "../../context/DeviceContext"
import db from "../../db"


describe('<NodeLocations>', function () {
    beforeAll(async () => {
        await db.locations.upsert(1, {lat: 39.833333, lon: -98.583333, lastSeen: new Date()})
    })
    beforeEach(async () => {
        await db.settings.delete("map.nodelayer.display")
    })
    it("should be empty with no device", async function () {
        render(
            <DeviceContext.Provider value={{device: null}}>
                <MapContainer
                    center={[39.833333, -98.583333]}
                    zoom={5}
                    style={{
                        height: "calc(100vh - 64px)",
                        width: "100%"
                    }}
                    attributionControl={false}
                >
                    <NodeLocations />
                </MapContainer>
            </DeviceContext.Provider>
        )
        await waitFor(() => {
            let div = screen.queryByTestId("node-layer")
            expect(div).toBeNull()
        })
    })
    it("should be empty if disabled in settings", async function() {
        await db.settings.upsert('map.nodelayer.display', {value: false})
        render(
            <DeviceContext.Provider value={{device: true}}>
                <MapContainer
                    center={[39.833333, -98.583333]}
                    zoom={5}
                    style={{
                        height: "calc(100vh - 64px)",
                        width: "100%"
                    }}
                    attributionControl={false}
                >
                    <NodeLocations />
                </MapContainer>
            </DeviceContext.Provider>
        )
        await waitFor(() => {
            let div = screen.queryByTestId("node-layer")
            expect(div).toBeNull()
        })
    })
    it("should be able to display nodes", async function() {
        render(
            <DeviceContext.Provider value={{device: true}}>
                <MapContainer
                    center={[39.833333, -98.583333]}
                    zoom={5}
                    style={{
                        height: "calc(100vh - 64px)",
                        width: "100%"
                    }}
                    attributionControl={false}
                >
                    <NodeLocations />
                </MapContainer>
            </DeviceContext.Provider>
        )
        await waitFor(() => {
            let div = screen.getByAltText("Marker")
            // let div = screen.queryByTestId("node-layer")
            expect(div).not.toBeNull()
            // expect(div.childNodes.length).toEqual(1)
        })
    })
})