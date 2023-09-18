import React, { useEffect, useState } from 'react';
import './App.css';
import Main from './pages/Main';
import Header from './components/header/Header'

import { downloadZip, dbChecker } from './apis/initapi';
import { getWeekdaysLast52WeeksWithoutHolidays } from './apis/getDateInfo';

import { useDispatch } from 'react-redux';
import { setDays } from './state/date/dateSlice'
import ProgressBar from './components/common/ProgressBar';
import Indicator from './components/common/Indicator';

import { Outlet, useParams } from 'react-router-dom'
import { styled } from 'styled-components';


const App = () => {
  const { id } = useParams();

  const [progress, setProgress] = useState(0);
  const [dbstatus, setDbStatus] = useState(false)
  // const [dbState, setDBState] = useState(false);
  const dispatch = useDispatch();

  // const apikey = process.env.REACT_APP_PUBLIC_DATA_API_KEY

  // console.log(sessionStorage.getItem('access_token'))
  // console.log(sessionStorage.getItem('userdata'))

  


  useEffect(() => {
    const fetchDate = async () => {
      const dates = await getWeekdaysLast52WeeksWithoutHolidays();
      console.log(dates)
      // dispatch(setDays(dates));
      if (dates){
        localStorage.setItem("dates", JSON.stringify(dates));
        
      }
      
    }
    fetchDate();
    
  }, [])

  // !!TODO checker가 PENDING 상태일 때 INDICATOR RENDER
  // !!TODO indexed db에 넣는동안 진행상황 보여주시 (PROGRESS BAR)

  // 마운트시 indexedDB에 데이터가 있는지 확인하고 없는 경우에만 downloadzip을 실행함
  useEffect(() => {
    async function fetchData() {
      const result = await dbChecker();
      
      if (!result) {
        setDbStatus(false)
        await downloadZip((percentage) => setProgress(percentage));
      }else{
        setDbStatus(true)
      }
    }
    fetchData();
  }, [])

  return (
    <Rootwrepper key={id}>
      <Header />
      <Outlet />

      {!dbstatus &&
      <>
          <DownloadIndicator>
          서버에서 주식 데이터를 받아오고 있습니다.     
          
          <Indicator />
        {/* <ProgressBar progress={progress}/>  */}
        </DownloadIndicator>
      </>

      }
      
    </Rootwrepper>
  );
}

export default App;

const Rootwrepper = styled.div`
  background-color: ${(props) => props.theme["--100-color"]};
`

const DownloadIndicator = styled.div`
  width: 500px;
  height: 500px;
  background-color:'red';
  
  position: absolute;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -250px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`
