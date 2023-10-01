import React from 'react';
import styled from 'styled-components';

const Main = () => {
  return (
    <MainContainer >
      <MainLeft>
        <iframe 
          height="600px" 
          width="100%"           
          src="https://sslcharts.investing.com/index.php?force_lang=1&pair_ID=650&timescale=86400&candles=100&style=line">
        </iframe>
      </MainLeft>
      <MainRight>
        <iframe 
          height="600px" 
          width="100%"  
          src="https://www.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&pairs=1,3,2,4,7,5,8,6,9" 
          frameBorder={0} allowTransparency={false} marginWidth={0} marginHeight={0}>
        </iframe>
      </MainRight>

      
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  height: 100%;
  display: flex;
  
  flex-direction: row;
  
`


const MainLeft = styled.div`
  flex: 7;
  height: 100%;
`;

const MainRight = styled.div`
  flex: 3;
  height: 100%;
`;