// pages/login/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  submitForm(e) {
    let mobile = e.detail.value.mobile;
    let password = e.detail.value.password;
    if (mobile === '') {
      app.Toast('请输入手机号码');
      return false;
    }
    if (password === '') {
      app.Toast('请输入密码');
      return false;
    }
    app.Formdata.post('/openapi/members/express/login', {
      mobile,
      password
    }, function(res) {
      if (res.success && res.success === 'true') {
        app.UserLogin.set(res.data);
        wx.redirectTo({
            url: '/pages/platform/warehous/index',
        })
      }
    });
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