// pages/platform/warehous/takeUpload.js
// let FormdataConfig = require('../../../config/index.js');
// let HTTPOPENAPIURL = FormdataConfig.HTTPOPENAPIURL;
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        width: 0,
        height: 0,
        gap: 20,
        tempFilePath: "",
        imgsrc: '',
        phone: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    phoneChange(e) {
        this.setData({
            phone: e.detail
        })
    },
    //返回
    backToIndex() {
        console.log('globalData',app.globalData.codePhone)
        wx.navigateBack({
            delta: 1
        })
        app.globalData.codePhone = this.data.phone
    },
    onLoad: function(options) {
        console.log("HTTPOPENAPIURL", app.Config.HTTPOPENAPIURL)
        wx.showLoading({
            title: '数据处理中...',
            mask: true
        })
        var that = this
        that.path = options.path
        wx.getSystemInfo({
            success: function(res) {
                var width = res.windowWidth
                var height = res.windowHeight
                that.setData({
                    width: width,
                    height: height
                })
                wx.getImageInfo({
                    src: that.path,
                    success: function(res) {
                        that.canvas = wx.createCanvasContext("image-canvas", that)
                        that.canvas.drawImage(that.path, 0, 0, that.data.width, 400)
                        that.canvas.setStrokeStyle('red')
                        that.canvas.strokeRect(that.data.gap, that.data.gap, that.data.width - 2 * that.data.gap, 70)
                        that.canvas.draw()
                        setTimeout(function() {
                            wx.canvasToTempFilePath({ //裁剪对参数
                                canvasId: "image-canvas",
                                x: that.data.gap, //画布x轴起点
                                y: that.data.gap, //画布y轴起点
                                width: that.data.width - 2 * that.data.gap, //画布宽度
                                height: 50, //画布高度
                                destWidth: that.data.width - 2 * that.data.gap, //输出图片宽度
                                destHeight: 70, //输出图片高度
                                canvasId: 'image-canvas',
                                success: function(res) {
                                    that.filePath = res.tempFilePath
                                    if (that.filePath) {
                                        that.setData({
                                            imgsrc: res.tempFilePath
                                        }, () => {
                                            that.canvas.clearRect(0, 0, that.data.width, that.data.height)
                                            that.canvas.drawImage(that.filePath, that.data.gap, that.data.gap, that.data.width - that.data.gap * 2, 70)
                                            that.canvas.draw()
                                        })
                                        console.log("HTTPOPENAPIURL", app.Config.HTTPOPENAPIURL)
                                        wx.uploadFile({
                                            url: app.Config.HTTPOPENAPIURL + '/openapi/common/file/ocr',
                                            filePath: that.filePath,
                                            header: {
                                                'appId': '100006',
                                                'version': '',
                                                'sign': 'SONGCHE'
                                            },
                                            name: 'files',
                                            formData: {
                                                'message': '{}'
                                            },
                                            success: function(res) {
                                                let data = JSON.parse(res.data)
                                                console.log(data);
                                                if (data.code == "0000") {
                                                    wx.hideLoading()
                                                    that.setData({
                                                        phone: data.data
                                                    })
                                                } else {
                                                    wx.showToast({
                                                        title: data.message,
                                                        icon:"none"
                                                    })
                                                }

                                            },
                                            fail: function(err) {
                                                let data = JSON.parse(err.data);
                                                wx.showToast({
                                                    title: data.message,
                                                    icon: "none"
                                                })
                                            }
                                        })
                                    }
                                },
                                fail: function(e) {
                                    // wx.hideLoading()
                                    wx.showToast({
                                        title: '出错啦...',
                                        icon: 'loading'
                                    })
                                }
                            });
                        }, 2000);
                    },
                    fail: (err) => {
                        wx.showToast({
                            title: '未能获取到图片',
                            icon: 'none'
                        })
                    }
                })
            }
        })
        // wx.hideLoading()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})