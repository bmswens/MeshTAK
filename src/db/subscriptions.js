import db from './index'

async function subscribeMessage(message) {
    await db.messages.add(message)
    let notificationsSetting = await db.settings.get("notifications")
    if (notificationsSetting !== undefined && notificationsSetting.value) {
        let sender = await db.nodes.get(message.from)
        if (sender === undefined) {
            sender = {
                longName: "Unknown"
            }
        }
        navigator.serviceWorker.ready.then(registration => {
            registration.showNotification(
                `New Message`,
                {
                    body: `${sender.longName}: ${message.data}`,
                    icon: 'public/MeshTAK-192.png'
                }
            )
        })
    }
}

async function subscribeNodeInfo(nodeInfo) {
    let data = {
        nodeNum: nodeInfo.num,
        snr: nodeInfo.snr,
        lastHeard: new Date(nodeInfo.lastHeard * 1000),
        channel: nodeInfo.channel,
        longName: nodeInfo.user?.longName,
        shortName: nodeInfo.user?.shortName, 
        teams: [],
        nickname: '',
        favorite: nodeInfo.isFavorite
    }
    let node = await db.nodes.get(data.nodeNum)
    if (!node) {
        await db.nodes.add(data)
    }
    else {
        let updated = {
            ...node,
            snr: data.snr,
            lastHeard: data.lastHeard,
            channel: data.channel,
            longName: data.longName,
            shortName: data.shortName
        }
        await db.nodes.update(updated.nodeNum, updated)
    }
    if (nodeInfo.position) {
        let position = {
            nodeNum: data.nodeNum,
            lastSeen: new Date(nodeInfo.position.time * 1000),
            lat: nodeInfo.position.latitudeI / 1e7, 
            lon: nodeInfo.position.longitudeI / 1e7,
            alt: nodeInfo.position.altitude
        }
        await db.locations.upsert(position.nodeNum, position)
    }
}

function startSubscriptions(device) {
    device.events.onMessagePacket.subscribe(subscribeMessage)
    device.events.onNodeInfoPacket.subscribe(subscribeNodeInfo)
}

export default startSubscriptions
export {
    subscribeMessage,
    subscribeNodeInfo
}