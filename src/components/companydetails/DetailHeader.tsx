import React from 'react';
import styled from 'styled-components';

import Spacer from '../common/Spacer';

interface DetailHeaderProps {
    stock_name: string | undefined;
    stock_code: string;
    price: string | undefined;
    vs: string | undefined;
    vsp: string | undefined;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ stock_name, stock_code, price, vs, vsp }) => {

    const isVsPositive = parseFloat(vs || '0') >= 0;
    const isVspPositive = parseFloat(vsp || '0') >= 0;

    return (
        <HeaderContainer>
            <Item style={{ fontSize: '40px', }}>{stock_name} ({stock_code})</Item>
            <PriceInfoContainer>
                <PriceInfoText style={{ fontSize: '60px', fontWeight: 'bold' }}>
                    {price && parseFloat(price).toLocaleString()}
                </PriceInfoText>
                <Spacer width={10}/>
                <VsContainer>
                    <PriceInfoText
                        style={{
                            fontSize: '30px',
                            fontWeight: 'bold',
                            color: isVsPositive ? 'green' : 'red',
                        }}
                    >
                        {isVsPositive ? '+' : ''}{vs && parseFloat(vs).toLocaleString()}원
                    </PriceInfoText>
                    <Spacer width={7}/>
                    <PriceInfoText style={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        color: isVspPositive ? 'green' : 'red',
                    }}>
                        ({isVspPositive ? '+' : ''}{parseFloat(vsp || '0').toFixed(2)}%)
                        </PriceInfoText>
                </VsContainer>
            </PriceInfoContainer>
        </HeaderContainer>
    )
}

export default DetailHeader

const HeaderContainer = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme["--300-color"]};
  color: ${(props) => props.theme["--800-color"]};
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
`;

const Item = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
`;

const PriceInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: baseline;
`

const VsContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`

const PriceInfoText = styled.span`
    
`