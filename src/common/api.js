/**   
 * api接口统一管理
 */
import {  post, get, put } from './http.js'
const apiUrl = 'https://aishu.site'
// export const postRequest = p => post('api/v1/users/my_address/address_edit_before', p);

export const getMenuData = () => get(`${apiUrl}/waken/dorm/resources/menu`);
export const changePassword = p => put(`${apiUrl}/waken/dorm/user/current/password`, p);
// 登录
export const userLogin = p => post(`${apiUrl}/waken/dorm/login`, p);
// 用户管理
export const getUserList = p => post(`${apiUrl}/waken/dorm/user/page`, p);
export const saveUser = p => post(`${apiUrl}/waken/dorm/user/save`, p);
export const delUser = p => post(`${apiUrl}/waken/dorm/user/delete`, p);
export const saveUserRole = p => post(`${apiUrl}/waken/dorm/user/batch/add/roles`, p);
export const saveUserResource = p => post(`${apiUrl}/waken/dorm/user/batch/add/resources`, p);
export const getUserResource = p => get(`${apiUrl}/waken/dorm/resources/tree/user/${p}`);
export const getAllRoles = () => get(`${apiUrl}/waken/dorm/roles`);
// 角色管理
export const getRoleList = p => post(`${apiUrl}/waken/dorm/role/page`, p);
export const saveRole = p => post(`${apiUrl}/waken/dorm/role/save`, p);
export const getRoleResource = p => get(`${apiUrl}/waken/dorm/resources/tree/role/${p}`);
export const saveRoleResource = p => post(`${apiUrl}/waken/dorm/role/batch/add/resources`, p);
// 资源管理
export const getAllResource = p => get(`${apiUrl}/waken/dorm/resources/tree`);