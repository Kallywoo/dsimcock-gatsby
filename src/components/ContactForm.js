import React, { useState } from 'react';
import styled from 'styled-components';

import loadingIcon from '../images/spinner.svg';

export const ContactForm = () => {

    // https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el

    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const initialValues = {
        name: "",
        email: "",
        message: "",
        boop: ""
    };

    const [values, setValues] = useState(initialValues);

    const handleInputChange = e => {
        const { name, value } = e.target;

        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const body = {
            ...values,
            RECIPIENT: `${process.env.SES_RECIPIENT}`
        };

        // console.log(body);

        const res = await fetch(`${process.env.API_ENDPOINT}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const text = JSON.parse(await res.text());

        if (res.status >= 400 && res.status < 600) {
            setLoading(false);
            setMessage(''); // clears message if user has already successfully submitted once before an error
            setError(text);
        } else {
            // it worked!
            setLoading(false);
            setError(''); // clears message if user has successfully submitted after an error
            setMessage('Email successfully sent!');
            handleReset();
        };
    };

    const handleReset = () => {
        setValues(initialValues);
    };

    return (
        <FormContainer>
            <MainText>Email Us!</MainText>
            <form onSubmit={handleSubmit}>
                <Fields disabled={loading}>
                    <Label>Your Name:
                        <Input 
                            name="name" 
                            type="text" 
                            value={values.name} 
                            onChange={handleInputChange}
                            required
                        />
                    </Label>
                    <Label>E-Mail Address:
                        <Input 
                            name="email" 
                            type="email" 
                            value={values.email} 
                            onChange={handleInputChange}
                            required
                        />
                    </Label>
                    <Label>Message:
                        <TextArea 
                            name="message" 
                            type="text" 
                            value={values.message} 
                            onChange={handleInputChange}
                            required
                        ></TextArea>
                        <Input 
                            name="boop"
                            type="boop"
                            value={values.boop}
                            onChange={handleInputChange}
                            className="boop"
                        />
                    </Label>
                    <ButtonContainer>
                        <Button type="reset" onClick={handleReset} disabled={loading} switch>Reset</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? <img src={loadingIcon} alt="Submitting" /> : 'Submit'}
                        </Button>
                    </ButtonContainer>
                    <div aria-live="polite" role="status">
                        {message ? <p>{message}</p> : ''}
                    </div>
                    <div aria-live="assertive">
                        {error ? <RedError>Error: {error}</RedError> : ''}
                    </div>
                </Fields>
            </form>
        </FormContainer>
    );
};

const FormContainer = styled.div`
    width: 60%;
    background-color: #c9d0de;
    color: #313e4b; //#445668; changed to higher contrast (a11y)
    text-align: center;
    margin: 0 auto;

    @media only screen and (max-width: 1000px) {
        width: 100%;
    };
`;

const MainText = styled.h2`
    font-family: 'Bebas Neue', sans-serif;
    font-size: 3em;
    letter-spacing: 0.1em;
    margin: 0;
    margin-top: 0.25em;

    @media only screen and (max-width: 480px) {
        /* margin: 0.5em;
        margin-bottom: 0;
        padding-bottom: 0.25em;
        border-bottom: 2px dashed grey; */
        display: none;
    };
`;

const Fields = styled.fieldset`
    border: none;
    text-align: right;
    margin: 1.3em;
    padding: 0;

    @media only screen and (max-width: 1000px) {
        text-align: center;
        padding: 0.5em 0;
        margin-top: 0;
    };
`;

const Label = styled.label`
    display: block;
    margin-left: auto;
    margin-bottom: 0.85em;
    font-size: 0.9em;

    @media only screen and (max-width: 1000px) {
        margin: 1em 0.5em 0.5em 0.5em;
        text-align: left;
    };

    @media only screen and (max-width: 480px) {
        text-align: center;
        font-size: 1.25em;
        margin-left: 0;
        margin-right: 0;
    };
`;

const Input = styled.input`
    width: 60%;
    padding: 0.25em 0.125em;
    margin-left: 1em;
    border: none;

    &.boop {
        display: none;
    };

    @media only screen and (max-width: 1000px) {
        display: block;
        margin: 0.5em auto;
        width: 100%;
        font-size: 1.5em;
    };

    @media only screen and (max-width: 480px) {
        width: 95%;
        padding: 0.3em 0.1em;
        font-size: 1em;
        border-radius: 10px;
    };
`;

const TextArea = styled.textarea`
    width: 60%;
    height: 6em;
    padding: 0.25em 0.125em;
    margin-left: 1em;
    vertical-align: top;
    border: none;
    resize: none;

    @media only screen and (max-width: 1000px) {
        display: block;
        margin: 0.5em auto;
        width: 100%;
        font-size: 1.5em;
    };

    @media only screen and (max-width: 480px) {
        width: 95%;
        padding: 0.3em 0.1em;
        font-size: 1em;
    };
`;

const ButtonContainer = styled.div`
    @media only screen and (max-width: 1000px) {
        display: flex;
        justify-content: flex-end;
        flex-flow: wrap;
    };
`;

const Button = styled.button`
    border: none;
    margin-left: 0.65em;
    margin: 1em 0em 1em 1em;
    padding: 0.5em 4em;
    border-radius: 8px;
    cursor: pointer;
    vertical-align: middle;

    &:active {
        background-color: #adadad;
    };

    &:disabled {
        ${props => props.type === 'submit' ? 'padding: 0.5em 4em' : ''};
        cursor: default;
    };

    img {
        display: block;
        margin: 0 auto;
        width: 16px;
    };

    @media only screen and (max-width: 1000px) {
        width: 95%;
        margin: 1em auto;
        order: ${props => props.switch ? "1" : "0"};
        font-size: 1.5em;
    };

    @media only screen and (max-width: 480px) {
        font-size: 1.25em;
    };

    @media only screen and (max-width: 410px) {
        padding: 0.5em 0em;
    };
`;

const RedError = styled.p`
    color: red;
`;