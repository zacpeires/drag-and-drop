import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const BackgroundImage = styled.img`
${props => {
    if (props.loaded) {
        return `
        width: 100%;
        height: 100vh
        object-fit: cover;
        `
    } else {
        return `
            display: none;
        `
    }
}}
`

const FileInput = styled.input`
    display: none;
`

const StyledLabel = styled.label`
    cursor: pointer;
    background-color:  #e65252;
    color: white;
    font-family: arial;
    width: max-content;
    padding: 15px 20px;
    font-weight: 500;
    display: flex;
    position: absolute;
    top: 25px;
    left: 25px;
    z-index: 5;
    ${props => {
        if (props.loaded) {
            return `
                display: none;
            `
        }
    }}
`

export default () => {
    const imageRef = useRef(null);
    const fileInputRef = useRef(null);
    const [loaded, setLoaded] = useState(false);

    const handleChange = (event) => {
        const fileReference = event.target.files[0]
        const reader = new FileReader();
        console.log(reader)
        reader.onload = event => {
        imageRef.current.src = event.target.result
        }
        reader.readAsDataURL(fileReference);
        setLoaded(true)
    }

    return (
        <>
        <FileInput type="file" id="file" ref={fileInputRef} name="file" accept="image/png, image/jpeg" onChange={handleChange} />
        <BackgroundImage ref={imageRef} loaded={loaded}/>
        <StyledLabel for="file" loaded={loaded}>Choose a file...</StyledLabel>
        </>
    )
}