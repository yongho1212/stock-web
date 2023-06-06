import React, { useEffect } from 'react';
import './App.css';
import Main from './pages/Main';
import Header from './components/header/Header'

import {downloadZip, dbChecker} from './apis/initapi';
import {getWeekdaysLast52WeeksWithoutHolidays} from './apis/getDateInfo';

import { useDispatch } from 'react-redux';
import { setDays } from './state/date/dateSlice'


const App = () => {
  const dispatch = useDispatch();

  const apikey = process.env.REACT_APP_PUBLIC_DATA_API_KEY

  console.log(sessionStorage.getItem('access_token'))
  console.log(sessionStorage.getItem('userdata'))

  useEffect(() => {
    const fetchDate = async() =>{
      const dates = await getWeekdaysLast52WeeksWithoutHolidays();
      console.log(dates)
      dispatch(setDays(dates));
    }
    fetchDate();
  },[])

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
      <Header />
      <Main />
    </>
  );
}

export default App;
