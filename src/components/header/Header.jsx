import React from 'react'

import SearchForm from '../SearchForm'

import { styled } from 'styled-components'



const Header = () => {
  return (
    <HeaderContainer>
        <SearchForm />
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

