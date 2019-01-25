// pages/usCenter/index.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    showAddUser: false
  },

  loginout() {
    app.UserLogin.remove('userInfo');
    wx.navigateTo({
      url: '/pages/login/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    
    
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
    if (!app.UserLogin.get('userInfo')) {
      wx.navigateTo({
        url: '/pages/login/index',
      })
    } else {
      let _this = this;
      console.log(app.UserLogin.get('userInfo').userLevel === '1');
      _this.setData({
        showAddUser: app.UserLogin.get('userInfo').userLevel === '1'
      })
      app.Formdata.get('/openapi/express/wechatapplet/express/manager/queryUserCenter', {}, function (res) {
        if (res.success && res.success === 'true') {
          _this.setData({
            userinfo: res.data
          })
        }
      });
    }
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