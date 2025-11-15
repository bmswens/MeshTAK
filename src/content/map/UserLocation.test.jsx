import { render, screen, waitFor } from "@testing-library/react"
import UserLocation from "./UserLocation"
import { MapContainer } from "react-leaflet"


describe('<UserLocation>', function () {
    beforeEach(() => {
        navigator.geolocation.getCurrentPosition = () => {
            return {
                loading: false,
                latitude: 0,
                longitude: 0,
                heading: 0
            }
        }
        navigator.geolocation.watchPosition = (callback) => {
            callback({
                coords: {
                    latitude: 0,
                    longitude: 0,
                    heading: null,
                }
            })
        }
    })
    it("should add a marker with the user's location", async function () {
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
                <UserLocation />
            </MapContainer>
        )
        await waitFor(() => {
            let div = screen.getByTestId('self-marker')
            expect(div).not.toBeNull()
            // console.log(divs)
        })
    })
})