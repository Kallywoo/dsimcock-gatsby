import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled, { keyframes } from 'styled-components';

import iconOpen from '../images/mobile-nav-open.png';
import iconClose from '../images/mobile-nav-close.png';

// maybe somehow merge this with Navigation.js?

export const MobileNavigation = () => {

    const data = useStaticQuery(graphql`
        query {
            allContentfulLayout(filter: {node_locale: {eq: "en-US"}}) {
                pages: nodes {
                    id
                    name
                    slug
                    navOrder
                }
            }
        }
    `);

    const { pages } = data.allContentfulLayout;

    pages.sort((a, b) => a.navOrder - b.navOrder);

    const [open, setOpen] = useState(false);

    let timeout = null;

    const onBlurHandler = () => {
        timeout = setTimeout(() => {
            setOpen(false);
        });
    };

    const onFocusHandler = () => {
        clearTimeout(timeout);
    };

    return (
        <MobileNav>
            {open &&
                <Backdrop visible={open} onClick={() => setOpen(false)} />
            }
            {/* div element's handlers just capture whether children are highlighted, doesn't act like any role */}
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div onBlur={() => onBlurHandler()} onFocus={() => onFocusHandler()}>
                <MobileHeader>
                    <Button onClick={() => setOpen(!open)} aria-label={!open ? `Open Navigation` : `Close Navigation`}>
                        <Hamburger src={open ? iconClose : iconOpen} alt="" />
                    </Button>
                </MobileHeader>
                {open &&
                    <NavigationDiv>
                        <nav>
                            <List>
                                {pages?.map(page => 
                                    <li key={`${page.id}`}>
                                        <StyledLink 
                                            to={`/${page.slug ? page.slug : ""}`} 
                                            partiallyActive={page.slug ? true : false} 
                                            activeStyle={{opacity: "0.5"}}
                                        >
                                            {page.name}
                                        </StyledLink>
                                    </li>
                                )}
                            </List>
                        </nav>
                    </NavigationDiv>
                }
            </div>
        </MobileNav>
    );
};

const MobileNav = styled.div`
    display: none;

    @media only screen and (max-width: 480px) {
        display: block;
        position: fixed;
        width: 100%;
        z-index: 1;
        text-align: right;
    };
`;

const MobileHeader = styled.div`
    background-color: #303080;
    border-bottom: 4px solid #8186f3;
    padding: 0.5em;
`;

const Button = styled.button`
    padding: 0;
    padding-left: 0.4em;
    background-color: #303080;
    border-style: none;
    border-left: 1px solid #28286e;

    &:active img {
        opacity: 0.75;
        background-color: #1a1a53;
        border-radius: 5px;
    };
`;

const Hamburger = styled.img`
    vertical-align: middle;
`;

const NavAnimation = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const NavigationDiv = styled.div`
    background-color: #303080;
    border-radius: 20px;
    width: 70%;
    margin: 0.5em;
    margin-left: auto;
    padding: 0.25em;
    animation-name: ${NavAnimation};
    animation-duration: 0.175s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
`;

const List = styled.ul`
    padding: 0;
    list-style-type: none;
    margin: 0.32em;
    text-align: center;
`;

const StyledLink = styled(Link)`
    display: block;
    text-decoration: none;
    opacity: 1;
    transition: 0.3s;
    color: #CCE8FF;
    font-size: 2.25em;
    padding: 0.35em 0.2em;
    margin: 0.5em 0.5em;
    border: 2px solid white;
    border-radius: 10px;
    font-weight: bold;

    &:hover {
        opacity: 0.7;
    };
`;

const Backdrop = styled.div`
    display: ${props => props.visible ? "block" : "none"};
    position: fixed;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
`;