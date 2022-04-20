import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Footer } from './Footer';
import { Header } from './Header';

import "@fontsource/bebas-neue";
import "@fontsource/fira-sans";

export const Layout = ({ children, location }) => {
    return (
        <>
            <GlobalStyle />
            <Header props={location} />
            <div id="skip">{children}</div>
            <Footer />
        </>
    );
};

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
    };

    html {
        @media only screen and (max-width: 480px) {
            scroll-padding-top: 70px; // stops mobile header blocking top of targeted elements
        };
    };

    #gatsby-focus-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    };
    
    body {
        padding: 0;
        margin: 0;
        font-family: "Calibri", "Fira Sans", -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
    };

    #skip {
        flex: 1;
    };

    h1, h2, h3, p, nav a, cite, label {
        text-transform: uppercase;
    };

    p, h3, label {
        font-size: small;
    };

    ::-webkit-scrollbar {
        width: 20px;
    };

    ::-webkit-scrollbar-track {
        background: none;
    };

    ::-webkit-scrollbar-thumb {
        background: #b8b8e2;
        border-left: 4px solid white;
        border-right: 4px solid white;
    };

    ::-webkit-scrollbar-thumb:hover {
        background: #8888d2;
    };
`;