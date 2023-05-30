import {useState, useEffect} from 'react'

// 콜백함수 


const useDebounce = (value, delay) => {
  
  const [debouncedValue, setDebouncedValue] = useState(value)
    
  useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedValue(value);
    },delay)
    return () => {
        clearTimeout(timer)
    }
  },[value])
  
  
  
  
return debouncedValue;
  
}

export default useDebounce