import React from 'react';
import { createGlobalStyle } from 'styled-components';

import { Footer } from './Footer';
import { Header } from './Header';

import "@fontsource/bebas-neue";

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

    #gatsby-focus-wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    };
    
    body {
        padding: 0;
        margin: 0;
    };

    #skip {
        flex: 1;
    };

    h1, h2, h3, p, nav a, cite, label {
        font-family: "Calibri";
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