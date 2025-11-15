import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import db from '../../../db';
import AppSettings from './AppSettings'
import { fireEvent } from '@testing-library/dom';
import MapSettings from './MapSettings';

describe('<MapSettings>', function() {
    it("should allow the user change auto center", async function() {
        const user = userEvent.setup()
        render(
            <MapSettings />
        )
        let title = screen.getByText(/Map Settings/)
        await user.click(title)
        await waitFor(() => {
            let text = screen.getByText(/Automatic Center/)
            expect(text).not.toBeNull()
        })
        let x = screen.getByRole("checkbox")
        // await waitFor(() => {
        //     expect(x).not.toBeNull()
        // })
        await user.click(x)
        await waitFor(async () => {
            let autoCenter = await db.settings.get("centerOnLoad")
            expect(autoCenter.value).toEqual(false)
        })
    })
})