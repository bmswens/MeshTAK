// React
import React from 'react'


// Meshtastic
import { MeshDevice } from "@meshtastic/core";
import { TransportWebSerial } from "@meshtastic/transport-web-serial";
import { TransportWebBluetooth } from '@meshtastic/transport-web-bluetooth'

// TS Log
// Because utils isn't in the browser
import { Logger } from 'tslog'

// Prop Types
import PropTypes from 'prop-types'

// custom
import startSubscriptions from '../db/subscriptions'
import db from '../db';


const DeviceContext = React.createContext({
    device: null,
    connect: /* v8 ignore next */ async () => { },
    disconnect: /* v8 ignore next */ async () => { }
})


function DeviceContextProvider(props) {

    const [device, setDevice] = React.useState(null)

    React.useEffect(() => {
        if (device !== null) {
            const statuses = ["granted", "denied"]
            if (!statuses.includes(Notification.permission)) {
                Notification.requestPermission()
                    .then(permission => {
                        if (permission === "granted") {
                            db.settings.upsert("notifications", { value: true })
                            navigator.serviceWorker.ready.then(registration => {
                                registration.showNotification(
                                    `Notifications enabled.`,
                                    {
                                        icon: 'public/MeshTAK-192.png'
                                    }
                                )
                            })
                        }
                        else {
                            db.settings.upsert("notifications", { value: false })
                        }
                    })
            }
        }
    }, [device])

    async function connect(method) {
        let transport
        if (method === "serial") {
            transport = await TransportWebSerial.create()
        }
        else {
            transport = await TransportWebBluetooth.create()
        }
        const logger = new Logger({ type: "pretty" })
        const dev = new MeshDevice(transport)
        dev.log = logger
        startSubscriptions(dev)
        await dev.configure()
        setDevice(dev)
    }

    async function disconnect() {
        await device.disconnect()
        setDevice(null)
    }

    return (
        <DeviceContext.Provider value={{ device, connect, disconnect }}>
            {props.children}
        </DeviceContext.Provider>
    )
}

DeviceContextProvider.propTypes = {
    children: PropTypes.any
}

export default DeviceContext
export { DeviceContextProvider }