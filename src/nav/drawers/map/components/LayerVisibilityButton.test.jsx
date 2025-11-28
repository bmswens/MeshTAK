import { afterEach } from "vitest"
import db from "../../../../db"
import utils from "../../../../db/utils";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import LayerVisbilityButton from "./LayerVisibilityButton";


describe('<LayerVisibilityButton>', function() {
    afterEach(async () => {
        await db.delete()
        await db.open()
    })
    it("should be able to toggle layers off", async function() {
        const user = userEvent.setup()
        await db.layers.add({id: 69, display: 1})
        render(
            <LayerVisbilityButton
                id={69}
            />
        )
        let button = screen.getByRole("button")
        await user.click(button)
        await waitFor(async () => {
            let layer = await db.layers.get(69)
            expect(layer.display).toEqual(0)
        })
    })
    it("should be able to toggle layers on", async function() {
        const user = userEvent.setup()
        await db.layers.add({id: 69, display: 0})
        render(
            <LayerVisbilityButton
                id={69}
            />
        )
        let button = screen.getByRole("button")
        await user.click(button)
        await waitFor(async () => {
            let layer = await db.layers.get(69)
            expect(layer.display).toEqual(1)
        })
    })
})