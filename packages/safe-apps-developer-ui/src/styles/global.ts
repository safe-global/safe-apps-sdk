import { createGlobalStyle } from 'styled-components';
import avertaFont from '@gnosis.pm/safe-react-components/dist/fonts/averta-normal.woff2';
import avertaBoldFont from '@gnosis.pm/safe-react-components/dist/fonts/averta-bold.woff2';
import { fontColor, mediumFontSize } from './variables';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'Averta';
        font-display: swap;
        src: local('Averta'), local('Averta Bold'),
        url(${avertaFont}) format('woff2'),
        url(${avertaBoldFont}) format('woff');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, 
            U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, 
            U+2215, U+FEFF, U+FFFD;
    }

    body {
        background-color: #f7f5f5;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        bottom: 0;
        color: ${fontColor};
        font-family: "Averta", monospace;
        left: 0;
        margin: 0;
        overflow-x: hidden;
        position: absolute;
        right: 0;
        text-rendering: geometricPrecision;
        top: 0;
    }

    html {
        font-size: ${mediumFontSize};
    }
`;

export default GlobalStyle;
