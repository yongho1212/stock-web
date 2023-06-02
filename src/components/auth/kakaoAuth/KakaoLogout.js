 import React from 'react'
 import axios from 'axios';
 import { useDispatch } from 'react-redux';
 import { logout } from '../../../state/auth/authSlice';

const KakaoLogout = () => {
  const ACCESS_TOKEN = sessionStorage.getItem("access_token");
  const adminkey = process.env.REACT_APP_KAKAO_ADMIN_KEY;

  const dispatch = useDispatch();
  

  const exeLogout = async () => {
    try{
        const klogout = await axios.post("https://kapi.kakao.com/v1/user/logout", {}, {
            headers:{
                "Content-Type": `application/x-www-form-urlencoded`,
                Authorization: `Bearer ${ACCESS_TOKEN}`
            }    
        })
        if (klogout.status === 200) {
            sessionStorage.removeItem("access_token");
            dispatch(logout());
        }
    }catch(e) {
        console.log(e);
    }
  }
  
  
    return (
    <div onClick={exeLogout}>KakaoLogout</div>
  )
}

export default KakaoLogout


// curl -v -X POST "https://kapi.kakao.com/v1/user/logout" \
//   -H "Content-Type: application/x-www-form-urlencoded" \
//   -H "Authorization: Bearer ${ACCESS_TOKEN}"