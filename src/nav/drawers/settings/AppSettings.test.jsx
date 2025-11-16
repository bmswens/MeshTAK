import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Slider from '@mui/material/Slider'
import db from '../../../db';
import AppSettings from './AppSettings'
import { fireEvent } from '@testing-library/dom';

describe('<AppSettings>', function () {
    it("should allow the user to change drawer size", async function () {
        const user = userEvent.setup()
        render(
            <AppSettings />
        )
        let title = screen.getByText(/App Settings/)
        await user.click(title)
        await waitFor(() => {
            let text = screen.getByText(/Drawer Width/)
            expect(text).not.toBeNull()
        })
        await waitFor(() => {
            let x = screen.getByRole("slider")
            expect(x).not.toBeNull()
        })
        const slider = document.querySelector('input[type="range"]')
        fireEvent.change(slider, { target: { value: 75 } });
        await waitFor(async () => {
            let width = await db.settings.get("drawerWidth")
            expect(width.value).toEqual(75)
        })
    })
    it("should allow the user to change notification prefs", async function () {
        const user = userEvent.setup()
        window.Notification.permission = "denied"
        render(
            <AppSettings />
        )
        let title = screen.getByText(/App Settings/)
        await user.click(title)
        await waitFor(() => {
            let text = screen.getByText(/Allow Notifications/)
            expect(text).not.toBeNull()
        })
        let checkbox = screen.getByRole("checkbox")
        await user.click(checkbox)
        await waitFor(async () => {
            let autoCenter = await db.settings.get("notifications")
            expect(autoCenter.value).toEqual(true)
        })
    })
})