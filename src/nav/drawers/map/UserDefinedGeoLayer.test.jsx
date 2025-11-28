import { afterEach } from "vitest"
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import db from "../../../db";
import UserDefinedGeoLayer from "./UserDefinedGeoLayer";


describe('<UserDefinedGeoLayer>', function () {
    afterEach(async () => {
        await db.delete()
        await db.open()
    })
    it("should display the title and number of items", async function () {
        await db.layers.add({id: 70, display: 1, style: {color: "blue", fillColor: "red", opacity: 0.2}})
        await db.layerData.add({id: 71, layer: 70})
        render(
            <UserDefinedGeoLayer
                id={70}
                name="My Layer"
            />
        )
        let title = screen.getByText("My Layer")
        expect(title).not.toBeNull()
        await waitFor(() => {
            let count = screen.getByText("1 entries")
            expect(count).not.toBeNull()
        })
    })
    it("should expand to show more options", async function () {
        const user = userEvent.setup()
        await db.layers.add({id: 70, display: 1, style: {color: "blue", fillColor: "red", fillOpacity: 0.2}})
        await db.layerData.add({id: 71, layer: 70})
        render(
            <UserDefinedGeoLayer
                id={70}
                name="My Layer"
            />
        )
        let button = screen.getByRole("button", { name: "Show Settings" })
        await user.click(button)
        await waitFor(() => {
            let settingText = screen.getByText("Layer Line Color")
            expect(settingText).not.toBeNull()
        })
    })
})