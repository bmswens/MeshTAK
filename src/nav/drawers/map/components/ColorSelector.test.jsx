import { render, screen, waitFor } from "@testing-library/react"
import { afterEach, beforeEach } from "vitest"
import db from "../../../../db"
import userEvent from '@testing-library/user-event'
import ColorSelector from './ColorSelector'


describe('<ColorSelector>', function () {
    beforeEach(async () => {
        await db.delete()
        await db.open()
    })
    it("should allow user to select a color for their layer", async function () {
        const user = userEvent.setup()
        db.layers.add({ id: 69, style: {} })
        render(
            <ColorSelector
                label="Color"
                property="color"
                id={69}
            />
        )
        let textbox = screen.getByRole("textbox")
        await user.clear(textbox)
        await user.type(textbox, "{enter}")
        await waitFor(async () => { 
            let layer = await db.layers.get(69)
            expect(layer.style.color).toEqual("#42a5f5")
        })
    })
    it("should handle layers with no style", async function() {
        const user = userEvent.setup()
        render(
            <ColorSelector
                label="Color"
                property="color"
                id={69}
            />
        )
        let textbox = screen.getByRole("textbox")
        await user.clear(textbox)
        await user.type(textbox, "{enter}")
        await waitFor(async () => { 
            let layer = await db.layers.get(69)
            expect(layer.style.color).toEqual("#42a5f5")
        })
    })
})