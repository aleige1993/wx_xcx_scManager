
let app = getApp();
if (!app) {
  setTimeout(function () {
    app = getApp();
  })
}

let userInfo = "userInfo";
const set = (data) => {
  wx.setStorage({
    key: userInfo,
    data: data,
  })
  // app.globalData.userInfo = data;
}

const get = () => {
  return wx.getStorageSync(userInfo);
  // return app.globalData.userInfo;
}

const remove = () => {
  
}

module.exports = {
  set: set,
  get: get,
  remove: remove
} 