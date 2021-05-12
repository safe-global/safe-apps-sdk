import { createGlobalStyle } from 'styled-components';
import { fontColor, mediumFontSize } from './variables';
import AvertaExtraBold from '../assets/fonts/Averta-ExtraBold.woff2';
import AvertaNormal from '../assets/fonts/Averta-normal.woff2';

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: "Averta";
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: local("Averta-Regular"),
            url(${AvertaNormal}) format("woff2");
    }

    @font-face {
        font-family: "Averta";
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: local("Averta-Extrabold"),
            url(${AvertaExtraBold}) format("woff2");
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

    * {
        box-sizing: border-box;
    }

    p {
        margin: 0;
    }
`;

export default GlobalStyle;
