import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from 'styled-components';

import SEO from '../components/SEO';

export const query = graphql`
    query {
        contentfulLayout(contentful_id: {eq: "2bqrCdqXujBhicR1pdFpPV"}) {
            mainContent {
                ... on ContentfulParagraphWithTitle {
                    paragraph {
                        paragraph
                    }
                }
            }
            areas: mainContent {
                ... on ContentfulAreaOfWork {
                    id
                    name
                    slug
                    order
                }
            }
        }
    }
`;

export default function WorkPage({ data }) {

    const { paragraph } = data.contentfulLayout.mainContent[0].paragraph;
    const { areas } = data.contentfulLayout;

    areas.sort((a, b) => a.order - b.order);

    return (
        <>
            <SEO title="Our Work" description="Our work" />
            <main>
                <MainContent>
                    <WorkExamples>
                        <Text>{paragraph}</Text>
                        {areas?.map(area => 
                            <React.Fragment key={`${area.id}`}>
                                {area.id ? 
                                    <StyledLink to={`/work/${area.slug}`}>{area.name}</StyledLink> 
                                : null}
                            </React.Fragment>
                        )}
                    </WorkExamples>
                </MainContent>
            </main>
        </>
    );
};

const MainContent = styled.div`
    background-color: #ECEBFF;
    margin: 1.3em auto;
    padding: 0.975em;
    padding-bottom: 2em;
    width: 70%;
    max-width: 970px;

    @media only screen and (max-width: 1000px) {
        width: 90%;
        max-width: 730px;
    };

    @media only screen and (max-width: 480px) {
        width: auto;
    };
`;

const WorkExamples = styled.div`
    width: 80%;
    margin: 0 auto;
    text-align: center;
`;

const Text = styled.p`
    color: #303080;
    font-size: 1.1em;
    line-height: 1.5em;

    @media only screen and (max-width: 480px) {
        display: none;
    };
`;

const StyledLink = styled(Link)`
    display: block;
    margin: 0 auto;
    color: #303080;
    text-decoration: none;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3.5em;
    text-shadow: 1px 1px black;
    transition: 0.2s;

    &:hover {
        color: #C4C2CC;
    };

    &:first-of-type {
        margin-top: 0.5em;

        @media only screen and (max-width: 480px) {
            margin-top: 0.25em;
        };
    };

    @media only screen and (max-width: 480px) {
        text-decoration: underline;
    };
`;