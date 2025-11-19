import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import db from '../../../db';
import UserLayer from './UserLayer';
import NodeLayer from './NodeLayer';

describe('<NodeLayer>', function() {
    it("should allow the user to toggle on and off", async function() {
        const user = userEvent.setup()
        render(
            <NodeLayer />
        )
        let title = screen.getByText(/Node Layer/)
        await user.click(title)
        await waitFor(() => {
            let text = screen.getByText(/Display/)
            expect(text).not.toBeNull()
        })
        let checkbox = screen.getByRole("checkbox")
        await user.click(checkbox)
        await waitFor(async () => {
            let setting = await db.settings.get("map.nodelayer.display")
            expect(setting.value).toEqual(false)
        })
    })
})