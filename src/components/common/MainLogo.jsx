import React from 'react'
import { styled } from 'styled-components'
import {useNavigate} from 'react-router-dom'

const MainLogo = () => {

    const navigate = useNavigate();

    const onPress = () => {
        navigate("/")
    }

  return (
    <MainLogoCtnr
        onClick={onPress}
    >
        MainLogo
    </MainLogoCtnr>
  )
}

export default MainLogo

const MainLogoCtnr = styled.div`
    width: 90px;
    height: 30px;
    background-color: #fff;
    color: #3366FF;

    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;

`

