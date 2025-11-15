import { render, screen, waitFor } from "@testing-library/react"
import LogoButton from "./LogoButton"
import userEvent from '@testing-library/user-event'
import { vitest } from "vitest"


describe('<InfoDialog>', function() {
    it("should open and close the info dialog", async function() {
        let user = await userEvent.setup()
        render(
            <LogoButton />
        )
        let button = screen.getByRole("button", { name: "About MeshTAK"})
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
