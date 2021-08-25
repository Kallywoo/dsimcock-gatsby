import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
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
            <MobileNavigation/>
            
            <General>
                <Link to="/">
                    <Logo image={logo} alt="D.Simcock & Son"/>
                </Link>
                <Information>
                    <ContactContainer>
                        <ContactInfo>Mobile: <Details href={`tel:${mobile.replace(/\s+/g, '')}`}>{mobile}</Details></ContactInfo>
                        <ContactInfo>Tel: <Details href={`tel:${telephone.replace(/\s+/g, '')}`}>{telephone}</Details></ContactInfo>
                        <ContactInfo>Email: <Details href={`mailto:${email}`}>{email}</Details></ContactInfo>
                    </ContactContainer>
                    <Description>{description}</Description>
                </Information>
            </General>

            <Navigation/>

            <ContactUs visible={pathname !== "/contact" ? true : false}>
                <Link to="/contact">{<ContactImage image={contact} alt=""/>}</Link>
            </ContactUs>
        </header>
)};

const General = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.3em 0;
    font-size: small;
    text-align: center;
    margin: auto;
    width: 72%;
    max-width: 940px;
    @media only screen and (max-width: 1200px) {
        flex-flow: wrap;
        justify-content: center;
    }
    @media only screen and (max-width: 680px) {
        width: auto;
    }
    @media only screen and (max-width: 480px) {
        padding-top: 100px;
        padding-bottom: 0;
    }
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
    margin-top: 0.36em;
`;

const Description = styled.h2`
    margin: 0;
    letter-spacing: 4px;
    font-family: 'Bebas Neue', sans-serif;
    font-weight: normal;
    @media only screen and (max-width: 480px) {
        display: none;
    }
`;

const ContactContainer = styled.div`
    margin-bottom: 0.4em;
    font-family: "Calibri";
`;

const ContactInfo = styled.span`
    margin: 0 0.32em;
`;

const Details = styled.a`
    color: black;
    text-decoration: none;
    transition: 0.3s;
    &:hover {
        color: #4f34b3;
    }
`;

const ContactUs = styled.div`
    display: ${props => props.visible ? "block" : "none"};
    position: fixed;
    top: 12em;
    -moz-box-shadow: 0 0 5px 3px #A5A5C7;
    -webkit-box-shadow: 0 0 5px 3px #a5a5c7;
    box-shadow: 0 0 5px 3px #a5a5c7;
    z-index: 0;
    @media only screen and (max-width: 480px) {
        display: none;
    }
`;

const ContactImage = styled(GatsbyImage)`
    display: block;
`;