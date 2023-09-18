import React from 'react'

import MainLogo from '../common/MainLogo'
import SearchForm from '../SearchForm'
import KakaoLogin from '../auth/kakaoAuth/KakaoLogin'
import KakaoLogout from '../auth/kakaoAuth/KakaoLogout'
import ThemeChangeBtn from '../common/ThemeChangeBtn'

import { styled } from 'styled-components'

import { useSelector } from 'react-redux'




const Header = () => {

  const authState = useSelector(state => state.auth)
  console.log(authState.auth)
  const authCheck = authState.auth

  return (
    <HeaderContainer>
        <MainLogo/>
        <SearchForm />
        {/* {authCheck ?
        <KakaoLogout />
        :
        <KakaoLogin />
        } */}
        <ThemeChangeBtn />
        
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
    width: 100%;
    z-index: 999;
    background-color: ${(props) => props.theme["--100-color"]};
    display: flex;
    justify-content: space-between;
    align-items: center;   

    @media (min-width:868px) { // 화면 크기가 최소한 데스크탑이라 가정
        width: auto;
        max-width:868px; // 내용의 최대 너비 설정
        margin-left:auto; // 중앙 정렬을 위한 마진 설정
        margin-right:auto; // 중앙 정렬을 위한 마진 설정
}
`

