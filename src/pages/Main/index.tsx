import React from 'react';
import styled from 'styled-components';

const Main = () => {
  return (
    <MainContainer >
      <InverstingApi>
        <iframe 
          height="500px" 
          width="100%" 
          src="https://sslcharts.investing.com/index.php?force_lang=1&pair_ID=650&timescale=86400&candles=50&style=candles">
        </iframe>
        <br />
       
      </InverstingApi>
      <InverstingApi>
        <iframe 
          height="500px" 
          width="100%"  
          src="https://www.widgets.investing.com/live-currency-cross-rates?theme=darkTheme&pairs=1,3,2,4,7,5,8,6,9" 
          frameBorder={0} allowTransparency={true} marginWidth={0} marginHeight={0}>
        </iframe>
      </InverstingApi>

      
    </MainContainer>
  );
}

export default Main;

const MainContainer = styled.div`
  height: 100%;
`

const InverstingApi = styled.div`
  width: 100%;
  height: 100%;
  
`;