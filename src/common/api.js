/**   
 * api接口统一管理
 */
import {  post, get } from './http.js'
const apiUrl = 'https://aishu.site'
// export const postRequest = p => post('api/v1/users/my_address/address_edit_before', p);

export const userLogin = p => post(`${apiUrl}/waken/dorm/login`, p);
export const getUserList = p => post(`${apiUrl}/waken/dorm/user/page`, p);
export const saveUser = p => post(`${apiUrl}/waken/dorm/user/save`, p);
export const delUser = p => post(`${apiUrl}/waken/dorm/user/delete`, p);
export const saveUserRole = p => post(`${apiUrl}/waken/dorm/user/batch/add/roles`, p);
export const saveUserResource = p => post(`${apiUrl}/waken/dorm/user/batch/add/resources`, p);

export const getMenuData = () => get(`${apiUrl}/waken/dorm/resources/menu`);
export const getAllRoles = () => get(`${apiUrl}/waken/dorm/roles`);
export const getUserResource = p => get(`${apiUrl}/waken/dorm/resources/tree/user/${p}`);