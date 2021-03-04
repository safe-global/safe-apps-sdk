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
    }

    body {
        background-color: #f7f5f5;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
        bottom: 0;
        color: ${fontColor};
        font-family: "Averta", monospace;
        font-size: ${mediumFontSize};
        left: 0;
        margin: 0;
        overflow-x: hidden;
        position: absolute;
        right: 0;
        text-rendering: geometricPrecision;
        top: 0;
    }
`;

export default GlobalStyle;
