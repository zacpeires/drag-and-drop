import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import defaultBackground from '../assets/images/default.jpg';

const BackgroundImage = styled.img`
    position: absolute;
    width: 100%;
    height: 100vh
    object-fit: cover;
    top: 0;
`;

const FileInput = styled.input`
  display: none;
`;

const StyledLabel = styled.label`
  cursor: pointer;
  background-color: #e65252;
  color: white;
  font-family: arial;
  width: max-content;
  padding: 15px 20px;
  font-weight: 500;
  display: flex;
  z-index: 5;
  display: none;
  ${props => {
    if (props.showUploadButton) {
      return `
                display: flex;
            `;
    }
  }}
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  height: 80px;
  width: 150px;
`;

export default () => {
  const imageRef = useRef(null);
  const fileInputRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [showUploadButton, setShowUploadButton] = useState(false);

  const handleChange = event => {
    const fileReference = event.target.files[0];
    const reader = new FileReader();
    console.log(reader);
    reader.onload = event => {
      imageRef.current.src = event.target.result;
    };
    reader.readAsDataURL(fileReference);
    setLoaded(true);
  };

  return (
    <>
      <FileInput
        type='file'
        id='file'
        ref={fileInputRef}
        name='file'
        accept='image/png, image/jpeg'
        onChange={handleChange}
      />
      <BackgroundImage
        ref={imageRef}
        loaded={loaded}
        onMouseOver={() => setShowUploadButton(false)}
      />
      <ButtonContainer onMouseOver={() => setShowUploadButton(true)}>
        <StyledLabel
          for='file'
          loaded={loaded}
          showUploadButton={showUploadButton}
        >
          Choose a file...
        </StyledLabel>
      </ButtonContainer>
    </>
  );
};
