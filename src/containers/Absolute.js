import React from 'react';
import styled from 'styled-components';

const Draggable = styled.div`
    height: 0;
    width: 100px;
    padding-bottom: 56.25%;
    position: absolute;
    background-color: pink;
`

const Absolute = () => {
    return (
        <Draggable />
    )
}

export default Absolute;