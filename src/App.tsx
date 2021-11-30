import React from 'react';
import './App.less';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import store from './store';
import { defaultTheme } from './themes';
import Spanish from 'antd/lib/locale/es_ES'
import WebSiteRoutes from './routes'

function App (): React.ReactElement {
  return (
    <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <ConfigProvider locale={Spanish}>
          <WebSiteRoutes />
        </ConfigProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default App
