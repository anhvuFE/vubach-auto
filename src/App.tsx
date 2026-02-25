import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ConfigProvider, App as AntdApp, theme as antdTheme } from 'antd';
import viVN from 'antd/locale/vi_VN';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import CarDetail from './pages/CarDetail';

const muiTheme = createTheme({
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

const antdTokens = {
  colorPrimary: '#1976d2',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1890ff',
  borderRadius: 8,
  wireframe: false,
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  fontSize: 14,
  colorBgContainer: '#ffffff',
  colorBgLayout: '#f5f5f5',
  colorText: '#262626',
  colorTextSecondary: '#8c8c8c',
  controlHeight: 40,
  controlHeightSM: 32,
  controlHeightLG: 48,
  boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
};

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <ConfigProvider
        locale={viVN}
        theme={{
          algorithm: antdTheme.defaultAlgorithm,
          token: antdTokens,
          components: {
            Button: {
              colorPrimary: '#1976d2',
              algorithm: true,
            },
            Card: {
              headerBg: '#fafafa',
              headerFontSize: 16,
              headerHeight: 56,
            },
            Tag: {
              borderRadiusSM: 6,
            },
            Input: {
              borderRadius: 8,
              controlHeight: 40,
            },
            FloatButton: {
              colorPrimary: '#1976d2',
            },
            Table: {
              headerBg: '#fafafa',
              headerSplitColor: '#f0f0f0',
            },
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