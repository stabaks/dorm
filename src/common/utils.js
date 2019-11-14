import Router from '../router.js'

export function GetUrlRelativePath(url) {
  var arrUrl = url.split('//')

  var start = arrUrl[1].indexOf('/')
  var relUrl = arrUrl[1].substring(start)

  if (relUrl.indexOf('?') !== -1) {
    relUrl = relUrl.split('?')[0]
  }
  return relUrl
}
export function cloneObj(obj1, obj2) {
  // debugger
  if (obj1 !== {} && obj1) {
    for (let objAtr1 in obj1) {
      for (let objAtr2 in obj2) {
        if (objAtr1 === objAtr2) {
          obj2[objAtr2] = obj1[objAtr1];
        }
      }
    }
  } else {
    for (let objAtr2 in obj2) {
      obj2[objAtr2] = null;
    }
  }

}
// 动态添加路由
export function menusToRoutes(data) {
  // console.log(data);
  // console.log(this.$router.options.routes);
  const result = [];
  const children = [];
  result.push({
    path: "/",
    redirect: {
      name: "home"
    }
  });
  result.push({
    path: "/home",
    component: () => import("../views/Home"),
    children
  });
  data.forEach(item => {
    generateRoutes(children, item);
  });
  result.push({
    path: "*",
    redirect: "/login"
  });
  return result;
}

function generateRoutes(children, item) {
  // debugger;
  let isExist = false;
  if (!item.attribute.resourceUrl) {
    isExist = true;
  } else {
    // console.log(Router);
    Router.options.routes.forEach(route => {
      // debugger
      // console.log(route);
      if (route.path === item.attribute.resourceUrl) {
        isExist = true;
      }
    });
  }
  if (!isExist) {
    // 如果在当前路由中没有这个路由
    children.push({
      path: item.attribute.resourceUrl || "",
      name: item.attribute.routeName || "",
      component: resolve =>
        require([`@/views/${item.attribute.component}`], resolve) // 史诗巨坑
    });
  }
  if (item.children && item.children.length !== 0) {
    item.children.forEach(e => {
      generateRoutes(children, e);
    });
  }
  // console.log(children);
}