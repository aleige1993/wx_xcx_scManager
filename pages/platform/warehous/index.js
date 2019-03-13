// pages/library/warehous/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     code:'',
      userPhone:'',
      shopIndex:'',
      shopArr:'',
      allData:'',
      companyData:''
  },
    onClickIcon(e){
        wx.navigateTo({
            url: '/pages/platform/warehous/takePhoto'
        })
    },
  getCode(){
    let  _this = this;
    wx.scanCode({
      scanType: ['barCode', 'qrCode'],
      success(res) {
        _this.setData({
          code:res.result
        })
      }
    })
  },
    formSubmit(e){
        this.setData({
            code: e.detail.value.code,
            userPhone: e.detail.value.userPhone
        })
        // !(/^[0-9a-zA-Z]+$/.test(e.detail.value.code))
        if (e.detail.value.code == ''){
            app.Tools.showToast('非正常快递单号');
            return false;
        } else if (!(/^1\d{10}$/.test(e.detail.value.userPhone))){
            app.Tools.showToast('非正常手机号');
            return false;
        } else if (this.data.companyData.companyNo==""){
            app.Tools.showToast('请选择快递');
            return false;
        }
         let company ={
             'companyNo': this.data.companyData.companyNo,
             'company': this.data.companyData.companyName,
             'expressNo': this.data.code,
             'mobile': this.data.userPhone
         }
        app.Formdata.post('/openapi/express/wechatapplet/express/order/add', company,function(res){
            if(res.code== "0000"){
                wx.navigateTo({
                    url: '/pages/platform/warehous/getInfo?data=' + JSON.stringify(res.data)
                })
            }
        })
    },
    shoprChange(e){
        this.setData({
            shopIndex: e.detail.value,
            companyData: this.data.allData[e.detail.value]
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      app.globalData.codePhone = ""
      let  _this = this;
      app.Formdata.get('/openapi/express/wechatapplet/express/company/query', {},function(res){
          if (res.code=="0000"){
              let datas=[];
              res.data.map((item,index)=>{
                  datas.push(item.companyName)
              });
              _this.setData({
                  shopArr: datas,
                  allData: res.data
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
      if (app.globalData.codePhone) {
          this.setData({
              userPhone: app.globalData.codePhone
          })
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