// React
import React from 'react'

// leaflet
import { useLeafletContext } from '@react-leaflet/core'
import L from 'leaflet'

// prop types
import PropTypes from 'prop-types'


function Feature(props) {

    const context = useLeafletContext()
    const { geojson } = props

    React.useEffect(() => {
        // TODO: Have this open the <InfoDrawer>
        // function eventHandlers(feature, layer) {
        //     layer.on({
        //         click: () => alert("clicked!")
        //     })
        // }
        // let feature = L.geoJSON(geojson, {
        //     onEachFeature: eventHandlers
        // })
        let feature = L.geoJSON(geojson)
        feature.addTo(context.map)
        return () => {
            context.map.removeLayer(geojson)
        }
    }, [geojson])

    return null
}

Feature.propTypes = {
    geojson: PropTypes.object
}

export default Feature