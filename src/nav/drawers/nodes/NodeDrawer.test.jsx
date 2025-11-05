import { render, screen, waitFor } from '@testing-library/react'
import db from '../../../db'
import NodeDrawer from './NodeDrawer'
import userEvent from '@testing-library/user-event'

describe('<NodeDrawer>', function() {
    it("should hold the nodes", async function() {
        await db.nodes.add({nodeNum: 1, shortName: "x", longName: "Long Node Name"})
        render(
            <NodeDrawer />
        )
        await waitFor(() => {
            let text = screen.getByText("Long Node Name")
            expect(text).not.toBeNull()
        })
    })
    it("should be able to search", async function() {
        await db.nodes.add({nodeNum: 3, shortName: "x", longName: "Super Long Node Name"})
        await db.nodes.add({nodeNum: 4, shortName: "y", longName: "Short Node Name"})
        let user = userEvent.setup()
        render(
            <NodeDrawer />
        )
        let textbox = screen.getByLabelText("Search")
        await user.type(textbox, "Super")
        await waitFor(() => {
            let text = screen.getByText("Super Long Node Name")
            expect(text).not.toBeNull()
            let notText = screen.queryByText("Short")
            expect(notText).toBeNull()
        })
    })
})