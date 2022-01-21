import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';

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
    max-width: 940px;

    @media only screen and (max-width: 480px) {
        padding: 0;
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

const ContactInfo = styled.div`
    width: 40%;
    padding: 1.3em;

    @media only screen and (max-width: 1000px) {
        text-align: center;
        width: auto;
        padding: 0;
    };

    @media only screen and (max-width: 480px) {
        display: none;
    };
`;

const List = styled.ul`
    padding: 0;
    list-style-type: none;
`;

const ListItem = styled.li`
    font-family: 'Bebas Neue', sans-serif;
    color: #303080;
    font-size: large;
    letter-spacing: 0.1em;
    margin-bottom: 0.65em;
`;

const Text = styled.p`
    font-family: 'Bebas Neue', sans-serif;
    color: #303080;
    font-size: large;
    letter-spacing: 0.1em;
`;

const Details = styled.a`
    font-family: "Calibri";
    color: black;
    text-decoration: none;
    transition: 0.3s;
    font-weight: normal;
    letter-spacing: normal;

    &:hover {
        color: #4f34b3;
    };
`;