import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { theme as muiTheme } from 'src/styles/mui';
import { theme as styledTheme } from 'src/styles/styled-theme';
import GlobalStyle from 'src/styles/global';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { useProviderStore } from './stores/provider';
import { getCachedProvider } from './api/provider';

if (getCachedProvider()) {
  useProviderStore.getState().connectProvider();
}

ReactDOM.render(
  <React.StrictMode>
    <StyledThemeProvider theme={styledTheme}>
      <MuiThemeProvider theme={muiTheme}>
        <GlobalStyle />
        <App />
      </MuiThemeProvider>
    </StyledThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
