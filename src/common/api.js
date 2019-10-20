/**   
 * api接口统一管理
 */
import {  post, get } from './http.js'
const apiUrl = 'http://47.102.210.73:9896'
// export const postRequest = p => post('api/v1/users/my_address/address_edit_before', p);

export const userLogin = p => post(`${apiUrl}/waken/dorm/login`, p);
export const getMenuData = () => get(`${apiUrl}/waken/dorm/resources/menu`);
export const getUserList = p => post(`${apiUrl}/waken/dorm/user/page`, p);
export const saveUser = p => post(`${apiUrl}/waken/dorm/user/save`, p);
export const delUser = p => post(`${apiUrl}/waken/dorm/user/delete`, p);