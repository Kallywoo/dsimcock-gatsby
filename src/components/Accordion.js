// could just swap out with a plugin instead? would probably easily allow for animations and etc

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

import arrow from '../images/accordion-arrow.png';

export const Accordion = ({ title, children }) => {

    const [active, setActive] = useState(false);

    const toggle = () => {    
        setActive(!active);
    };
    
    return (
        <>
            <Button aria-expanded={active ? true : false} onClick={toggle}>{title}</Button>
            {active && <Panel>{children}</Panel>}
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
    font-size: 0.68em;

    &:after {
        content: url(${arrow});
        position: relative;
        left: 6%;
        float: right;
        transform: ${props => props['aria-expanded'] ? "rotate(180deg)" : "none"};
        transition: rotate 0.2s ease-in-out;
        transition: left 0.2s ease-in-out;

        @media only screen and (max-width: 680px) {
            left: 10%;
        };

        @media only screen and (max-width: 480px) {
            display: none;
        };
    };

    &:hover {
        color: #1693eb;
    };

    &:hover:after {
        left: 0%;
        transition: all 0.2s ease-in-out;
    };

    @media only screen and (max-width: 1000px) {
        text-align: center;
    };

    @media only screen and (max-width: 480px) {
        font-size: medium;
        border: 2px solid white;
        border-radius: 5px;
        box-shadow: ${props => !props['aria-expanded'] ? "1px 1px 3px 1px rgba(0,0,0,0.25)" : "none"};
        margin: 0.5em 0em;
    };
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
    animation: ${PanelAnimation} 0.8s ease-out;

    @media only screen and (max-width: 1000px) {
        text-align: center;
    };
`;