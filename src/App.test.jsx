import { render } from '@testing-library/react';
import App from './App';

describe('<App>', function() {
  it("should render without fail", function() {
    render(<App />)
  })
})