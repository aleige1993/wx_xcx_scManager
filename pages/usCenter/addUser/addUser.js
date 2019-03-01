// pages/usCenter/addUser/addUser.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      mobile: '',
      userName: '',
      pwd: ''
    }
  },

  selectUserIcon() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        // console.log(res);
        app.Formdata.uploadFile(res, (path) => {
          console.log(path);
          _this.setData({
            'userInfo.image': path[0]
          })
        })
      },
    })
  },

  submitForm(e) {
    let userName = e.detail.value.userName;
    let mobile = e.detail.value.mobile;
    let pwd = e.detail.value.pwd;
    if (userName === '') {
      app.Tools.showToast('姓名不能为空');
      return false;
    }
    if (mobile === '') {
      app.Tools.showToast('手机号不能为空');
      return false;
    }
    if (pwd === '') {
      app.Tools.showToast('密码不能为空');
      return false;
    }

    this.setData({
      'userInfo.userName': userName,
      'userInfo.mobile': mobile,
      'userInfo.pwd': pwd
    })
    let _this = this;
    app.Formdata.post('/openapi/express/wechatapplet/express/manager/save', {
      ..._this.data.userInfo
    }, function(res) {
      if (res.success && res.success === 'true') {
        app.Tools.showToast('添加成功');
        setTimeout(function() {
            wx.navigateBack({
                delta: 2
          })
        }, 2000)
      }
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