// pages/library/warehous/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      isSheet:false,
     code:'',
      userPhone:'',
      shopIndex:'',
      shopArr:'',
      allData:'',
      companyData:'',
      isRetr:false,
      mobList:'',
      actions:[]
  },
    onSelect(e) {
        console.log(e.detail);
        let _this = this;
        let exp = e.detail;
        let index = '';
        _this.data.allData.map((item,i)=>{
            if (item.companyNo == exp.companyNo){
                index = i
            }
        })
        console.log(index);
        _this.setData({
            isSheet:false,
            shopIndex:index,
            companyData: _this.data.allData[index]
        })
    },
    onCloseSheet() {
      this.setData({
          isSheet:false
      })
    },
    onClickIcon(e){
        wx.navigateTo({
            url: '/pages/platform/warehous/takePhoto'
        })
    },
    getQueryCompany(expressNo){
        let _this = this;
        app.Formdata.get('/openapi/express/wechatapplet/express/order/queryCompany', { expressNo: expressNo},(res)=>{
            if(res.code == '0000') {
                console.log(res);
                 let explist = res.data;
                 let  index = '';
                if (explist.length == 1){  
                    _this.data.allData.map((item,i)=>{ 
                        if (explist[0].companyNo == item.companyNo){
                            index = i; 
                        }
                    })  
                    _this.setData({
                        companyData: explist[0],
                        shopIndex:index
                    })
                } else if (explist.length > 1){
                    let newExplist = explist.map(item => {
                        return {
                            name: item.companyName,
                            companyNo: item.companyNo
                        }
                     })
                    _this.setData({
                        actions: newExplist,
                        isSheet:true
                    })
                 }
            }
        })
    },
    confirmCode(e){
        console.log(e)
        let _this = this;
        _this.setData({
            code: e.detail
        }, () => {
            _this.getQueryCompany(e.detail);
        })
    },
  getCode(){
      let  _this = this;
    wx.scanCode({
      scanType: ['barCode', 'qrCode'],
      success(res) {
        _this.setData({
          code:res.result
        },()=>{
            _this.getQueryCompany(res.result);
        })
      },
        complete(data){
            console.log('complete', data)
        }
    })
  },
  //获取检索结果
    getMobile(e){
        let mobile = e.target.dataset.mob;
        let _this = this;
        _this.setData({
            userPhone:mobile,
        },(res)=>{
            _this.clerisRetr();
        })

    },
  //关闭检索
    clerisRetr(){
        this.setData({
            isRetr: false
        })
    },
    onFindPhone(e){
        let text = e.detail;
        if (text.length >= 3){
            app.Formdata.get('/openapi/express/wechatapplet/express/order/queryForMobiles', { mobile: text },(res)=>{
                if(res.code == "0000"){
                    this.setData({
                        mobList:res.data,
                        isRetr: true
                    })
                }
            })
        }else{
            this.setData({
                isRetr:false
            })
        }
    },
    formSubmit(e){ 
        let  _this = this;
        _this.setData({
            code: e.detail.value.code,
            userPhone: e.detail.value.userPhone
        })
        // !(/^[0-9a-zA-Z]+$/.test(e.detail.value.code))
        if (!(e.detail.value.code.length>9)){
            app.Tools.showToast('非正常快递单号');
            return false;
        } else if (!(/^1\d{10}$/.test(e.detail.value.userPhone))){
            app.Tools.showToast('非正常手机号');
            return false;
        } else if (_this.data.companyData.companyNo==""){
            app.Tools.showToast('请选择快递');
            return false;
        }
         let company ={
             'companyNo': _this.data.companyData.companyNo,
             'company': _this.data.companyData.companyName,
             'expressNo': _this.data.code,
             'mobile': _this.data.userPhone
         }
         console.log(1)
        app.Formdata.post('/openapi/express/wechatapplet/express/order/add', company,function(res){
            console.log(2)
            if(res.code== "0000"){
                console.log(3)
                if (res.data.inTime){
                    wx.showModal({
                        title: '温馨提示',
                        content: '此快递单号已经入库，是否继续操作',
                        cancelText:'我知道了',
                        confirmText:'继续入库',
                        success(mode) {
                            if (mode.confirm) {
                                  wx.navigateTo({
                                    url: '/pages/platform/warehous/getInfo?data=' + JSON.stringify(res.data)
                                })
                            } else if (mode.cancel) {
                               _this.setData({
                                   code: '',
                                   userPhone: '',
                               })
                            }
                        }
                    })
                }else{
                    wx.navigateTo({
                        url: '/pages/platform/warehous/getInfo?data=' + JSON.stringify(res.data)
                    })
                }
            }
        })
    },
    shoprChange(e){
        this.setData({
            companyData: this.data.allData[e.detail.value],
            shopIndex: e.detail.value
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
              _this.setData({
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
      let _this = this;
      if (app.globalData.codePhone) {
          _this.setData({
              userPhone: app.globalData.codePhone
          })
      }
      console.log('wareShow',app.globalData.wareShow)
      setTimeout(()=>{
          if (app.globalData.wareShow) {
              _this.setData({
                  code: '',
                  userPhone: '',
              }, (res) => {
                  app.globalData.wareShow = false
              })
          }
      },500)
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