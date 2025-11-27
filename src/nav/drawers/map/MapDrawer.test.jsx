import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import MapDrawer from './MapDrawer';

describe('<MapDrawer>', function() {
    it("is just a container", async function() {
        const user = userEvent.setup()
        render(
            <MapDrawer />
        )
        let title = screen.getByText(/User Layer/)
        expect(title).not.toBeNull()
    })
})