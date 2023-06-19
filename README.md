# 전자공시 시스템과 공공데이터를 활용한 주식 검색사이트

전자공시 시스템과 공공데이터 API를 이용하여, 사용자가 원하는 정보를 검색하고 보여주는 주식 검색 웹사이트입니다.

## 기술 스택

- React
- Redux
- TypeScript

## 사용 API

- Dart (전자공시 시스템)
- 공공데이터
- 카카오 로그인

## 고민했던 부분 및 해결방법

1. 검색 최적화: 사용자가 입력할 때마다 검색 결과를 요청하여 최적화가 필요했습니다. debounce 함수를 통해 입력이 끝난 후 정해진 시간이 지난 다음 검색 결과를 요청하는 방식으로 최적화를 해결했습니다.
   
2. DOM 특정 부분 클릭시 이벤트 발생시키기: 사용자가 특정 부분을 클릭했을 때만 이벤트가 발생해야 했습니다. 이 문제는 `useRef`를 사용하여 DOM에 대한 참조를 얻고, 클릭 이벤트가 발생한 DOM 요소를 확인하는 방법으로 해결했습니다.

3. 최근 52주간의 개장일에 대한 평일 데이터에 대해 각각 api call을 하니 일일 제한량을 초과해버려서. 해결하는 방법을 생각해야했다.

## 프로젝트 진행중!!!
