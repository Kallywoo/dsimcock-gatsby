import { graphql, Link } from 'gatsby';
import React from 'react';
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

export default function WorkPage({data}) {
    const { paragraph } = data.contentfulLayout.mainContent[0].paragraph;
    const { areas } = data.contentfulLayout;

    areas.sort((a, b) => a.order - b.order);

    return (
      <>
        <SEO title="Our Work" description="Our work"/>
        <main>
            <MainContent>
                <WorkExamples>
                    <Text>{paragraph}</Text>
                    {areas.map(area => 
                        <StyledLink to={`/work/${area.slug}`} key={`${area.id}`}>{area.name}</StyledLink>
                    )}
                </WorkExamples>
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
    max-width: 940px;
    @media only screen and (max-width: 480px) {
        width: auto;
    }
`;

const WorkExamples = styled.div`
    width: 80%;
    margin: 0 auto;
    text-align: center;
`;

const Text = styled.p`
    font-size: medium;
    @media only screen and (max-width: 480px) {
        display: none;
    }
`;

const StyledLink = styled(Link)`
    display: block;
    margin: 0.5em auto;
    color: #303080;
    text-decoration: none;
    font-family: 'Bebas Neue', sans-serif;
    font-size: xx-large;
    text-shadow: 1px 1px black;
    transition: 0.2s;
    &:hover {
        color: #C4C2CC;
    }
`;