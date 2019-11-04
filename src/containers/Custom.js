import React, { useState } from 'react';
import styled from 'styled-components';

const Draggable = styled.div.attrs({
  style: ({ top, left }) => ({
      top: top ? top : null,
      left: left ? left : null
  }),
})`
    height: 150px;
    width: 250px;
    position: absolute;
    background-color: pink;
    cursor: ${(props) => props.cursor}

`

// bottom to specific size, would be entire screen height - top - desired size
// left would be, entire screen width -right side - desired size

export default () => {  
  const [top, setTop] = useState(null);
  const [left, setLeft] = useState(null);
  const [cursor, setCursor] = useState('move');
  const [functionality, setFunctionality] = useState('drag');
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  const getBound = () => {
    const component = document.getElementById('draggable');
    if (!component) { 
      return {};
    }
    const rect = component.getBoundingClientRect();
    return {
      left: rect.left,
      top: rect.top + window.scrollY,
      width: rect.width || rect.right - rect.left,
      height: rect.height || rect.bottom - rect.top
    };
  }

  const handleMouseOver = (e) => {
    const bounds = getBound()
    if ((e.clientX - bounds.left) <= 30 &&  (e.clientY - bounds.top <= 30)) {
      setCursor('grabbing')
      setFunctionality('resize')
    } else {
      setCursor('move')
      setFunctionality('drag')
    }
  }

  const handleMouseDown = (e) => {
    const bounds = getBound() 
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    e = e || window.event;
    e.preventDefault();
    e.persist();
    pos3 = e.clientX;
    pos4 = e.clientY;
  }


  const handleMouseMove = (e) => {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    const element = document.getElementById('draggable');

    // set the element's new position:
    if (functionality === 'drag') {
      dragElement(element, pos2, pos1)
    }
  };

  const dragElement = (element, top, left) => {
    setTop(`${element.offsetTop - top}px`)
    setLeft(`${element.offsetLeft - left}px`)
  }

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <Draggable id='draggable'
      onMouseDown={handleMouseDown} top={top}
      onMouseMove={handleMouseOver}
      left={left}
      cursor={cursor}
      />
    </>
  )
}