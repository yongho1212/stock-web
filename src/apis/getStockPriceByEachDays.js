import axios from "axios";
import {getStockPrice} from "./getStockPrice"
import { useSelector } from "react-redux";

const days = useSelector((state) => state.dates);

// 날짜를 forEach로 돌면서 api call 
// 각 날짜에 해당하는 정보를 array에 저장

export const getStockPriceByEachDays = async() => {
    
}