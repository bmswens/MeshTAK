import { render, screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import EditTeamsDialog from './EditTeamsDialog'


describe('<EditTeamsDialog>', function() {
    it("should allow the user to cancel", async function() {
        let user = userEvent.setup()
        const close = vitest.fn()
        render(
            <EditTeamsDialog
                open={true}
                close={close}
            />
        )
        let button = screen.getByRole("button", { name: "Cancel" })
        await user.click(button)
        expect(close).toHaveBeenCalled()
    })
    it("should allow the user to update teams", async function() {
        let user = userEvent.setup()
        const close = vitest.fn()
        const submit = vitest.fn()
        render(
            <EditTeamsDialog
                open={true}
                close={close}
                teams={[]}
                submit={submit}
            />
        )
        let textbox = screen.getByLabelText("Teams")
        await user.type(textbox, "Team 1{enter}")
        let button = screen.getByRole("button", { name: "Confirm" })
        await user.click(button)
        expect(submit).toHaveBeenCalledWith(["Team 1"])
    })
})