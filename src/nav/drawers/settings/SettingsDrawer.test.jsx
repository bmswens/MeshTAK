import { render, screen, waitFor } from '@testing-library/react'
import SettingsDrawer from './SettingsDrawer'

describe('<SettingsDrawer>', function() {
    it("is just a container", function() {
        render(<SettingsDrawer />)
    })
})