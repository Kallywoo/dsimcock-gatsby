import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import SEO from '../components/SEO';

export const query = graphql`
    query {
        allContentfulLayout(filter: {node_locale: {eq: "en-US"}}) {
            pages: nodes {
                id
                name
                slug
                navOrder
            }
        }
        allContentfulAreaOfWork(filter: {node_locale: {eq: "en-US"}}) {
            work: nodes {
                type: __typename
                id
                name
                slug
                order
            }
        }
    }
`;

export default function SitemapPage({ data }) {

    const { pages } = data.allContentfulLayout;
    const { work } = data.allContentfulAreaOfWork;

    pages.sort((a, b) => a.navOrder - b.navOrder);
    work.sort((a, b) => a.order - b.order);

    const insertIndex = pages.findIndex(page => page.slug === "work") + 1; // gets the index after "work"

    const insert = (arr, index, newItems) => [ // inserts new items in an array at given index position
        ...arr.slice(0, index),
        ...newItems,
        ...arr.slice(index)
    ];
    
    const allPages = insert(pages, insertIndex, work); // merges "pages" and "work" into one array, inserting work after the "work" page for categorical ordering

    return (
        <>
            <SEO title="Sitemap" />
            <main>
                <MainContent>
                    <nav>
                        <List>
                            {allPages.map(page => 
                                <ListItem key={`${page.id}`}>
                                    <StyledLink to={`/${page.slug ? page.type ? `work/${page.slug}` : page.slug : ""}`}>{page.name}</StyledLink>
                                </ListItem>
                            )}
                        </List>
                    </nav>
                </MainContent>
            </main>
        </>
    )
};

const MainContent = styled.div`
    background-color: #ECEBFF;
    margin: 1.3em auto;
    padding: 0.975em;
    width: 70%;
    min-width: 730px;
    max-width: 970px;

    @media only screen and (max-width: 1000px) {
        width: 90%;
        min-width: auto;
        max-width: 730px;
    };

    @media only screen and (max-width: 480px) {
        width: auto;
    };
`;

const List = styled.ul`
    display: flex;
    flex-direction: column;
    padding: 0;
    list-style-type: none;

    @media only screen and (max-width: 480px) {
        align-items: center;
        font-size: 2em;
    };
`;

const ListItem = styled.li`
    margin-bottom: 1.3em;
`;

const StyledLink = styled(Link)`
    color: black;
    font-weight: normal;
`;