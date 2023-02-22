import React from 'react';
import './App.css';
import Router from './routes';
import { ThemeProvider } from '@emotion/react';
import { myTheme } from './styles/Theme';

function App() {
  return (
    <ThemeProvider theme={myTheme} >
      <Router />
    </ThemeProvider>
    
  );
}

export default App;
