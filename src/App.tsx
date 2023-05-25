import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './pages/Main';
import {downloadZip} from './apis/initapi';



// 앱이 켜질 때 zip파일을 미리 받아 오면서 로딩페이지 구현 
// 받아온 데이터는 localstorage안에 저장


const App = () => {

  useEffect(() => {
    async function fetchData(){
      await downloadZip();
    }
    fetchData();
  },[])

  return (
    <>
      <Main />
    </>
  );
}

export default App;
