import { afterEach } from "vitest"
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import db from "../../../db";
import UserDefinedGeoLayer from "./UserDefinedGeoLayer";
import UserDefinedLayers from "./UserDefinedLayers";


describe('<UserDefinedLayers>', function () {
    afterEach(async () => {
        await db.delete()
        await db.open()
    })
    it("should display the title and number of items", async function () {
        await db.layers.add({id: 70, display: 1, style: {color: "blue", fillColor: "red", opacity: 0.2}, name: "My Layer"})
        await db.layerData.add({id: 71, layer: 70})
        render(
            <UserDefinedLayers
            />
        )
        await waitFor(() => {
            let title = screen.getByText("My Layer")
            expect(title).not.toBeNull()
        })
        await waitFor(() => {
            let count = screen.getByText("1 entries")
            expect(count).not.toBeNull()
        })
    })
})