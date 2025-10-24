import { render, screen, waitFor } from "@testing-library/react"
import DeviceContext from "../context/DeviceContext"
import userEvent from '@testing-library/user-event'
import { vitest } from "vitest"
import ConnectionSelectionDialog from "./ConnectionSelectionDialog"

describe('<ConnectionSelectionDialog>', function() {
    it("should be able to cancel", async function() {
        let user = await userEvent.setup()
        let close = vitest.fn()
        render(
            <ConnectionSelectionDialog
                open={true}
                close={close}
            />
        )
        let cancel = screen.getByRole("button", { name: "Cancel"})
        await user.click(cancel)
        expect(close).toHaveBeenCalled()
    })
    it("should be able to connect via bluetooth as default", async function() {
        let user = await userEvent.setup()
        let connect = vitest.fn()
        render(
            <DeviceContext.Provider value={{connect, device: null}}>
                <ConnectionSelectionDialog
                    open={true}
                    close={() => {}}
                />
            </DeviceContext.Provider>
        )
        let confirm = screen.getByRole("button", { name: "Confirm"})
        await user.click(confirm)
        expect(connect).toHaveBeenCalledWith("bluetooth")
    })
    it("should be able to connect via serial", async function() {
        let user = await userEvent.setup()
        let connect = vitest.fn()
        render(
            <DeviceContext.Provider value={{connect, device: null}}>
                <ConnectionSelectionDialog
                    open={true}
                    close={() => {}}
                />
            </DeviceContext.Provider>
        )
        let serial = screen.getByRole("radio", { name: "Serial" })
        await user.click(serial)
        let confirm = screen.getByRole("button", { name: "Confirm"})
        await user.click(confirm)
        expect(connect).toHaveBeenCalledWith("serial")
    })
})