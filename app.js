//app.js
import WxValidate from '/utils/WxValidate.js';
App({
  onLaunch: function () {
      var Promis = require('/utils/wxPromisify.js');
      Promis.wxPromisify(wx.request)({
          method: 'GET',
          url: 'https://openapi.songchewang.com/openapi/common/versions/version/host',
          data: {
              'message': JSON.stringify({ "versionNo": 202 })
          },
          header: {
              'appId': '100006',
              'sign': 'sign'
          },
      }).then((res) => {
          let data = res.data;
          if (data.code == '0000') {
              console.log('OPEN_API', data.data[0])
              this.OPEN_API = data.data[0];
               this.Config = require('/config/index.js');
                 this.Formdata = require('/utils/Formdata.js');
              this.globalData.employId = 1;
              if (this.employIdCallback) {
                  this.employIdCallback(1);
              }
          } else {
              wx.showToast({
                  title: data.message,
                  icon: 'none'
              })
          }
      })
    //   this.Config = require('/config/index.js');
    //   this.Formdata = require('/utils/Formdata.js');
    this.Utils = require('/utils/utils.js');
    this.UserLogin = require('/utils/UserLogin.js');
    this.Tools = require('/utils/Tools.js');
    this.Date = require('/utils/Date.js');
      this.WxValidate = WxValidate;
    this.Utils.updateManager();
    // 判断是否登录
    // if (!this.UserLogin.get('userInfo')) {
    //   wx.redirectTo({
    //     url: '/pages/login/index',
    //   })
    // }
    
  },
  globalData: {
      employId: null,
    wareShow:null,
    userInfo: {},
    codePhone:'',
    loginCode:{
        account:'',
        password:''
    }
  }
})