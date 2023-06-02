import React from 'react'

import SearchForm from '../SearchForm'
import KakaoLogin from '../auth/KakaoLogin'

import { styled } from 'styled-components'

import { useSelector } from 'react-redux'




const Header = () => {

  const authState = useSelector(state => state.auth)
  console.log(authState)

  return (
    <HeaderContainer>
        <SearchForm />
        <KakaoLogin />
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
    width: 100%;
    z-index: 999;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
`

