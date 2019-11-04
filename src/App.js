import React from 'react';
import Custom from './containers/Custom'
import './index.css'
import SizeObserver from './containers/SizeObserver';
import styled from 'styled-components';
import Absolute from './containers/Absolute';



const App = () => {
  return (
    <>
       {/* <Absolute /> */}
       
      {/* <InteractJS /> */}
      <Custom />
      {/* <SizeObserver name="test">
         {id => <Box id={id}>Box</Box>}
       </SizeObserver> */}
    </>
  );
}

export default App;
