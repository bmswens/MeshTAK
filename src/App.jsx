// React
import React from 'react'

// MUI
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// Custom
import TopNav from './nav/TopNav'
import Content from './content/Content'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {


  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <TopNav />
      <Content />
    </ThemeProvider>
  )
}


export default App
