import React from 'react'


import MainLogo from '../common/MainLogo'
import SearchForm from '../SearchForm'
import KakaoLogin from '../auth/kakaoAuth/KakaoLogin'
import KakaoLogout from '../auth/kakaoAuth/KakaoLogout'

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
        {authCheck ?
        <KakaoLogout />
        :
        <KakaoLogin />
        }
        
        
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
    width: 100%;
    z-index: 999;
    background-color: red;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
`

