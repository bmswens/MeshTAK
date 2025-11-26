import { render, screen, waitFor } from "@testing-library/react"
import NewLayerDialog from './NewLayerDialog'
import userEvent from '@testing-library/user-event'
import utils from "../db/utils"
import { afterEach } from "vitest"
import db from "../db"


describe('<NewLayerDialog>', function() {
    afterEach(async () => {
        await db.delete()
        await db.open()
    })
    it("should allow users to upload a geojson layer", async function() {
        const spy = vi.spyOn(utils, 'featureCollectionToTable')
        let user = userEvent.setup()
        let data = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [0, 0]
                    },
                    name: "Center Of World"
                }
            ]
        }
        let file = new File([JSON.stringify(data)], "mything.json")
        const close = vi.fn()
        render(
            <NewLayerDialog
                open={true}
                close={close}
            />
        )
        let textbox = screen.getByRole("textbox")
        await user.type(textbox, "My New Layer")
        let fileInput = screen.getByTestId('file-input')
        await user.upload(fileInput, file)
        let button = screen.getByRole("button", { name: "Confirm" })
        await user.click(button)
        await waitFor(() => {
            expect(spy).toHaveBeenCalledWith("My New Layer", file)
            expect(close).toHaveBeenCalled()
        })
    })
    it("should alert the user to invalid files", async function() {
        const spy = vi.spyOn(utils, 'featureCollectionToTable')
        let user = userEvent.setup()
        let file = new File(["trash data"], "mything.json")
        const close = vi.fn()
        render(
            <NewLayerDialog
                open={true}
                close={close}
            />
        )
        let textbox = screen.getByRole("textbox")
        await user.type(textbox, "My New Layer")
        let fileInput = screen.getByTestId('file-input')
        await user.upload(fileInput, file)
        let button = screen.getByRole("button", { name: "Confirm" })
        await user.click(button)
        await waitFor(() => {
            let text = screen.getByText(/File must be geo json, array of geo json, or newline geojson/)
            expect(text).not.toBeNull()
        })
    })
})