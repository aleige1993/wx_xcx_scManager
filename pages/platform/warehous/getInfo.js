// pages/platform/warehous/getInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      company:[],
    userInfo:[],
      contaArr:[],
      contaIndex:'',
      cubeArr:[],
      cubeIndex:'',
      cubeName:'',
      cubeNum:'',
      loading:false
  },
 setLoad(){
     let _this = this;
     _this.setData({
         loading: true
     })
 },
formSubmit(e){
    let  _this = this;
    _this.setData({
        loading: true
    })
    if (!_this.WxValidate.checkForm(e)) {
        const error = _this.WxValidate.errorList[0];
        wx.showToast({
            title: error.msg,
            icon: 'none',
            duration: 2000,
            success(){
                _this.setData({
                    loading: false
                })
            }
        })
        return false
    }
    let company = _this.data.company;
    let userInfo = _this.data.userInfo;
    let message = {
        'mobile': company.mobile,
        'orderNo': company.orderNo,
        'stationNo': userInfo.merchantNo,
        'expressNo': company.expressNo,
        'companyNo': company.companyNo,
        'company': company.company,
        'cubeName': _this.data.cubeName,
        'cubeNum': _this.data.cubeNum
    }
    app.Formdata.post('/openapi/express/wechatapplet/express/order/input', message,function(res){
        if(res.code == '0000'){
            wx.redirectTo({
                url: '/pages/platform/warehous/wareResult?data=' + JSON.stringify(res)
            })
        }
    })
    _this.setData({
        loading: false
    })
 },
    queryCabinet(){
     app.Formdata.get('/openapi/express/wechatapplet/express/counter/queryCabinet', {}, (res) => {
         if(res.code == '0000') {
             this.setData({
                 contaArr:res.data
             })
         }
     })
 },
    contaChange(e){
        let index = e.detail.value;
        this.setData({
            contaIndex: index,
            cubeName: this.data.contaArr[index].cubeName
        })
        app.Formdata.get('/openapi/express/wechatapplet/express/counter/queryCell', { 'cubeName': this.data.contaArr[index].cubeName},(res)=>{
            console.log(res);
            if(res.code == '0000'){
                this.setData({
                    cubeArr: res.data
                })
            }
        })
    },
    cubeChange(e){
        let index = e.detail.value;
        this.setData({
            cubeIndex: index,
            cubeNum: this.data.cubeArr[index].cubeNum
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.initValidate();
      let  _this = this;
      wx.getStorage({
          key: 'userInfo',
          success(res) {
              _this.setData({
                  userInfo:res.data
              })
          }
      })
      _this.setData({
        company: JSON.parse(options.data)
    })
      this.queryCabinet();
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

  },
    initValidate() {
        let { expressNo, mobile  } = this.data.company
        const rules = {
            expressNo: {
                required: true
            },
            mobile: {
                required: true,
                tel: true
            },
            cubeName: {
                required: true
            },
            cubeNum: {
                required: true
            }
        }

        const messages = {
            expressNo: {
                required: "快递单号不能为空"
            },
            mobile: {
                required: "请输入手机号",
                tel: "请输入正确的手机号"
            },
            cubeName: {
                required: "请选择货柜"
            },
            cubeNum: {
                required: "请选择货柜层数"
            }
        }
        // 创建实例对象 
        this.WxValidate = new app.WxValidate(rules, messages)
    }
})