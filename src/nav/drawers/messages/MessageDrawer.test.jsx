import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import MessageDrawer from './MessageDrawer'
import DeviceContext from '../../../context/DeviceContext';
import db from '../../../db';

describe('<MessageDrawer>', function() {
    it("should display messages", async function() {
        await db.messages.add({id: 1, rxTime: new Date(), data: "Test 0", from: 0})
        await db.messages.add({id: 2, rxTime: new Date(), data: "Test 1", from: 0})
        render(
            <MessageDrawer />
        )
        await waitFor(() => {
            let text0 = screen.getByText(/Test 0/)
            expect(text0).not.toBeNull()
            let text1 = screen.getByText(/Test 1/)
            expect(text1).not.toBeNull()
        })
    })
    it("should be able to send messages", async function() {
        const user = userEvent.setup()
        const device = {
            sendText: vi.fn()
        }
        render(
            <DeviceContext.Provider value={{device}}>
                <MessageDrawer />
            </DeviceContext.Provider>
        )
        let textBox = screen.getByRole("textbox", { name: "Send Message"})
        await user.type(textBox, 'test')
        let button = screen.getByRole("button", { name: "Send"})
        await user.click(button)
        await waitFor(() => {
            expect(device.sendText).toHaveBeenCalledWith("test")
        })
    })
})