import React, { useEffect } from 'react';
import Indicator from './Indicator';

const ProgressBar = ({ progress }) => {



  // !! 이건 다운로드 (axios) 통신에 대한거임 !!! 이미 다운로드 받아져있으면 true 이지만 progress 는 0임!!
  useEffect(()=> {
    console.log(progress)
  },[progress])
    
  
  

  return (
    <div style={{ width: '100%', backgroundColor: '#ccc' }}>
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: 'blue',
          height: '10px'
        }}
      ></div>
      
    </div>
  );
};

export default ProgressBar;