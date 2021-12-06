import React, { useState } from 'react';
import styled from 'styled-components';

export const ContactForm = () => {

    // https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el

    const initialValues = {
        name: "",
        email: "",
        message: "",
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();

        // whatever goes here for dealing w/ submitted things
    };

    const handleReset = () => {
        setValues(initialValues);
    };

    return (
        <FormContainer>
            <MainText>Email Us!</MainText>
            <form onSubmit={handleSubmit}>
                <Fields>
                    <Label htmlFor="name">Your Name:
                        <Input 
                            name="name" 
                            type="text" 
                            id="name" 
                            value={values.name} 
                            onChange={handleInputChange}
                        />
                    </Label>
                    <Label htmlFor="email">E-Mail Address:
                        <Input 
                            name="email" 
                            type="email" 
                            id="email" 
                            value={values.email} 
                            onChange={handleInputChange}
                        />
                    </Label>
                    <Label htmlFor="message">Message:
                        <TextArea 
                            name="message" 
                            type="text" 
                            id="message" 
                            value={values.message} 
                            onChange={handleInputChange}
                        ></TextArea>
                    </Label>
                    <ButtonContainer>
                        <Button type="reset" onClick={handleReset} switch>Reset</Button>
                        <Button type="submit">Submit</Button>
                    </ButtonContainer>
                </Fields>
            </form>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    width: 60%;
    background-color: #c9d0de;
    color: #445668;
    text-align: center;
    margin: 0 auto;
    @media only screen and (max-width: 1000px) {
        width: 100%;
    }
`;

const MainText = styled.h2`
    font-family: 'Bebas Neue', sans-serif;
    font-size: xx-large;
    letter-spacing: 0.1em;
    margin: 0;
    margin-top: 0.5em;
    @media only screen and (max-width: 480px) {
        display: none;
    }
`;

const Fields = styled.fieldset`
    border: none;
    text-align: right;
    margin: 1.3em;
    padding: 0;
    @media only screen and (max-width: 1000px) {
        text-align: center;
        padding: 0.5em;
    }
    @media only screen and (max-width: 410px) {
        margin: 1.3em 0;
        padding: 0;
    }
`;

const Label = styled.label`
    display: block;
    margin-left: auto;
    margin-bottom: 0.65em;
    @media only screen and (max-width: 1000px) {
        margin: 1em 0.5em 0.5em 0.5em;
        text-align: left;
    }
    @media only screen and (max-width: 480px) {
        text-align: center;
        font-size: xx-large;
        margin-left: 0;
        margin-right: 0;
    }
`;

const Input = styled.input`
    width: 60%;
    outline: none;
    padding: 0.2em 0;
    border: none;
    margin-left: 0.65em;
    @media only screen and (max-width: 1000px) {
        display: block;
        margin: 0.5em auto;
        width: 85%;
        font-family: "Calibri";
    }
    @media only screen and (max-width: 480px) {
        width: 95%;
        padding: 0.3em 0.1em;
        font-size: 1em;
    }
`;

const TextArea = styled.textarea`
    vertical-align: top;
    resize: none;
    height: 6em;
    width: 60%;
    outline: none;
    padding: 0.2em 0;
    border: none;
    margin-left: 0.65em;
    @media only screen and (max-width: 1000px) {
        display: block;
        margin: 0.5em auto;
        width: 85%;
        font-family: "Calibri";
    }
    @media only screen and (max-width: 480px) {
        width: 95%;
        padding: 0.3em 0.1em;
        font-size: 1em;
    }
`;

const ButtonContainer = styled.div`
    @media only screen and (max-width: 1000px) {
        display: flex;
        justify-content: flex-end;
        flex-flow: wrap;
    }
`;

const Button = styled.button`
    border: none;
    margin-left: 0.65em;
    margin: 1em 0em 1em 1em;
    padding: 0.5em 4em;
    border-radius: 8px;
    cursor: pointer;
    &:active {
        background-color: #adadad;
    }
    @media only screen and (max-width: 1000px) {
        width: 95%;
        margin: 1em auto;
        order: ${props => props.switch ? "1" : "0"};
    }
    @media only screen and (max-width: 480px) {
        font-size: 2em;
    }
    @media only screen and (max-width: 410px) {
        padding: 0.5em 0em;
    }
`;