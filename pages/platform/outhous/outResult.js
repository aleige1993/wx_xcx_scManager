
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
      optionData:''
  },
    goback(e){
        wx.navigateBack({
            delta: 1
        })
        // wx.redirectTo({
        //     url: '/pages/platform/outhous/index'
        // })
    },
    tourl(e){
        wx.redirectTo({
            url: '/pages/platform/outhous/queryForm'
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      let optionArr = JSON.parse(options.data)
      wx.showLoading({
          title: '加载中',
      })
      if (optionArr.code == '0000') {
          this.setData({
              'isShow': true,
              optionData: optionArr
          })
      } else if (optionArr.code == '0001') {
          this.setData({
              'isShow': false,
              optionData: optionArr
          })
      }
      wx.hideLoading()
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