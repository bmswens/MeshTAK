import startSubscriptions, { subscribeMessage, subscribeNodeInfo} from './subscriptions'
import db from './index'

describe('subscribeMessage()', function() {
    it("should add messages to the db", async function() {
        await subscribeMessage({id: 1, data: "My Message"})
        let message = await db.messages.get(1)
        expect(message.data).toEqual("My Message")
    })
})

describe('subscribeNodeInfo', function() {
    it("should add new nodes to the db", async function() {
        await subscribeNodeInfo({
            num: 1,
            lastHeard: 100000,
            channel: 1
        })
        let node = await db.nodes.get(1)
        expect(node.channel).toEqual(1)
    })
    it("should update existing nodes in db", async function() {
        await db.nodes.add({
            nodeNum: 2,
            longName: "Start Node",
            shortName: "STRT"
        })
        await subscribeNodeInfo({
            num: 2,
            user: {
                longName: "New Name",
                shortName: "NEW"
            }
        })
        let node = await db.nodes.get(2)
        expect(node.longName).toEqual("New Name")
        expect(node.shortName).toEqual("NEW")
    })
    it("should update positions in db", async function() {
        await subscribeNodeInfo({
            num: 1,
            lastHeard: 100000,
            channel: 1,
            position: {
                time: 10000,
                latitudeI: 0,
                longitudeI: 0
            }
        })
        let node = await db.locations.get(1)
        expect(node.lat).toEqual(0)
        expect(node.lon).toEqual(0)
    })
})

describe('startSubscriptions()', function() {
    it("should start subscribing", function() {
        const device = {
            events: {
                onMessagePacket: {
                    subscribe: vitest.fn()
                },
                onNodeInfoPacket: {
                    subscribe: vitest.fn()
                },
            }
        }
        startSubscriptions(device)
        expect(device.events.onMessagePacket.subscribe).toHaveBeenCalledWith(subscribeMessage)
        expect(device.events.onNodeInfoPacket.subscribe).toHaveBeenCalledWith(subscribeNodeInfo)
    })
})