//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    expressList:[],
    parmes:{
        page:1,
        limit:5,
        appointmentDate: app.Utils.GetDateStr(0),
        appointmentBeginTime: app.Utils.GetDateStr(0) + ' 00:00:00',
        appointmentEndTime: app.Utils.GetDateStr(0) + ' 23:59:00',    
    },
      createStartTime:null,
      createEndTime:null
  },
  //拨打电话
    clickMobile(e){
        let mobile = e.currentTarget.dataset.mobile
        wx.makePhoneCall({
            phoneNumber: mobile
        })
    },
    createStartChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            'parmes.appointmentBeginTime': this.data.parmes.appointmentDate+' '+ e.detail.value+':00',
            'createStartTime': e.detail.value
        })
    },
    createEndChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            'parmes.appointmentEndTime': this.data.parmes.appointmentDate + ' ' + e.detail.value + ':00',
            'createEndTime': e.detail.value
        })
    },
chengOrder(){
    this.setData({
        expressList: [],
        'parmes.page': 1
    })
    this.getDeliveryOrder();
},
getDeliveryOrder () { 
    let _this = this;
    app.Formdata.get('/openapi/express/wechatapplet/express/order/queryDeliveryOrder', _this.data.parmes, (res)=>{
        if(res.code == '0000') {
            if (res.data && res.data.length > 0) {
                _this.setData({
                    expressList: _this.data.expressList.concat(res.data)
                })
            } else {
                if (_this.data.parmes.page > 1) {
                    app.Tools.showToast('没有更多数据')
                }
            }
            wx.stopPullDownRefresh()
        }
    })
},
  //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
    goToback(e){
        wx.navigateTo({
            url: '/pages/platform/outhous/queryForm',
        })
    },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
    onReachBottom: function () {
        this.setData({
            "parmes.page": ++this.data.parmes.page
        })
        this.getDeliveryOrder();
    },
    onPullDownRefresh: function () {
        this.setData({
            "parmes.page": 1,
            "parmes.appointmentDate": app.Utils.GetDateStr(0),
            "parmes. appointmentBeginTime": app.Utils.GetDateStr(0) + ' 00:00:00',
            "parmes.appointmentEndTime": app.Utils.GetDateStr(0) + ' 23:59:00',
            "createStartTime": null,
            "createEndTime": null,
            'expressList': []
        })
        this.getDeliveryOrder();
    },
    onShow(){
        this.setData({
            "parmes.page": 1,
            "parmes.appointmentDate": app.Utils.GetDateStr(0) ,
            "parmes. appointmentBeginTime": app.Utils.GetDateStr(0) + ' 00:00:00',
            "parmes.appointmentEndTime": app.Utils.GetDateStr(0) + ' 23:59:00',
            "createStartTime": null,
            "createEndTime": null,
            'expressList': []
        })
        this.getDeliveryOrder();
    },
})

