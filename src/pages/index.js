import React from 'react';
import styled from 'styled-components';
import { BLOCKS } from '@contentful/rich-text-types';
import { graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { GatsbyImage } from 'gatsby-plugin-image';

import { Carousel } from '../components/Carousel';
import SEO from '../components/SEO';

export const query = graphql`
  query {
    home: contentfulLayout(contentful_id: {eq: "1mbJR12XDGubPzpJKUxRHZ"}) {
      mainContent {
        ... on ContentfulParagraphWithTitle {
          title
          richParagraph {
            raw
          }
        }
        ... on ContentfulSetOfThree {
          items {
            ... on ContentfulParagraphWithTitle {
              title
              paragraph {
                id
                text: paragraph
              }
            }
            ... on ContentfulImageWithMetadata {
              image {
                gatsbyImageData(placeholder: BLURRED)
                fluid {
                  src
                }
              }
            }
          }
        }
      }
      secondaryContent {
        ... on ContentfulParagraphWithTitle {
          title
          paragraph {
            text: paragraph
          }
        }
      }
    }
  }
`;

export default function HomePage({ data }) {

  const { mainContent, secondaryContent } = data.home;
  const { title, richParagraph } = mainContent[1];
  const { items } = mainContent[2];

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>
    }
  };

  return (
    <>
      <SEO title="Home" />
      <main>
          <MainContent>
              <FlexBox>
                  <Carousel type="img" duration="5000" transition="500" />
                  <MainText>
                      <Welcome>{title}</Welcome>
                      {richParagraph && renderRichText(richParagraph, options)}
                  </MainText>
              </FlexBox>
              <FlexBox>
                {/* do these by map instead?: */}
                  <SecondaryText>
                      <TertiaryHeader>{items[0].title}</TertiaryHeader>
                      <p>{items[0].paragraph.text}</p>
                  </SecondaryText>
                  <SecondaryText>
                      <TertiaryHeader>{items[1].title}</TertiaryHeader>
                      <p>{items[1].paragraph.text}</p>
                  </SecondaryText>
                  <SecondaryText collapse>
                      <SecondaryImageContainer>
                          <GatsbyImage image={items[2].image.gatsbyImageData} alt="" />
                      </SecondaryImageContainer>
                  </SecondaryText>
              </FlexBox>
          </MainContent>
          <SecondaryContent>
              <Carousel type="text" duration="6000" transition="500" />
              <Areas>
                  <TertiaryHeader>{secondaryContent[1].title}</TertiaryHeader>
                  <p>{secondaryContent[1].paragraph.text}</p>
                  <TertiaryHeader>{secondaryContent[2].title}</TertiaryHeader>
                  <p>{secondaryContent[2].paragraph.text}</p>
              </Areas>
          </SecondaryContent>
      </main>
    </>
)};

const MainContent = styled.div`
    background-color: #ECEBFF;
    margin: 1.3em auto;
    padding: 0.975em;
    width: 70%;
    max-width: 940px;

    @media only screen and (max-width: 480px) {
        width: auto;
    };
`;

const MainText = styled.div`
    width: 34%;

    @media only screen and (max-width: 1000px) {
        width: 100%;
        text-align: center;
    };

    @media only screen and (max-width: 480px) {
        font-size: 1.25em;
        margin-top: 1em;
    };
`;

const Welcome = styled.h2`
    letter-spacing: 3px;
    margin-top: 0;
    margin-right: 5px;
    color: #303080;

    @media only screen and (max-width: 1000px) {
        margin-top: 0.5em;
    };

    @media only screen and (max-width: 480px) {
        margin-top: 0;
    };
`;

const Text = styled.p`
    line-height: 1.4em;

    @media only screen and (max-width: 1200px) {
        line-height: normal;
    };

    @media only screen and (max-width: 480px) {
        font-size: 0.75em;
    };
`;

const TertiaryHeader = styled.h3`
    letter-spacing: 0.5px;
`;

const SecondaryContent = styled(MainContent)`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media only screen and (max-width: 1000px) {
        justify-content: center;
        flex-flow: nowrap;
    };

    @media only screen and (max-width: 480px) {
        display: none;
    };
`;

const SecondaryText = styled.div`
    flex: 1;
    margin-top: 1.3em;
    width: 30%;
    border-top: 2px solid #303080;
    text-align: center;
    overflow: hidden;
    height: 12.5em;

    &:nth-of-type(2) {
        margin-left: 1.3em;
        margin-right: 1.3em;
    };

    @media only screen and (max-width: 1200px) {
        display: ${props => props.collapse ? "none" : "block"};
        height: auto;

        &:nth-of-type(2) {
            margin-right: 0;
        };
    };

    @media only screen and (max-width: 480px) {
        display: none;
    };
`;

const SecondaryImageContainer = styled.div`
    width: 100%;
    margin: auto;
    align-self: center;
    padding-top: 0.85em;
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 1000px) {
        flex-flow: wrap;
        justify-content: center;
    };
`;

const Areas = styled.div`
    @media only screen and (max-width: 1000px) {
        text-align: center;
        max-width: 50%;
    };
`;
