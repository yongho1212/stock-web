import React, { useEffect } from 'react'
import axios from 'axios';

const KakaoCallback = () => {
    useEffect(() => {
        const params = new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grant_type = 'authorization_code';
        const client_id = process.env.REACT_APP_KAKAO_REST_API_KEY;
        const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

    axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
    {},
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
    }
    ).then(res => {
        console.log(res);
    
    })
    
    

    },[])

  return (
    <></>
  )
}

export default KakaoCallback