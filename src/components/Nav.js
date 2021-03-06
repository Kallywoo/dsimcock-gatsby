import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';

export const Navigation = () => {

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

    return (
        <StyledNavigation>
            <List>
                {pages.map(page => 
                    <ListItem key={`${page.id}`}>
                        <StyledLink to={`/${page.slug ? page.slug : ""}`}>{page.name}</StyledLink>
                    </ListItem>
                )}
            </List>
        </StyledNavigation>
)};

const StyledNavigation = styled.nav`
    background-color: #303080;
    padding: 0.32em;
    
    @media only screen and (max-width: 480px) {
        display: none;
    };
`;

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0.32em;
    padding: 0;
    list-style-type: none;
    text-align: center;
`;

const ListItem = styled.li`
    display: inline;
    margin: 0 1.2em;
    white-space: nowrap;
`;

const StyledLink = styled(Link)`
    text-transform: uppercase;
    font-family: 'Bebas Neue', sans-serif;
    font-weight: normal;
    letter-spacing: 2px;
    font-size: 1.5em;
    text-decoration: none;
    color: white;
    opacity: 1;
    transition: 0.3s;

    &:hover {
        opacity: 0.7;
    };
`;