import { render } from "@testing-library/react"
import Content from "./Content"


describe('<Content>', function() {
    it("is currently just a container", function() {
        // potentionally switch to router based content switching later
        render(
            <Content />
        )
    })
})