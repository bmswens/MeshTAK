import { render, screen, waitFor } from "@testing-library/react"
import MessageCard from "./MessageCard"
import db from "../../../db"


describe('<MessageCard>', function() {
    it("should lookup the sender", async function() {
        await db.nodes.add({nodeNum: 5, shortName: "Chad", longName: "Chad Brochill"})
        const now = new Date()
        render(
            <MessageCard
                from={5}
                rxTime={now}
                data={"My dank message."}
            />
        )
        await waitFor(() => {
            let longName = screen.getByText("Chad Brochill")
            expect(longName)
            let time = screen.getByText(now.toISOString())
            expect(time).not.toBeNull()
            let data = screen.getByText("My dank message.")
            expect(data).not.toBeNull()
        })
    })
    it("should display Unknown if sender not in db", async function() {
        const now = new Date()
        render(
            <MessageCard
                from={99999999}
                rxTime={now}
                data={"My dank message."}
            />
        )
        await waitFor(() => {
            let longName = screen.getByText("Unknown")
            expect(longName)
            let time = screen.getByText(now.toISOString())
            expect(time).not.toBeNull()
            let data = screen.getByText("My dank message.")
            expect(data).not.toBeNull()
        })
    })
})