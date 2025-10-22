// React
import React from 'react'

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Custom
import TopNav from './nav/TopNav'
import Content from './content/Content'
import {RightDrawerProvider} from './nav/RightDrawer'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RightDrawerProvider>
        <TopNav />
        <Content />
      </RightDrawerProvider>
    </ThemeProvider>
  )
}


export default App
