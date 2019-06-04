// pages/usCenter/index.js
let app = getApp();
import Dialog from '../../ui-plugins/vant/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo: {},
    showAddUser: false,
    qrcode:''
  },

  loginout() {
    Dialog.confirm({
      title: '提示',
      message: '确定要退出当前账号？'
    }).then(() => {
      // on confirm
    app.UserLogin.remove('userInfo');
    app.UserLogin.remove('loginCode');
      wx.redirectTo({
        url: '/pages/login/index'
      })
    }).catch(() => {
      // on cancel
    });
  },
  //预览图片
    previewImage(e){
        wx.previewImage({
            current: this.data.qrcode, // 当前显示图片的http链接
            urls: [this.data.qrcode] // 需要预览的图片http链接列表
        })
    },
//点击上传头像
    selectUserIcon() {
        let _this = this;
        wx.chooseImage({
            count: 1,
            success: function (res) {
                app.Formdata.uploadFile(res, (path) => {
                    console.log(path);
                    if (path[0]){
                        _this.setData({
                            'userinfo.avatarUri': path[0]
                        })
                        app.Formdata.post('/openapi/express/wechatapplet/express/manager/update', { avatarUri: path[0] },(res)=>{           
                        let title = '';
                        if(res.code == '0000'){
                            title = '上传成功';
                        }else{
                            title = '上传失败';
                        }
                            wx.showToast({
                                title: title,
                                icon:'none'
                            })
                        })

                    }
                    
                })
            },
        })
    },
    //获取二维码
    getStationQrcode(){
        app.Formdata.get('/openapi/express/wechatapplet/express/station/stationQrcode', {}, (res) => {
            console.log(res)
            if(res.code == '0000') {
                this.setData({
                    qrcode:res.data
                })
            }else{
                wx.showToast({
                    title: '获取二维码失败',
                    icon:'none'
                })
            }
        })
    },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
      _this.getStationQrcode();
    _this.setData({
      showAddUser: app.UserLogin.get('userInfo').userLevel == '1' ? true : false
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
      let  _this = this;
      app.Formdata.get('/openapi/express/wechatapplet/express/manager/queryUserCenter', {}, function (res) {
          if (res.success && res.success === 'true') {
              _this.setData({
                  userinfo: res.data
              })
          }
      });
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