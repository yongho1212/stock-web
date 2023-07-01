import {useState, useEffect} from 'react'

// debounce custom hook 


const useDebounce = (value, delay) => {
  
  const [debouncedValue, setDebouncedValue] = useState(value)
    
  useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
    },delay)

    // clear함수는 unmount되거나 값이 변경될때마다 실행됨
    // 이전의 timer 취소
    return () => {
        clearTimeout(timer)
    }
    // value 값이 변경될때 마다 실행
  },[value])
  

return debouncedValue;
  
}

export default useDebounce