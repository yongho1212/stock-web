import React from 'react'
import axios from 'axios'

import kakaologinBtn from '../../../assets/logos/kakao_login_small.png'


const KakaoLogin = () => {

    const kapikey = process.env.REACT_APP_KAKAO_REST_API_KEY
    const redirectUri = process.env.REACT_APP_REDIRECT_URI

    const kakaoLogin = async() => {
        const first = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kapikey}&redirect_uri=${redirectUri}`
        window.location.href = first
    }


  return (
    <div>
        <img 
            src={kakaologinBtn} 
            alt="kakao login" 
            onClick={() => kakaoLogin()}
        />
    </div>
  )
}

export default KakaoLogin