/**   
 * api接口统一管理
 */
import {  post, get } from './http.js'
// const apiUrl = 'http://47.102.210.73:9896'
// export const postRequest = p => post('api/v1/users/my_address/address_edit_before', p);

export const userLogin = p => post('http://47.102.210.73:9896/waken/dorm/login', p);
export const getMenuData = () => get('http://47.102.210.73:9896/waken/dorm/resources/menu');
