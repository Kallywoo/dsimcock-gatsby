import React from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import styled, { createGlobalStyle } from 'styled-components';

import "@fontsource/bebas-neue";

export const Layout = ({ children, location }) => {
  return (
    <>
      <GlobalStyle />
      <SkipLink href="#skip">Skip to main content</SkipLink>
      <Header props={location} />
      <SkipContent id="skip" tabIndex="-1">Main Content</SkipContent>
      {children}
      <Footer />
    </>
  );
};

const SkipLink = styled.a`
  position: absolute;
  top: -1000%;

  &:focus {
    top: 0;
    left: 33%;
    right: 33%;
    background-color: #303080;
    color: white;
    padding: 0.5em 2em;
    text-decoration: none;
    box-shadow: 3px 3px 3px #333333;
    border-radius: 3px;
    font-family: 'Bebas Neue', sans-serif;
    letter-spacing: 2px;
    text-align: center;
    z-index: 2;

    @media only screen and (max-width: 480px) {
      box-shadow: none;
    };
  };
`;

const SkipContent = styled.h2`
  position: absolute;
  top: -1000%;
`;

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