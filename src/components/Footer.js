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
    )
};

const StyledFooter = styled.footer`
    background-color: #303080;
    padding: 0.32em;
`;

const Navigation = styled.nav`
    margin: auto;
    width: 72%;
    max-width: 940px;
`;

const List = styled.ul`
    padding: 0;
    list-style-type: none;
    display: inline-flex;
    flex-flow: column wrap;
    align-content: flex-start;
    width: 100%;
    height: 95px;

    @media only screen and (max-width: 480px) {
        display: block;
        text-align: center;
        height: auto;
    };
`;

const ListItem = styled.li`
    margin-right: 2.6em;

    &:last-child {
        margin-top: auto;
    };

    @media only screen and (max-width: 480px) {
        margin-top: 0.8em;
        margin-right: 0em;

        &:nth-child(1n + 6) {
            display: none;
        };
    };
`;

const StyledLink = styled(Link)`
    font-family: "Calibri";
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
        font-size: 2em;
    };
`;