// could just swap out with a plugin instead? would probably easily allow for animations and etc

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

export const Accordion = ({children}) => {

    const { title, images } = children;

    const data = useStaticQuery(graphql`
        query {
            arrow: contentfulImageWithMetadata(contentful_id: {eq: "6jYMBEtm4NBNgtUDhm4ojQ"}) {
                image {
                    fluid {
                        src
                    }
                }
            }
        }
    `);

    const { src: arrow } = data.arrow.image.fluid;

    const [active, setActive] = useState(false);

    const toggle = () => {    
        setActive(!active);
    };
    
    return (
        <>
            <Button aria-expanded={active ? true : false} onClick={toggle} icon={arrow}>{title}</Button>
            {active &&
                <Panel>
                    {images?.map(image => 
                        <ImageLink key={image.id} target="_blank" rel="noreferrer" href={image.fluid.src}>
                            <Image image={image.gatsbyImageData} alt={image.alt ? image.alt : ""} />
                        </ImageLink>
                    )}
                </Panel>
            }
        </>
    );
};

const Button = styled.button`
    width: 100%;
    background-color: #ECEBFF;
    position: relative;
    overflow: hidden;
    border: none;
    text-transform: uppercase;
    cursor: pointer;
    padding: 2em 0em;
    text-align: left;
    transition: 0.4s;
    font-size: x-small;
    &:after {
        content: url(${props => props.icon});
        position: relative;
        left: 6%;
        float: right;
        transform: ${props => props['aria-expanded'] ? "rotate(180deg)" : "none"};
        transition: rotate 0.2s ease-in-out;
        @media only screen and (max-width: 680px) {
            left: 10%;
        }
        @media only screen and (max-width: 480px) {
            display: none;
        }
    }
    &:hover {
        color: #1693eb;
    }
    &:hover:after {
        left: 0%;
        transition: all 0.2s ease-in-out;
    }
    @media only screen and (max-width: 1000px) {
        text-align: center;
    }
    @media only screen and (max-width: 480px) {
        font-size: medium;
    }
`;

const PanelAnimation = keyframes`
    0% { opacity: 0; }
    100% { opacity: 1; }
`;

const Panel = styled.div`
    position: relative;
    top: 100%;
    width: 100%;
    background-color: #ECEBFF;
    text-align: left;
    animation-name: ${PanelAnimation};
    animation-duration: 0.8s;
    animation-iteration-count: 1;
    animation-timing-function: ease-out;
    @media only screen and (max-width: 1000px) {
        text-align: center;
    }
`;

const Image = styled(GatsbyImage)`
    width: 150px;
    margin: 1.3em 0.65em;
`;

const ImageLink = styled.a`
    text-decoration: none;
`;