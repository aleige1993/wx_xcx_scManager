// pages/msgeModel/index.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    templateList: [],
  },

  setDefault(e) {
    let tempNo = e.currentTarget.dataset.tempno;
    app.Formdata.post('/openapi/express/wechatapplet/messagetemp/sms/default', {
      tempNo: tempNo
    }, function(res) {
      if (res.success && res.success === 'true') {
        app.Tools.showToast('设置成功');
        setTimeout(function() {
          wx.navigateBack();
        }, 2000);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.Formdata.get('/openapi/express/wechatapplet/messagetemp/sms/query', { page: '1', limit: '999999999', busiType: '1'}, function(res) {
      // console.log(res);
      _this.setData({
        templateList: res.data
      }); 
    });
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