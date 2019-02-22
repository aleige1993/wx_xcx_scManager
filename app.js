//app.js
import WxValidate from '/utils/WxValidate.js';
App({
  onLaunch: function () {
    this.Config = require('/config/index.js');
    this.Formdata = require('/utils/Formdata.js');
    this.UserLogin = require('/utils/UserLogin.js');
    this.Tools = require('/utils/Tools.js');
    this.Date = require('/utils/Date.js');
    this.WxValidate = WxValidate;
    // 判断是否登录
    // if (!this.UserLogin.get('userInfo')) {
    //   wx.redirectTo({
    //     url: '/pages/login/index',
    //   })
    // }
    
  },
  globalData: {
    userInfo: {}
  }
})