// React
import React from 'react'

// MUI
import { useTheme } from '@mui/material/styles'

// Usehooks
import { useGeolocation } from "@uidotdev/usehooks";

// leaflet
import { useLeafletContext } from '@react-leaflet/core'
import L from 'leaflet'

// Dexie
import { useLiveQuery } from "dexie-react-hooks";

// custom
import db from '../../db';


function makeSVG(color, heading) {
    let degrees = heading
    if (heading === null) {
        degrees = 0
    }
    return `
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg" background="none" transform="rotate(${degrees})" data-testid="self-marker" >
        <path d="M11.5731 3L18 21L11.5172 16.7461L5 20.9513L11.5731 3Z" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
}

function UserLocation() {

    const location = useGeolocation({ enableHighAccuracy: true })
    const context = useLeafletContext()
    const theme = useTheme()

    const [initial, setInitial] = React.useState(true)

    const centerOnLoad = useLiveQuery(async () => {
        let setting = await db.settings.get("centerOnLoad")
        return setting ? setting.value : true
    }, [], null)

    const settingName = "map.userlayer.display"

    const display = useLiveQuery(async () => {
        let setting = await db.settings.get(settingName)
        if (setting === undefined) {
            setting = {
                value: true
            }
        }
        return setting.value
    }, [], [])

    React.useEffect(() => {
        if (display && !location.loading && location.latitude !== null && location.longitude !== null) {
            const icon = L.divIcon({
                html: makeSVG(theme.palette.primary[theme.palette.mode], location.heading),
                iconSize: [48, 48],
                className: "empty-marker"
            })
            const marker = L.marker([location.latitude, location.longitude], { icon })
            const container = context.layerContainer || context.map
            container.addLayer(marker)
            if (initial && centerOnLoad) {
                context.map.setView([location.latitude, location.longitude], 10, { animate: true })
                setInitial(false)
            }
            else if (initial && centerOnLoad !== null) {
                setInitial(false)
            }
            return () => {
                container.removeLayer(marker)
            }
        }
    }, [location, context, initial, centerOnLoad, display])

    return null

}

export default UserLocation