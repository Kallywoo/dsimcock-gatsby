import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import { createGlobalStyle } from 'styled-components';

import "@fontsource/bebas-neue";

export const Layout = ({ children, location }) => {
    return (
        <>
            <GlobalStyle/>
            <Header props={location}/>
            {children}
            <Footer/>
        </>
    )
};

const GlobalStyle = createGlobalStyle`

  #gatsby-focus-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  };
  
  body {
    padding: 0;
    margin: 0;
  };

  main {
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
    /* border-radius: 5px; */
  };

  ::-webkit-scrollbar-thumb:hover {
    background: #8888d2;
  };
`;