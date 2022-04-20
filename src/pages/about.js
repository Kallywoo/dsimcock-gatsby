import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { BLOCKS } from '@contentful/rich-text-types';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import styled from 'styled-components';

import SEO from '../components/SEO';

export const query = graphql`
    query {
        about: contentfulLayout(contentful_id: {eq: "75GmgSwW5Awagnegsp7sfF"}) {
            mainContent {
                ... on ContentfulImageWithMetadata {
                    image {
                        gatsbyImageData(placeholder: BLURRED)
                    }
                }
                ... on ContentfulParagraphWithTitle {
                    richParagraph {
                        raw
                    }
                }
            }
            secondaryContent {
                ... on ContentfulTestimonials {
                    testimonials {
                        id
                        author
                        quote {
                            quote
                        }
                    }
                }
            }
        }
    }
`;

export default function AboutPage({ data }) {

    const { gatsbyImageData: aboutPic } = data.about.mainContent[0].image;
    const { richParagraph } = data.about.mainContent[1];
    const { testimonials } = data.about.secondaryContent[0];

    const options = {
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>
        }
    };

    return (
        <>
            <SEO title="About Us" description="About us and customer testimonials" />
            <main>
                <MainContent>
                    <ImageContainer>
                        <Image image={aboutPic} alt="" />
                    </ImageContainer>
                    {richParagraph && renderRichText(richParagraph, options)}
                </MainContent>
                <SecondaryContent id="testimonials" tabIndex="-1">
                    {testimonials.map(testimonial => 
                        <Quote key={testimonial.id}>
                            <Blockquote>
                                <TextQuote>{testimonial.quote.quote}</TextQuote>
                                <Cite>{testimonial.author}</Cite>
                            </Blockquote>
                        </Quote>
                    )}
                </SecondaryContent>
            </main>
        </>
    );
};

const MainContent = styled.div`
    background-color: #ECEBFF;
    margin: 1.3em auto;
    padding: 0.975em;
    width: 70%;
    min-width: 730px;
    max-width: 970px;
    overflow: auto;

    @media only screen and (max-width: 1000px) {
        width: 90%;
        min-width: auto;
        max-width: 730px;
    };

    @media only screen and (max-width: 480px) {
        width: auto;
    };
`;

const Text = styled.p`
    line-height: 1.4em;
    color: #3a3a87;

    @media only screen and (max-width: 1000px) {
        text-align: center;
    };

    @media only screen and (max-width: 480px) {
        font-size: 1em;
    };
`;

const ImageContainer = styled.div`
    width: 57%;
    float: right;
    margin-left: 1.2em;
    margin-bottom: 0.5em;

    @media only screen and (max-width: 1000px) {
        display: none;
    };
`;

const Image = styled(GatsbyImage)`
    width: 100%;
    margin: auto;
    align-self: center;
`;

const SecondaryContent = styled(MainContent)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: wrap;

    @media only screen and (max-width: 1000px) {
        justify-content: center;
    };
`;

const Quote = styled.div`
    margin-bottom: 0.65em;
    width: 50%;

    @media only screen and (max-width: 1000px) {
        width: 100%;
    };

    @media only screen and (max-width: 480px) {
        border-top: 1px solid white;
        padding-top: 0.5em;
        margin-bottom: 1em;

        &:first-child {
            border: none;
            padding-top: 0;
        };

        &:last-child {
            margin-bottom: 1em;
        };
    };
`;

const Blockquote = styled.blockquote`
    margin: 0.65em;
`;

const Cite = styled.cite`
    font-style: normal;
    font-weight: bold;
`;

const TextQuote = styled(Text)`
    text-align: left;
    font-size: medium;
`;