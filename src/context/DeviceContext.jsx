// React
import React from 'react'


// Meshtastic
import { MeshDevice } from "@meshtastic/core";
import { TransportWebSerial } from "@meshtastic/transport-web-serial";
import { TransportWebBluetooth } from '@meshtastic/transport-web-bluetooth'

// TS Log
// Because utils isn't in the browser
import {Logger} from 'tslog'

// Prop Types
import PropTypes from 'prop-types'

// custom
import startSubscriptions from '../db/subscriptions';


const DeviceContext = React.createContext({
    device: null,
    connect: /* v8 ignore next */ async () => {},
    disconnect: /* v8 ignore next */ async () => {}
})


function DeviceContextProvider(props) {

    const [device, setDevice] = React.useState(null)

    async function connect(method) {
        let transport
        if (method === "serial") {
            transport = await TransportWebSerial.create()
        }
        else {
            transport = await TransportWebBluetooth.create()
        }
        const logger = new Logger({type: "hidden"})
        const dev = new MeshDevice(transport)
        dev.log = logger
        startSubscriptions(dev)
        // dev.events.onMessagePacket.subscribe(console.log)
        // dev.events.onPositionPacket.subscribe(console.log)
        // dev.events.onMyNodeInfo.subscribe(console.log)
        // dev.events.onNodeInfoPacket.subscribe(console.log)
        await dev.configure()
        setDevice(dev)
    }

    async function disconnect() {
        await device.disconnect()
        setDevice(null)
    }

    return (
        <DeviceContext.Provider value={{device, connect, disconnect}}>
            {props.children}
        </DeviceContext.Provider>
    )
}

DeviceContextProvider.propTypes = {
    children: PropTypes.any
}

export default DeviceContext
export {DeviceContextProvider}