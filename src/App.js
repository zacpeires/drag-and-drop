import React, { useState } from 'react';
import Main from './containers/Main'
import FileUpload from './components/FileUpload';
import styled from 'styled-components';
import './index.css'


const App = () => {


  return (
    <>
      <Main />
      <FileUpload/>
      </>
  );
}

export default App;
