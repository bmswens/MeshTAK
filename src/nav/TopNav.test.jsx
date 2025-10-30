import { render, screen, waitFor } from '@testing-library/react';
import TopNav from './TopNav'
import { RightDrawerProvider } from './RightDrawer';
import userEvent from '@testing-library/user-event'

describe('<TopNav>', function() {
    it("should display the app name", function() {
        render(
            <TopNav />
        )
        let title = screen.getByAltText("MeshTAK")
        expect(title).not.toBeNull()
    })
    it("should be able to open and close the <MessageDrawer />", async function() {
        const user = userEvent.setup()
        render(
            <RightDrawerProvider>
                <TopNav />
            </RightDrawerProvider>
        )
        let button = screen.getByRole("button", {name: "Messages"})
        await user.click(button)
        await waitFor(async () => {
            let closeButton = screen.getByRole("button", {name: "Close"})
            await user.click(closeButton)
        })
        await waitFor(() => {
            let missingButton = screen.queryByRole("button", {name: "Close"})
            expect(missingButton).toBeNull()
        })
    })
    it("should reopen when clicked on already selected drawer", async function() {
        const user = userEvent.setup()
        render(
            <RightDrawerProvider>
                <TopNav />
            </RightDrawerProvider>
        )
        let button = screen.getByRole("button", {name: "Messages"})
        await user.click(button)
        await waitFor(async () => {
            let closeButton = screen.getByRole("button", {name: "Close"})
            expect(closeButton).not.toBeNull()
            await user.click(closeButton)
        })
        await waitFor(() => {
            let notMissingButton = screen.queryByRole("button", {name: "Close"})
            expect(notMissingButton).toBeNull()
        })
    })
})