import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ConfigProvider, App as AntdApp } from 'antd';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import CarDetail from './pages/CarDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#1976d2',
            borderRadius: 8,
          },
        }}
      >
        <AntdApp>
          <CssBaseline />
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/car/:id" element={<CarDetail />} />
            </Routes>
          </Router>
        </AntdApp>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;