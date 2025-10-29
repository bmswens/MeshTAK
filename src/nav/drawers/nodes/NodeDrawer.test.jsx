import { render, screen, waitFor } from '@testing-library/react'
import db from '../../../db'
import NodeDrawer from './NodeDrawer'

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
})