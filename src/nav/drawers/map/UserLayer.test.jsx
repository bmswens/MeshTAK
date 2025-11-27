import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import db from '../../../db';
import UserLayer from './UserLayer';
import { fireEvent } from '@testing-library/dom';

describe('<UserLayer>', function() {
    it("should allow the user to toggle on and off", async function() {
        const user = userEvent.setup()
        render(
            <UserLayer />
        )
        let title = screen.getByText(/User Layer/)
        await user.click(title)
        await waitFor(() => {
            let text = screen.getByText(/Display/)
            expect(text).not.toBeNull()
        })
        let checkbox = screen.getByRole("checkbox")
        await user.click(checkbox)
        await waitFor(async () => {
            let setting = await db.settings.get("map.userlayer.display")
            expect(setting.value).toEqual(false)
        })
    })
    it("should allow the user to change size", async function() {
        const user = userEvent.setup()
        render(
            <UserLayer />
        )
        let title = screen.getByText(/User Layer/)
        await user.click(title)
        await waitFor(() => {
            let text = screen.getByText(/Display/)
            expect(text).not.toBeNull()
        })
        const slider = document.querySelector('input[type="range"]')
        fireEvent.change(slider, { target: { value: 48 } });
        await waitFor(async () => {
            let setting = await db.settings.get("map.userlayer.size")
            expect(setting.value).toEqual(48)
        })
    })
    it("should allow the user to change color", async function() {
        const user = userEvent.setup()
        render(
            <UserLayer />
        )
        let title = screen.getByText(/User Layer/)
        await user.click(title)
        await waitFor(() => {
            let text = screen.getByText(/Display/)
            expect(text).not.toBeNull()
        })
        let textbox = screen.getByRole("textbox")
        await user.clear(textbox)
        await user.type(textbox, "{enter}")
        // console.log(textbox)
        await waitFor(async () => {
            let setting = await db.settings.get("map.userlayer.color")
            expect(setting.value).toEqual("#42a5f5")
        })
    })
})