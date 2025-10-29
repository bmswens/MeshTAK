import { render, screen, waitFor } from "@testing-library/react"
import NodeCard from "./NodeCard"
import userEvent from '@testing-library/user-event'
import db from "../../../db"


describe('<NodeCard>', function () {
    it("should display the shortName, longName, and lastHeard", function () {
        const now = new Date()
        const nowString = now.toISOString()
        render(
            <NodeCard
                shortName="NODE"
                longName="My Node"
                lastHeard={now}
            />
        )
        let shortName = screen.getByText("NODE")
        expect(shortName).not.toBeNull()
        let longName = screen.getByText("My Node")
        expect(longName).not.toBeNull()
        let lastHeard = screen.getByText(new RegExp(nowString))
        expect(lastHeard).not.toBeNull()
    })
    it("should display the teams", function () {
        const teams = [
            "Team A",
            "Team B"
        ]
        render(
            <NodeCard
                teams={teams}
            />
        )
        for (let team of teams) {
            let text = screen.getByText(team)
            expect(text).not.toBeNull()
        }
    })
    it("should allow a user to edit the teams", async function () {
        let user = userEvent.setup()
        const teams = []
        await db.nodes.add({
            nodeNum: 1,
            teams: [],
            lastHeard: new Date()
        })
        render(
            <NodeCard
                teams={teams}
                nodeNum={1}
            />
        )
        let button = screen.getByRole("button", { name: "Modify Teams" })
        await user.click(button)
        let textbox = screen.getByLabelText("Teams")
        await user.type(textbox, "Team 1{enter}")
        let confirmButton = screen.getByRole("button", { name: "Confirm" })
        await user.click(confirmButton)
        await waitFor(async () => {
            let data = await db.nodes.get(1)
            expect(data.teams).toEqual(["Team 1"])
        })
    })
    it("should allow a user to favorite", function () {

    })
    it("should allow a user to DM", function () {

    })
    it("should allow a user to center the map on node", function () {

    })
})