# 주식 정보 웹사이트

![스크린샷 2023-10-20 오후 6.26.59.png](https://github.com/yongho1212/stock-web/assets/61383329/a1b64802-79e6-40eb-9eab-faf596a03b57)

https://github.com/yongho1212/stock-web/assets/61383329/a1b64802-79e6-40eb-9eab-faf596a03b57

### 요약

> 주식 정보 제공 웹사이트 입니다.
> 

### 설명

<aside>
💡 DART와 공공데이터 API를 활용하여 주식데이터를 받아오고 검색 기능을 직접 구현하여 검색한 주식에 대한 정보를 차트와 함께 보여주는 서비스입니다.

</aside>

![스크린샷 2023-10-22 오후 4.38.32.png](https://github.com/yongho1212/stock-web/assets/61383329/26e77c06-f1d8-41e3-afea-37140313cdda)

## 역할

- 공동데이터, DART api 연동
- CORS에러 해결을 위한 proxy server구축
- 주가 데이터 차트 렌더
- 검색 기능
- useDebounce등 커스텀훅 제작

## 기간

- 2023.05 ~ 2023.06

## **사용기술**

- TypeScript
- ReactJs
- NodeJs
- Styled-Component

## **구현 주요기능**

1. 검색 

![주식검색](https://github.com/yongho1212/stock-web/assets/61383329/725b2642-8dd5-4373-970b-697516d945c9)

**useDebounce Hook: useDebounce는 사용자가 입력을 마칠 때까지 일정 시간 동안 기다렸다가 입력값을 반환하는 커스텀 훅입니다. 이 예제에서는 500ms 동안 debounce 처리가 되며, 이 기간 동안 사용자의 추가 입력이 없으면 `debouncedKeyword`에 최종 검색어가 저장됩니다. 이를 통해 불필요한 요청을 최소화하여 검색 기능을 최적화 합니다.** 

**검색 결과 요청: `debouncedKeyword` 값이 변경될 때마다 `getSearchResult` 함수가 호출되어 검색 결과를 요청합니다. 요청은 IndexedDB에서 데이터를 가져오는 `fetchIndexedDB` API를 통해 이루어집니다.**

**검색 결과 필터링: 가져온 데이터 중에서 검색어(`debouncedKeyword`)와 일치하거나 관련된 항목들만 선택하여 상태 변수인 `searchResults`에 저장합니다.**

1. 차트 구현

![스크린샷 2023-10-20 오후 6.52.20.png](https://github.com/yongho1212/stock-web/assets/61383329/309273c3-3aef-43c7-a8ab-468c2e711ba8)


**데이터 전처리: 먼저, 공휴일 등 주식 휴장으로 인해 값이 비어있는 날짜를 채워줍니다.**

**값 보간: 이후에 중간에 값이 비어있는 경우(`price`가 null인 경우) 앞선 일자의 가격으로 값을 채워넣습니다.**

**차트 생성: 전처리된 데이터(`filledData`)를 바탕으로 Recharts의 LineChart 컴포넌트로 차트를 생성합니다.**

## 프로젝트 **회고**

### **서버 부하 관리**

**프로젝트 초기에는 서버 부하를 충분히 고려하지 않아 코드를 작성하였습니다. 이로 인해 사용자의 행동이나 요청에 따라 API 호출량이 급격히 증가하는 상황을 경험하게 되었습니다.** 

1. Debounce 기법 도입

첫 번째로, 검색 컴포넌트에서 useDebounce 커스텀 훅을 제작하여 사용자의 타이핑에 디바운스를 적용하였습니다. 이 방법은 사용자가 검색어를 입력할 때마다 실시간으로 요청하는 대신, 일정 시간동안 입력이 없는 경우에만 요청을 보내도록 구현하여 불필요한 요청 수를 줄일 수 있었습니다.

2. 데이터 요청 및 처리방식 변경

두 번째로, 차트 데이터를 받아오기 위해 각각의 시간대별로 따로 요청을 보내던 것에서 벗어나 일정 기간 동안의 데이터를 한 번에 요청하는 방식으로 변경하였습니다. 받아온 데이터는 클라이언트 측에서 가공하여 필요한 형태로 변환 후 사용되도록 하여 API 호출 수를 크게 줄일 수 있었습니다.
