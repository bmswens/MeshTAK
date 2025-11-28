// React
import React from 'react'

// leaflet
import { useLeafletContext } from '@react-leaflet/core'
import L from 'leaflet'

// prop types
import PropTypes from 'prop-types'


function Feature(props) {

    const { geojson, style } = props
    const context = useLeafletContext()
    const self = React.useRef()

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
        self.current = L.geoJSON(geojson, {
            style
        })
        context.map.addLayer(self.current)
        return () => {
            context.map.removeLayer(self.current)
        }
    }, [geojson, style])

    return null
}

Feature.propTypes = {
    geojson: PropTypes.object,
    style: PropTypes.object
}

export default Feature