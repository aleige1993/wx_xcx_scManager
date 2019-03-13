// pages/platform/warehous/takePhoto.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        width: 0,
        height: 0,
        gap: 20,
        masg:'注意：请对准手机号码进行拍照识别'
    },
    takePhoto() {
        let _this = this;
        let ctx = wx.createCameraContext()
        ctx.takePhoto({
            quality: 'high',
            success: (res) => {
                _this.setData({
                    imgsrc: res.tempImagePath
                })
                wx.redirectTo({
                    url: '/pages/platform/warehous/takeUpload?path=' + res.tempImagePath
                })
            }
        })
    },
    error(e) {
        this.setData({
            masg:'您未授权调用照相机，您可以在小程序设置界面（「右上角」 - 「关于」 - 「右上角」 - 「设置」）中控制对该小程序的授权状态'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    width: res.windowWidth,
                    height: res.windowHeight
                })
            }
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