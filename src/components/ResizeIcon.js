import React from 'react';
import styled from 'styled-components';

const ResizeIconContainer = styled.div`
  overflow: hidden;
  position: absolute;
  bottom: -5px;
  right: -15px;
  width: 50px;
  height: 20px;
  transform: rotate(-45deg)
`
const ResizeLine = styled.div`
  width: 100%;
  background-color: black;
  height: 1px;
  margin-bottom: 7px;
  opacity: 0.2;
`

export default () => {
  return (
    <ResizeIconContainer>
      <ResizeLine />
      <ResizeLine />
      <ResizeLine />
      <ResizeLine />
    </ResizeIconContainer>
  );
};
