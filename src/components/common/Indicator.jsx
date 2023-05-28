import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import styled, { keyframes } from "styled-components";

const Indicator = () => {
  const [loading, setLoading] = useState(true);


  return (
    <>
      {loading && (
        <LoadingIndicator>
          <AiOutlineLoading size={30} />
        </LoadingIndicator>
      )}
    </>
  );
};

export default Indicator;

// 로딩 인디케이터 애니메이션
const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 스타일드 컴포넌트로 로딩 인디케이터 스타일 정의
const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  animation: ${spinAnimation} 1s linear infinite;
`;
