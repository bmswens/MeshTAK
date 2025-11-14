import { render, screen, waitFor } from "@testing-library/react"
import DeviceContext from "../context/DeviceContext"
import ConnectionButton from "./ConnectionButtion"
import userEvent from '@testing-library/user-event'
import { vitest } from "vitest"


describe('<ConnectionButton> unconnected', function() {
    it("should open the connection dialog when clicked", async function() {
        let user = await userEvent.setup()
        render(
            <DeviceContext.Provider value={{device: null}}>
                <ConnectionButton />
            </DeviceContext.Provider>
        )
        let button = screen.getByRole("button", { name: "Connect"})
        await user.click(button)
        await waitFor(() => {
            let dialog = screen.getByRole("dialog")
            expect(dialog).not.toBeNull()
        })
        let cancel = screen.getByRole("button", { name: "Close"})
        await user.click(cancel)
        await waitFor(() => {
            let missingDialog = screen.queryByRole("dialog")
            expect(missingDialog).toBeNull()
        })
    })
})

describe('<ConnectionButton> connected', function() {
    it("should disconnection on click", async function() {
        let user = await userEvent.setup()
        let disconnect = vitest.fn()
        render(
            <DeviceContext.Provider value={{device: "not null", disconnect}}>
                <ConnectionButton />
            </DeviceContext.Provider>
        )
        let button = screen.getByRole("button", { name: "Disconnect" })
        await user.click(button)
        expect(disconnect).toHaveBeenCalled()
    })
})