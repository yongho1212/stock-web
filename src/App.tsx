import React, { useEffect } from 'react';
import './App.css';
import Main from './pages/Main';
import {downloadZip, dbChecker} from './apis/initapi';



const App = () => {

  // !!TODO checker가 PENDING 상태일 때 INDICATOR RENDER

  // 마운트시 indexedDB에 데이터가 있는지 확인하고 없는 경우에만 downloadzip을 실행함
  useEffect(() => {
    async function fetchData(){
      const result = await dbChecker();
      if (!result) {
        await downloadZip();
      }
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
