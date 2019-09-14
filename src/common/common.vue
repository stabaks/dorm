<script type="text/javascript">
import Vue from "vue";
import vueResource from "vue-resource";
Vue.use(vueResource);

const baseUrl = 'http://47.102.210.73:9896/'

export default {
  get(url, cb) {
    return new Promise((resolve, reject) => {
      Vue.http
        .get(`${this.baseUrl}${url}`, { emulateJSON: false })
        .then(cb)
        .catch(err => {
          reject(err);
        });
    });
  },
  post(url, params, cb) {
      console.log(params);
    return new Promise((resolve, reject) => {
      Vue.http
        .post(`${baseUrl}${url}`, params, { emulateJSON: false })
        .then(cb)
        .catch(err => {
          reject(err);
        });
    });
  }
};

// import http from "http.js";
// //使用方法 var url = url; //url地址
// var params = params;
// http.postRequest(url, params, res => {
//   console.log(res);
// });
</script>