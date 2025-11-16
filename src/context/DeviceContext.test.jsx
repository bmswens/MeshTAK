import { render, screen, waitFor } from '@testing-library/react'
import { vi, vitest } from 'vitest'
import DeviceContext, { DeviceContextProvider } from './DeviceContext'
import React from 'react'
import userEvent from '@testing-library/user-event'
import db from '../db'

function Tester() {
    const { connect, disconnect } = React.useContext(DeviceContext)

    return (
        <>
            <button onClick={() => connect("serial")}>connect</button>
            <button onClick={() => connect("bluetooth")}>bluetooth</button>
            <button onClick={disconnect}>disconnect</button>
        </>
    )
}

const { messageSubscription, disconnect } = vi.hoisted(() => {
    return { 
        messageSubscription: vi.fn(),
        disconnect: vi.fn()
     }
})

const { MockMesh } = vi.hoisted(() => {
    class MockMesh {
        constructor(transport) {
            this.events = {
                onMessagePacket: {
                    subscribe: messageSubscription
                },
                onPositionPacket: {
                    subscribe: vitest.fn()
                },
                onMyNodeInfo: {
                    subscribe: vitest.fn()
                },
                onNodeInfoPacket: {
                    subscribe: vitest.fn()
                }
            }
            this.configure = async () => {}
            this.disconnect = disconnect
        }
    }
    return { MockMesh }
})


describe('<DeviceContextProvider>', function () {
    beforeEach(() => {
        vi.mock(import('@meshtastic/core'), () => {
            return {
                MeshDevice: MockMesh
            }
        })
        vi.mock(import("@meshtastic/transport-web-serial"), () => {
            return {
                TransportWebSerial: {
                    create: vitest.fn()
                }
            }
        })
        vi.mock(import('@meshtastic/transport-web-bluetooth'), () => {
            return {
                TransportWebBluetooth: {
                    create: vitest.fn()
                }
            }
        })
    })
    it("should allow the user to connect via serial", async function () {
        let user = await userEvent.setup()
        render(
            <DeviceContextProvider>
                <Tester />
            </DeviceContextProvider>
        )
        let button = screen.getByRole("button", { name: "connect" })
        await user.click(button)
        await waitFor(() => {
            expect(messageSubscription).toHaveBeenCalled()
        })
    })
    it("should allow the user to connect via bluetooth", async function () {
        let user = await userEvent.setup()
        render(
            <DeviceContextProvider>
                <Tester />
            </DeviceContextProvider>
        )
        let button = screen.getByRole("button", { name: "bluetooth" })
        await user.click(button)
        await waitFor(() => {
            expect(messageSubscription).toHaveBeenCalled()
        })
    })
    it("should handle notifications allowed", async function() {
        Notification.requestPermission = vi.fn().mockResolvedValue("granted")
        let user = userEvent.setup()
        render(
            <DeviceContextProvider>
                <Tester />
            </DeviceContextProvider>
        )
        let button = screen.getByRole("button", { name: "bluetooth" })
        await user.click(button)
        await waitFor(async () => {
            expect(messageSubscription).toHaveBeenCalled()
            expect(Notification.requestPermission).toHaveBeenCalled()
            let setting = await db.settings.get("notifications")
            expect(setting.value).toEqual(true)
        })
    })
    it("should allow a user to disconnect", async function() {
        let user = await userEvent.setup()
        render(
            <DeviceContextProvider>
                <Tester />
            </DeviceContextProvider>
        )
        let button = screen.getByRole("button", { name: "connect" })
        await user.click(button)
        await waitFor(() => {
            expect(messageSubscription).toHaveBeenCalled()
        })
        let disconnectButton = screen.getByRole("button", { name: "disconnect"})
        await user.click(disconnectButton)
        await waitFor(() => {
            expect(disconnect).toHaveBeenCalled()
        })
    })
})