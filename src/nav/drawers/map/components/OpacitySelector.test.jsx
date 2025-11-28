import OpacitySelector from "./OpacitySelector"
import db from "../../../../db"
import { render, waitFor } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';

describe('<OpacitySelector>', function() {
        afterEach(async () => {
        await db.delete()
        await db.open()
    })
    it("should allow users to select opacity of a layer", async function() {
        await db.layers.add({id: 69, style: {fillOpacity: 0.2}})
        render(
            <OpacitySelector
                id={69}
            />
        )
        const slider = document.querySelector('input[type="range"]')
        fireEvent.change(slider, { target: { value: 0.3 } });
        await waitFor(async () => {
            let layer = await db.layers.get(69)
            expect(layer.style.fillOpacity).toEqual(0.3)
        })
    })
})