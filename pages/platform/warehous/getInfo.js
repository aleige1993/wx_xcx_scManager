// pages/platform/warehous/getInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      company:[],
    userInfo:[]
  },
formSubmit(e){
    let company = this.data.company;
    let userInfo = this.data.userInfo;
    let message = {
        'mobile': company.mobile,
        'orderNo': company.orderNo,
        'stationNo': userInfo.merchantNo,
        'expressNo': company.expressNo,
        'companyNo': company.companyNo,
        'company': company.company
    }
    app.Formdata.post('/openapi/express/wechatapplet/express/order/input', message,function(res){
        wx.navigateTo({
            url: '/pages/platform/warehous/wareResult?data=' + JSON.stringify(res)
        })
    })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.data)
      let  _this = this;
      wx.getStorage({
          key: 'userInfo',
          success(res) {
              _this.setData({
                  userInfo:res.data
              })
          }
      })
      _this.setData({
        company: JSON.parse(options.data)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})