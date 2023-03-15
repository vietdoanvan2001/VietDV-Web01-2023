import axios from "../base-axios";
import {endPoint} from '@/axios/end-point.js';

/**
 * Hàm call api lấy toàn bộ danh sách nhân viên
 * @returns danh sách nhân viên
 * author: VietDV(25/2/2023)
 */
export async function getAllEmployee(){
    const endpoint = endPoint.EMPLOYEES;
    return await axios.getAxios(endpoint);
}

/**
 * Hàm call api lấy danh sách nhân viên theo điều kiện
 * @param {params: {pageSize, pageNumber, employeeFilter}} params 
 * @returns danh sách nhân viên thoả mãn điều kiện
 * author: VietDV(25/2/2023)
 */
export async function getEmployeeFilter(params){
    const endpoint = endPoint.EMPLOYEES_FILTER;
    return await axios.getAxios(endpoint,params)
}

/**
 * Hàm call api lấy thông tin nhân viên theo id
 * author: VietDV(28/2/2023)
 * @param {*} id 
 * @returns 
 */
export async function getEmployeeByID(id){
    const endpoint = endPoint.EMPLOYEES+"/"+id;
    return await axios.getAxios(endpoint)
}

/**
 * Hàm call API thêm mới thông tin nhân viên
 * author: VietDV(28/2/2023)
 * @param {employee} body 
 * @returns 
 */
export async function addNewEmployee(body){
    const endpoint = endPoint.EMPLOYEES;
    return await axios.postAxios(endpoint,body)
}

/**
 * Hàm call API lấy mã nhân viên kế tiếp
 * author: VietDV(1/3/2023)
 * @returns 
 */
export async function getNewEmployeeCode(){
    const endpoint = endPoint.NEW_EMPLOYEE_CODE;
    return await axios.getAxios(endpoint)
}

/**
 * Hàm call API xoá nhân viên theo ID
 * author: VietDV(1/3/2023)
 * @param {*} entityId 
 * @returns 
 */
export async function deleteEmoloyeeByID(entityId){
    const endpoint = endPoint.EMPLOYEES+"/"+entityId;
    return await axios.deleteAxios(endpoint)
}

/**
 * Hàm call API cập nhật thông tin nhân viên
 * @param {*} entityId 
 * @returns 
 */
export async function putEmployee(entityId,body) {
    const endpoint = endPoint.EMPLOYEES+"/"+entityId;
    return await axios.putAxios(endpoint,body)
}
