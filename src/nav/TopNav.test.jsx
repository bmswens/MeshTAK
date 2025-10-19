import { render, screen } from '@testing-library/react';
import TopNav from './TopNav'

describe('<TopNav>', function() {
    it("should display the app name", function() {
        render(
            <TopNav />
        )
        let title = screen.getByText("MeshTAK")
        expect(title).not.toBeNull()
    })
})