import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { ContactForm } from '../components/ContactForm';
import SEO from '../components/SEO';

export const query = graphql`
    query {
        contentfulLayout(contentful_id: {eq: "76pd1pW9mOyo50D1MLPrON"}) {
            mainContent {
                ... on ContentfulContactInformation {
                    telephone
                    mobile1
                    mobile2
                    email
                }
                ... on ContentfulParagraphWithTitle {
                    paragraph {
                        paragraph
                    }
                }
            }
        }
    }
`;

export default function ContactPage({ data: { contentfulLayout: { mainContent } } }) {

    const { telephone, mobile1, mobile2, email } = mainContent[0];
    const { paragraph } = mainContent[1].paragraph;

    return (
        <>
            <SEO title="Contact Us" description="Contact details and Email form" />
            <main>
                <MainContent>
                    <FlexBox>
                        <ContactInfo>
                            <List>
                                <ListItem>Tel: <Details href={`tel:${telephone.replace(/\s+/g, '')}`}>{telephone}</Details></ListItem>
                                <ListItem>Mobile One: <Details href={`tel:${mobile1.replace(/\s+/g, '')}`}>{mobile1}</Details></ListItem>
                                <ListItem>Mobile Two: <Details href={`tel:${mobile2.replace(/\s+/g, '')}`}>{mobile2}</Details></ListItem>
                                <ListItem>Email: <Details href={`mailto:${email}`}>{email}</Details></ListItem>
                            </List>
                            <Text>{paragraph}</Text>
                        </ContactInfo>
                        <ContactForm />
                    </FlexBox>
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
        padding: 1em 0em;
        width: auto;
    };
`;

const FlexBox = styled.div`
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 1000px) {
        flex-flow: wrap;
        justify-content: center;
    };
`;

const ContactInfo = styled.address`
    width: 40%;
    padding: 1.25em;
    padding-left: 0.75em;
    font-style: normal;

    @media only screen and (max-width: 1000px) {
        text-align: center;
        width: auto;
        padding: 0;
    };

    @media only screen and (max-width: 480px) {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        /* border-bottom: 2px solid grey; */
        /* margin-bottom: 1em; */
    };
`;

const List = styled.ul`
    padding: 0;
    list-style-type: none;

    @media only screen and (max-width: 480px) {
        display: flex;
        flex-wrap: wrap;
        text-align: center;
    };
`;

const ListItem = styled.li`
    font-family: 'Bebas Neue', sans-serif;
    color: #303080;
    font-size: 1.25em;
    letter-spacing: 0.1em;
    margin-bottom: 0.65em;

    @media only screen and (max-width: 480px) {
        min-width: 50%;
        flex-grow: 1;
    };
`;

const Text = styled.p`
    font-family: 'Bebas Neue', sans-serif;
    color: #303080;
    font-size: 1.25em;
    letter-spacing: 0.1em;
    line-height: 1.1em;
    margin-top: 2em;

    @media only screen and (max-width: 480px) {
        order: -1;
        margin-top: 0;
        border-bottom: 2px solid grey;
        padding: 1em 0em;
        margin: 0em 1em;
        padding-top: 0.5em;
        margin-bottom: 0.5em;
    };
`;

const Details = styled.a`
    font-family: "Fira Sans", -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif;
    color: black;
    text-decoration: none;
    transition: 0.3s;
    font-weight: normal;
    letter-spacing: normal;

    &:hover {
        color: #4f34b3;
    };

    @media only screen and (max-width: 480px) {
        display: block;
    };
`;