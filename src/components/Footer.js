import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';

export const Footer = () => {

    const data = useStaticQuery(graphql`
        query {
            pages: allContentfulLayout(filter: {node_locale: {eq: "en-US"}}) {
                nodes {
                    id
                    name
                    slug
                    navOrder
                }
            }
            work: allContentfulAreaOfWork(filter: {node_locale: {eq: "en-US"}}) {
                nodes {
                    id
                    name
                    slug
                    order
                }
            }
        }
    `);

    const { pages, work } = data;

    pages.nodes.sort((a, b) => a.navOrder - b.navOrder);
    work.nodes.sort((a, b) => a.order - b.order);

    return (
        <StyledFooter>
            <Navigation>
                <List>
                    {pages.nodes.map(page => 
                        <ListItem key={`${page.id}`}>
                            <StyledLink to={`/${page.slug ? page.slug : ""}`}>{page.name}</StyledLink>
                        </ListItem>
                    )}
                    <ListItem>
                        <StyledLink to="/about#testimonials">Testimonials</StyledLink>
                    </ListItem>
                    {work.nodes.map(page => 
                        <ListItem key={`${page.id}`}>
                            <StyledLink to={`/work/${page.slug}`}>{page.name} Examples</StyledLink>
                        </ListItem>
                    )}
                    <ListItem>
                        <StyledLink to="/sitemap">Sitemap</StyledLink>
                    </ListItem>
                </List>
            </Navigation>
        </StyledFooter>
    );
};

const StyledFooter = styled.footer`
    background-color: #303080;
    padding: 0.32em;
`;

const Navigation = styled.nav`
    margin: auto;
    width: 72%;
    min-width: 730px;
    max-width: 970px;

    @media only screen and (max-width: 1000px) {
        width: 92%;
        min-width: auto;
        max-width: 730px;
    };

    @media only screen and (max-width: 480px) {
        width: 90%;
    };
`;

const List = styled.ul`
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: min-content;
    gap: 0.4em 3em;
    padding: 0;
    list-style-type: none;
    width: 100%;

    @media only screen and (max-width: 480px) {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
        height: auto;
        gap: 0.5em;
    };
`;

const ListItem = styled.li`
    white-space: nowrap;

    &:last-child {
        grid-row: 5;
    };

    @media only screen and (max-width: 480px) {
        margin-right: 0em;
        border: 1px solid white;
        border-radius: 10px;
        padding: 0.5em 0em;
        min-width: 48%;
        flex-grow: 1;

        &:active {
            background-color: rgba(255, 255, 255, 0.25);
        };

        &:nth-child(1n + 6) {
            display: none;
        };

        &:nth-child(5) {
            grid-column: span 2;
        };
    };
`;

const StyledLink = styled(Link)`
    display: block;
    text-transform: uppercase;
    font-weight: bold;
    text-decoration: none;
    color: white;
    opacity: 1;
    transition: 0.3s;

    &:hover {
        opacity: 0.7;
    };

    @media only screen and (max-width: 480px) {
        font-size: 1.75em;
    };
`;