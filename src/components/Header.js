import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

import { Navigation } from './Nav';
import { MobileNavigation } from './MobileNav';

export const Header = ({ props }) => {

    const { pathname } = props; // pulled from Layout.js

    const data = useStaticQuery(graphql`
        query {
            contentfulHeader {
                logo {
                    image {
                        gatsbyImageData(placeholder: BLURRED)
                    }
                }
                description
                contactInformation {
                    telephone
                    mobile: mobile1
                    email
                }
                contactImage {
                    image {
                        gatsbyImageData(placeholder: BLURRED)
                    }
                }
            }
        }
    `);

    const { description } = data.contentfulHeader;
    const { gatsbyImageData: logo } = data.contentfulHeader.logo.image;
    const { telephone, mobile, email } = data.contentfulHeader.contactInformation;
    const { gatsbyImageData: contact } = data.contentfulHeader.contactImage.image;

    return (
        <header>
            <SkipLink href="#skip">Skip to main content</SkipLink>
            <MobileNavigation />
            <General>
                <H1>
                    <Link to="/">
                        <Logo image={logo} alt="D.Simcock & Son" />
                    </Link>
                </H1>
                <Information>
                    <ContactContainer>
                        <ContactInfo>Mobile: <Details href={`tel:${mobile.replace(/\s+/g, '')}`}>{mobile}</Details></ContactInfo>
                        <ContactInfo>Tel: <Details href={`tel:${telephone.replace(/\s+/g, '')}`}>{telephone}</Details></ContactInfo>
                        <ContactInfo>Email: <Details href={`mailto:${email}`}>{email}</Details></ContactInfo>
                    </ContactContainer>
                    <Description>{description}</Description>
                </Information>
            </General>
            <Navigation />
            <ContactUs visible={!pathname.includes("/contact") ? true : false}>
                <Link to="/contact">
                    <ContactImage image={contact} alt="Go to Contact page" />
                </Link>
            </ContactUs>
        </header>
    );
};

const SkipLink = styled.a`
    position: absolute;
    top: -1000%;

    &:focus {
        top: 0;
        left: 33%;
        right: 33%;
        background-color: #303080;
        color: white;
        padding: 0.5em 2em;
        text-decoration: none;
        box-shadow: 3px 3px 3px #333333;
        border-radius: 3px;
        font-family: 'Bebas Neue', sans-serif;
        letter-spacing: 2px;
        text-align: center;
        z-index: 2;

        @media only screen and (max-width: 480px) {
            box-shadow: none;
        };
    };
`;

const H1 = styled.h1`
    margin: 0;
    padding: 0;
`;

const General = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.3em 0;
    font-size: 0.9em;
    text-align: center;
    margin: auto;
    width: 72%;
    max-width: 940px;
    gap: 0.5em;

    @media only screen and (max-width: 1200px) {
        flex-flow: wrap;
        justify-content: center;
    };

    @media only screen and (max-width: 680px) {
        width: auto;
    };

    @media only screen and (max-width: 480px) {
        padding-top: 100px;
        padding-bottom: 0;
    };
`;

const Logo = styled(GatsbyImage)`
    width: 100%;
    margin: auto;
    align-self: center;
    vertical-align: bottom;
`;

const Information = styled.div`
    display: inline-block;
    margin: auto;
`;

const Description = styled.h2`
    margin: 0;
    letter-spacing: 4px;
    font-family: 'Bebas Neue', sans-serif;
    font-weight: normal;

    @media only screen and (max-width: 480px) {
        display: none;
    };
`;

const ContactContainer = styled.address`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    font-style: normal;
    font-family: "Calibri";
    margin-bottom: 0.4em;
`;

const ContactInfo = styled.span`
    white-space: nowrap;
    margin: 0 0.32em;
`;

const Details = styled.a`
    color: black;
    text-decoration: none;
    transition: 0.3s;

    &:hover {
        color: #4f34b3;
    };
`;

const ContactUs = styled.div`
    display: ${props => props.visible ? "block" : "none"};
    position: fixed;
    top: 22.5%;
    -moz-box-shadow: 0 0 5px 3px #A5A5C7;
    -webkit-box-shadow: 0 0 5px 3px #a5a5c7;
    box-shadow: 0 0 5px 3px #a5a5c7;
    z-index: 1;

    @media only screen and (max-width: 600px) {
        display: none;
    };
`;

const ContactImage = styled(GatsbyImage)`
    display: block;
`;