import axios from "../base-axios";
import {endPoint} from '@/axios/end-point.js';

/**
 * Hàm call api lấy toàn bộ danh sách Chức vụ
 * @returns danh sách chức vụ
 * author: VietDV(3/3/2023)
 */
export async function getAllPositions(){
    const endpoint = endPoint.POSITIONS;
    return await axios.getAxios(endpoint);
}

/**
 * Hàm call api lấy chức danh theo id
 * @param {*} id 
 * @returns object chức danh
 */
export async function getPositionById(id){
    const endpoint = endPoint.POSITIONS+"/"+id;
    return await axios.getAxios(endpoint);
}