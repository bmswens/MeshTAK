// React
import React from 'react'

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Custom
import TopNav from './nav/TopNav'
import Content from './content/Content'
import {RightDrawerProvider} from './nav/RightDrawer'
import { DeviceContextProvider } from './context/DeviceContext'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <DeviceContextProvider>
        <RightDrawerProvider>
          <TopNav />
          <Content />
        </RightDrawerProvider>
      </DeviceContextProvider>
    </ThemeProvider>
  )
}


export default App
