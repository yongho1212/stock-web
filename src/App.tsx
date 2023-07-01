import React, { useEffect } from 'react';
import './App.css';
import Main from './pages/Main';
import Header from './components/header/Header'

import { downloadZip, dbChecker } from './apis/initapi';
import { getWeekdaysLast52WeeksWithoutHolidays } from './apis/getDateInfo';

import { useDispatch } from 'react-redux';
import { setDays } from './state/date/dateSlice'


import { Outlet, useParams } from 'react-router-dom'


const App = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // const apikey = process.env.REACT_APP_PUBLIC_DATA_API_KEY

  // console.log(sessionStorage.getItem('access_token'))
  // console.log(sessionStorage.getItem('userdata'))

  useEffect(() => {
    const fetchDate = async () => {
      const dates = await getWeekdaysLast52WeeksWithoutHolidays();
      console.log(dates)
      dispatch(setDays(dates));
    }
    fetchDate();
    
  }, [])

  // !!TODO checker가 PENDING 상태일 때 INDICATOR RENDER
  // !!TODO indexed db에 넣는동안 진행상황 보여주시 (PROGRESS BAR)

  // 마운트시 indexedDB에 데이터가 있는지 확인하고 없는 경우에만 downloadzip을 실행함
  useEffect(() => {
    async function fetchData() {
      console.log("fetch data init")
      const result = await dbChecker();
      
      if (!result) {
        console.log("zip down load init")
        await downloadZip();
      }
    }
    fetchData();
  }, [])

  return (
    <div key={id}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
