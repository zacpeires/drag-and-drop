import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ResizeIcon from '../components/ResizeIcon';

// look at offset from top and workout limitations on resizing !!

const Draggable = styled.div.attrs({
  style: ({ top, left, height, width }) => ({
    top: top ? top : null,
    left: left ? left : null,
    height: height ? `${height}px` : null,
    width: width ? `${width}px` : null,
  }),
})`
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    z-index: 10;
    cursor: ${props => props.cursor}
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    
`;

const Video = styled.video`
  height 135%;
  width: 100%;
`;

export default () => {
  const [top, setTop] = useState(null);
  const [left, setLeft] = useState(null);
  const [width, setWidth] = useState(250);
  const [height, setHeight] = useState((250 * 9) / 16);
  const [cursor, setCursor] = useState('move');
  const [functionality, setFunctionality] = useState('drag');
  const videoRef = useRef(null)

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
      height: rect.height || rect.bottom - rect.top,
      right: rect.right,
      bottom: rect.bottom,
    };
  };

  const handleMouseOver = e => {
    const bounds = getBound();
    if (
      bounds.left + bounds.width - e.clientX <= 30 &&
      bounds.top + bounds.height - e.clientY <= 30
    ) {
      setCursor('grabbing');
      setFunctionality('resize');
    } else {
      setCursor('move');
      setFunctionality('drag');
    }
  };

  const handleMouseDown = e => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    e = e || window.event;
    e.preventDefault();
    e.persist();
    pos3 = e.clientX;
    pos4 = e.clientY;
  };

  const handleMouseMove = e => {
    e = e || window.event;
    e.preventDefault();
    const bounds = getBound();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    const element = document.getElementById('draggable');
    // set the element's new position:
    if (functionality === 'drag') {
      dragElement(element, pos2, pos1, bounds);
    }

    if (functionality === 'resize') {
      resizeElement(pos3, bounds);
    }
  };

  const resizeElement = (x, boundary) => {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    if (x - boundary.left > 100 &&    boundary.left >= 0 &&
      boundary.top >= 0 &&
      boundary.right <= pageWidth &&
      boundary.bottom <= pageHeight) {
      setWidth(x - boundary.left);
      setHeight(((x - boundary.left) * 9) / 16);
    } else if (boundary.left <= 0) {
      setLeft(`${width / 2 + 1}px`);
    } else if (boundary.top <= 0) {
      setTop(`${height / 2 + 1}px`);
    }
  };

  const dragElement = (element, y, x, boundary) => {
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;
    console.log(pageWidth, boundary.width, boundary)
    if (
      boundary.left >= 0 &&
      boundary.top >= 0 &&
      boundary.right <= pageWidth &&
      boundary.bottom <= pageHeight
    ) {
      setTop(`${element.offsetTop - y}px`);
      setLeft(`${element.offsetLeft - x}px`);
    } else if (boundary.left <= 0) {
      setLeft(`${width / 2 + 1}px`);
    } else if (boundary.top <= 0) {
      setTop(`${height / 2 + 1}px`);
    } else if (boundary.right >= pageWidth) {
      setLeft(pageWidth - boundary.width / 2 - 1);
    } else if (boundary.bottom >= pageHeight) {
      setTop(pageHeight - boundary.height / 2 - 1);
    }
  };

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const getMedia = async constraints => {
    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.log(err.message)
    }
  };
  useEffect(() => {

      const constraints = { video: {
        width: { min: 1024, ideal: 1920 },
        height: { min: 776, ideal: 1080 },      
        deviceId: 'df940085e6ff5a844a8d4cba235310bd208abc44b16297d81fc7adb3cde638af'} 
      }

    getMedia(constraints);
  }, []);

  return (
    <>
      <Draggable
        id='draggable'
        onMouseDown={handleMouseDown}
        top={top}
        onMouseMove={handleMouseOver}
        width={width}
        height={height}
        left={left}
        cursor={cursor}
      >
        <ResizeIcon />
        <Video ref={videoRef} autoPlay={true} id='videoElement' />
      </Draggable>
    </>
  );
};
