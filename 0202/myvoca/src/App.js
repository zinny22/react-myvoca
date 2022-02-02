import React from 'react';
import './App.css';
import MyVoca from './MyVoca';
import MyVocaWirte from './MyVocaWrite';
import MyVocaEdit from './MyVocaEdit';
import { Route, Routes } from "react-router-dom";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"

function App() {

  const navigate = useNavigate();

  return (
    <div className="App">
          <Head/>
          <Title onClick={() => { navigate(`/`) }}>💜나만의단어장💜</Title>
          <Routes>
            <Route path="/" element={<MyVoca />} />
            <Route path="/detail" element={<MyVocaWirte/>} />
            <Route path = "/detail/:id" element={<MyVocaEdit/>}/>
          </Routes>
    </div>
  );
}

const Head = styled.div`
height: 14px;
background-color: #7c43bd;
`
const Title = styled.h2`
  padding: 27px;
  margin: 0%;
  z-index: 10;
  display: flex;
  justify-content: center;
  background-color: #d1c4e9;
  color: #7c43bd;
  align-items: center;
  font-size: 43px;
  letter-spacing:12px;
`


export default App;
