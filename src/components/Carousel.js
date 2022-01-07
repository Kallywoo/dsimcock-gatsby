// could just swap this all out with some plugin and adjust as needed instead of using all this manual code

import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
// import { GatsbyImage } from 'gatsby-plugin-image';

// NEEDS FIXING: hovering no longer works with GatsbyImageData

export const Carousel = ({type, duration, transition}) => {

    const data = useStaticQuery(graphql`
      query {
        home: contentfulLayout(contentful_id: {eq: "1mbJR12XDGubPzpJKUxRHZ"}) {
            mainContent {
            ... on ContentfulImageCarousel {
                images {
                  altTag
                  title
                  image {
                    # gatsbyImageData(placeholder: BLURRED)
                    fluid {
                        src
                    }
                  }
                }
              }
            }
            secondaryContent {
            ... on ContentfulTestimonials {
                testimonials {
                  author
                  snippet
                }
              }
            }
          }
        }
    `);

    const { images } = data?.home.mainContent[0];
    const { testimonials: quotes } = data?.home.secondaryContent[0];
    
    // -------------------------------------------
    
    const [fadeOut, setFadeOut] = useState(false);

    const [index, setIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);

    const [isMounted, setIsMounted] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        return () => setIsMounted(false);
    }, []);

    useEffect(() => {

        let timeout = () => {};

        if(isMounted) {
            setFadeOut(false); // fades in

            // variable to stop/kickstart timeouts again after mouseover - mouseleave
            if(!isHovering) {
                // console.log("not hovering");

                // while in faded-in (visible) state, wait for given duration
                timeout = setTimeout(() => { // captures current timer id in a global container for pauseSlides & cleanup
                    setFadeOut(true); // fades out

                    // wait the time it takes to fade out, then swap
                    setTimeout(() => {

                        // while faded out (invisible), updates the index
                        // in turn calling useEffect and repeating the cycle
                        if((type === "img" && index !== images.length - 1) 
                        || (type === "text" && index !== quotes.length - 1)) { 
                            setIndex(index + 1);
                        } else { setIndex(0); }
                        
                        if(nextIndex !== images.length - 1) {
                            setNextIndex(nextIndex + 1); // FIX?: this is a dependency, so kicks off another run of useEffect immediately after index, could remove as dependency but then React complains..
                        } else { setNextIndex(0); }
                        
                    }, transition);

                }, duration);

            } else {
                clearTimeout(timeout);
                // console.log("hovering");
            };
        };

        return () => clearTimeout(timeout);

    }, [isMounted, isHovering, index, nextIndex, type, transition, duration, images.length, quotes.length]);

    if(images && type === "img") {
        return (
            <ImageContainer fade={fadeOut ? true : false} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <Image
                    id="slide-img" 
                    src={images[index].image.fluid.src} 
                    title={images[index].title} 
                    alt={images[index].altTag} 
                />
                <HiddenImage 
                    src={images[nextIndex].image.fluid.src} alt="" // loads the next image to prevent occasional delayed swap issue
                />
            </ImageContainer>
        );
    } else if (quotes && type === "text") {
        return (
            <QuoteContainer>
                <StyledLink to="/about#testimonials">
                    <Blockquote id="slide-text" fade={fadeOut ? true : false}>
                        <Paragraph>
                            <Span>“ </Span>{quotes[index].snippet}<Span> ”</Span>
                        </Paragraph> 
                        <Cite>{quotes[index].author}</Cite>
                    </Blockquote>
                </StyledLink>
            </QuoteContainer>
        );
    } else return null;

};

const ImageContainer = styled.div`
    width: 64%;
    opacity: ${props => props.fade ? "0" : "1"};
    transition: opacity 0.5s;
    @media only screen and (max-width: 1000px) {
        width: 100%;
    }
`;

const Image = styled.img`
    width: 95%;
    @media only screen and (max-width: 1000px) {
        width: 100%;
    }
`;

const HiddenImage = styled.img`
    position: absolute;
    left: -10000px;
`

const QuoteContainer = styled.div`
    min-width: 33%;
    font-size: larger;
    margin-right: 1.3em;
`;

const Blockquote = styled.blockquote`
    margin: 0.65em;
    text-align: center;
    opacity: ${props => props.fade ? "0" : "1"};
    transition: opacity 0.5s;
`;

const Paragraph = styled.p`
    margin-top: 0;
    font-family: 'Bebas Neue', sans-serif;
    font-weight: normal;
    font-size: larger;
    letter-spacing: 0.1em;
    line-height: 100%;
    color: #3a3a87;
`;

const Cite = styled.cite`
    margin-top: 0;
    font-family: 'Bebas Neue', sans-serif;
    font-weight: normal;
    letter-spacing: 0.1em;
    line-height: 100%;
    color: black;
    font-size: large;
    font-style: normal;
`;

const Span = styled.span`
    font-family: 'Times New Roman';
    color: #A496FF;
    &:first-child {
        font-size: 4em;
        position: relative;
        top: 0.3em;
    }
    &:last-child {
        font-size: 6em;
        opacity: 0.4;
        vertical-align: middle;
        float: right;
        padding-top: 0.4em;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    &:active {
        color: black;
    }
`;