import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import InfoDialog from './InfoDialog'


describe('<InfoDialog>', function() {
    it("should allow the user to close", async function() {
        let user = userEvent.setup()
        const close = vitest.fn()
        render(
            <InfoDialog
                open={true}
                close={close}
            />
        )
        let button = screen.getByRole("button", { name: "Close" })
        await user.click(button)
        expect(close).toHaveBeenCalled()
    })
})