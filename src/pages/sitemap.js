import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

export const query = graphql`
    query {
        contentfulNavigation(contentful_id: {eq: "KxYb1aL3RLuOVyeKJTMnk"}) {
            pages {
              ... on ContentfulLayout {
                id
				name
                slug
              }
              ... on ContentfulAreaOfWork {
                id
				name
                slug
              }
            }
        }
    }
`;

export default function SitemapPage({data}) {
    console.log(data);

    return (
        <main>
            <MainContent>
                <nav>
                    <List>
                        <ListItem><StyledLink to="/index">Home</StyledLink></ListItem>
                        <ListItem><StyledLink to="/about">About Us</StyledLink></ListItem>
                        <ListItem><StyledLink to="/work">Our Work</StyledLink></ListItem>
                        <ListItem><StyledLink to="/work/residential">Residential Work</StyledLink></ListItem>
                        <ListItem><StyledLink to="/work/industrial">Industrial Work</StyledLink></ListItem>
                        <ListItem><StyledLink to="/contact">Contact Us</StyledLink></ListItem>
                    </List>
                </nav>
            </MainContent>
        </main>
    )
};

const MainContent = styled.div`
    background-color: #ECEBFF;
    margin: 1.3em auto;
    padding: 0.975em;
    width: 70%;
    max-width: 940px;
    @media only screen and (max-width: 480px) {
        width: auto;
    }
`;

const List = styled.ul`
    padding: 0;
    list-style-type: none;
`;

const ListItem = styled.li`
    margin-bottom: 1.3em;
`;

const StyledLink = styled(Link)`
    color: black;
    font-weight: normal;
`;