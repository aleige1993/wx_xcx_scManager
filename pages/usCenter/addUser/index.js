// pages/usCenter/addUser/index.js
let app = getApp();

import Dialog from '../../../ui-plugins/vant/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.Formdata.get('/openapi/express/wechatapplet/express/manager/query', {}, function(res) {
      if (res.success && res.success === 'true') {
        _this.setData({
          userList: res.data
        })
      }
    })

  },

  removeUser(e) {
    console.log(e);
    let _this = this;
    Dialog.confirm({
      title: '提示',
      message: '您确定要删除吗?'
    }).then(() => {
      // on confirm
      app.Formdata.post('/openapi/express/wechatapplet/express/manager/del', {
        mobile: e.target.dataset.mobile
      }, function(res) {
        if (res.success && res.success === 'true') {
          let userList = _this.data.userList;
          userList.splice(e.target.dataset.index, 1)
          _this.setData({
            userList: userList
          })
          app.Tools.showToast('删除成功');
        }
      })
    }).catch(() => {
      // on cancel
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