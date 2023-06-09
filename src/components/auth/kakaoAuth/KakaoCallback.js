import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { login } from "../../../state/auth/authSlice";

const KakaoCallback = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");
  const grant_type = "authorization_code";
  const client_id = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;

  const getAccessToken = async () => {
    try {
      const token = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
        {},
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );
      console.log(token);

      const accessToken = token.data.access_token;

      sessionStorage.setItem("access_token", accessToken);
      dispatch(login());

      const userInfo = await getUserInfo(accessToken);
      const usedata = {nickname: userInfo.kakao_account.profile.nickname, email: userInfo.kakao_account.email}
      sessionStorage.setItem("userdata", JSON.stringify(usedata));

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const getUserInfo = async accessToken => {
    try {
      const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data); // 사용자 정보 출력
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  return <></>;
};

export default KakaoCallback;
