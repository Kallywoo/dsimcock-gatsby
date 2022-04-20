import React from 'react';
import { graphql } from 'gatsby';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

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
                            }
                        }
                    }
                }
            }
            secondaryContent {
                ... on ContentfulParagraphWithTitle {
                    id
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
                <CarouselContainer>
                    <Carousel type="img" duration="5000" transition="500" />
                </CarouselContainer>
                <MainText>
                    <Welcome>
                        {title.split(" ").slice(0, 2).join(" ")}
                        <br />
                        {title.split(" ").slice(2).join(" ")}
                    </Welcome>
                    {richParagraph && renderRichText(richParagraph, options)}
                </MainText>
                <SecondaryContainer>
                    {items.slice(0, 2).map(item => 
                        <SecondaryText>
                            <TertiaryHeader>{item?.title}</TertiaryHeader>
                            <p>{item?.paragraph?.text}</p>
                        </SecondaryText>
                    )}
                    <SecondaryText collapse aria-hidden="true">
                        <SecondaryImageContainer>
                            <GatsbyImage image={items[2].image.gatsbyImageData} alt="" />
                        </SecondaryImageContainer>
                    </SecondaryText>
                </SecondaryContainer>
            </MainContent>
            <SecondaryContent>
                <Carousel type="text" duration={6000} transition={500} />
                <Areas>
                    {secondaryContent.slice(1).map(content =>
                        <React.Fragment key={content?.id}>
                            <TertiaryHeader>{content?.title}</TertiaryHeader>
                            <p>{content?.paragraph?.text}</p>
                        </React.Fragment>
                    )}
                </Areas>
            </SecondaryContent>
        </main>
    </>
)};

const SecondaryContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column: 1/4;

    @media only screen and (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    };
`;

const CarouselContainer = styled.div`
    grid-column: 1/3;
    overflow: hidden;
    max-height: 397px;
`;

const MainContent = styled.div`
    background-color: #ECEBFF;
    margin: 1.3em auto;
    padding: 0.975em;
    width: 70%;
    min-width: 730px;
    max-width: 970px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;

    @media only screen and (max-width: 1000px) {
        width: 90%;
        min-width: auto;
        max-width: 730px;
        grid-template-columns: 1fr;
    };

    @media only screen and (max-width: 480px) {
        width: auto;
    };
`;

const MainText = styled.div`
    grid-column: 3;

    @media only screen and (max-width: 1000px) {
        grid-column: 1/3;
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
    grid-column: auto;
    margin-top: 1.3em;
    border-top: 2px solid #303080;
    text-align: center;

    &:nth-of-type(2) {
        margin-left: 1.3em;
        margin-right: 1.3em;
    };

    &:nth-of-type(3) {
        overflow: hidden;
        height: 12.5em;
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

const Areas = styled.div`
    @media only screen and (max-width: 1000px) {
        text-align: center;
        max-width: 50%;
    };
`;