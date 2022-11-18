import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import request from './hooks/useHttp'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const redirect = async () => {
      if (window.location.pathname.length > 5) {
        let data = await request('api/link/get_link', "POST", {
          from: window.location.pathname.slice(1)
        })
        if (data.link) return window.location.href = data.link.from
       }
       setLoading(false)
    }

    redirect()
  }, [])

  if (loading) return <div></div>

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <div className="App">
        <Body />
        <Footer />
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
