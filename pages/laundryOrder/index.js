// pages/laundryOrder/index.js
let app = getApp();

import Dialog from '../../ui-plugins/vant/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      isChecked: false,
    orderStatus: ['2','-2', '5', '6', '8'],
    tabStatusActive: 0,
    searchForm: {
      limit: 4,
      page: 1,
      status: '2',
      orderNo: ""
    },
    orderList: [],
    shelfList:null,
    itemlist:{
        itmedata:'',
        index:''
    }
  },
 //订单选择的层架
    pickerChange(e){
        console.log(e.detail.value)
        console.log(e);
        let number = e.detail.value;
        let shelfArr = this.data.shelfList[number];
        let { itmedata, index } = this.data.itemlist;
        console.log(itmedata)
        let key = 'orderList['+index+'].numberindex';
        let key2 = 'orderList[' + index + '].shelfArr';
        let key3 = 'orderList[' + index + '].stationShelf';
        this.setData({
            [key]: number,
            [key2]: shelfArr,
            [key3]: shelfArr.name
        })
        app.Formdata.post('/openapi/express/wechatapplet/wash/order/shelf/choose', { orderNo: itmedata.orderNo, id: shelfArr.id },(res)=>{
            if(res.code == '0000'){
                app.Tools.showToast('设置成功')
            }
        })
    },
    getItme(e){
        console.log(e);
        let itmedata = e.target.dataset.items;
        let index = e.target.dataset.index;
        this.setData({
            'itemlist.itmedata': itmedata,
            'itemlist.index': index
        })
    },
  onChange(e) {
    // console.log(e);
    this.setData({
      'searchForm.orderNo': e.detail
    })
  },
    switchChange(e) {
        this.setData({ isChecked: e.detail.value });
        app.Formdata.post('/openapi/express/wechatapplet/express/station/edit', { isWash: this.data.isChecked ? '1' : '0' }, (res) => {
            if (res.code == "0000") {
                wx.showToast({
                    title: '设置成功！',
                    icon: 'none'
                })
            }
        })
    },
    stationDetail() {
        app.Formdata.get('/openapi/express/wechatapplet/express/station/detail', {}, (res) => {
            if (res.code == '0000') {
                this.setData({
                    isChecked: res.data.isWash == '1' ? true : false
                })
            }
        })
    },
  onSearch() {
    this.setData({
      "searchForm.page": 1,
      'orderList': []
    })
    this.loadOrderList();
  },

  tabStatus(e) {
    // console.log(e);
    this.setData({
      'searchForm.page': 1,
      'searchForm.status': this.data.orderStatus[e.detail.index],
      'searchForm.orderNo': '',
      'orderList': []
    })
    this.loadOrderList();
  },

  editOrderStatus(e) {
    // console.log(e);
    let status = e.currentTarget.dataset.status;
    let msg = e.currentTarget.dataset.msg;
    let orderno = e.currentTarget.dataset.orderno;
    let _this = this;
    if (status === '9') {
      Dialog.confirm({
        title: '提示',
        message: '你确定要拒绝该单吗？'
      }).then(() => {
        // on confirm
        _this.submitOrderStatus(status, msg, orderno);
      }).catch(() => {
        // on cancel
      });
    } else {
      this.submitOrderStatus(status, msg, orderno);
    }
  },

  submitOrderStatus(status, msg, orderNo) {
    let _this = this;
    wx.showLoading({
      title: '',
      mask: true
    });
    app.Formdata.post('/openapi/express/wechatapplet/express/wash/order/editStatus', {
      status,
      orderNo
    }, function(res) {
      if (res.success && res.success === 'true') {
        // console.log(msg);
        _this.setData({
          "searchForm.page": 1,
          'orderList': []
        })
        _this.loadOrderList();
        wx.hideLoading();
        app.Tools.showToast(msg, 'success');
      }
    });
  },

  loadOrderList() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    app.Formdata.get('/openapi/express/wechatapplet/express/wash/order/query', this.data.searchForm, function (res) {
      // console.log(res);
      if (res.success && res.success === 'true') {
        if (!res.data || !res.data.length) {
          if (_this.data.searchForm.page > 1) {
            app.Tools.showToast('没有更多的数据了')
          }
        } else {
            if (res.data) {
                res.data.map((item,index)=>{
                    res.data[index].allDiscount = (Number(res.data[index].discounts ? res.data[index].discounts : 0) + Number(res.data[index].inActDiscount ? res.data[index].inActDiscount:0)).toFixed(2);
                })             
            } 
          _this.setData({
            orderList: _this.data.orderList.concat(res.data)
          })
        }
        setTimeout(function () {
          wx.hideLoading();
        }, 500);
        setTimeout(function () {
          wx.stopPullDownRefresh();
        }, 1000);
      }
    })
  },
  //删除图片
    delImage(e){
        let _this = this;
        let items = e.currentTarget.dataset.items;
        let itemdata = e.currentTarget.dataset.itemdata;
        let index = e.currentTarget.dataset.index;
        let index2 = e.currentTarget.dataset.twoindex;
        app.Formdata.post('/openapi/express/wechatapplet/wash/order/image/del', { id: items.id }, (rult)=>{
            if (rult.code == '0000') {
               itemdata.washImageList.splice(index, 1)
                let key = "orderList[" + index2 + "].washImageList";
                _this.setData({
                    [key]: itemdata.washImageList
                })
            }
        })
    },
    //预览图片
    previewImage(e){
        let current = e.currentTarget.dataset.current;
        let items = e.currentTarget.dataset.items;
        let arr = [];
        items.map((data,index)=>{
            arr.push(data.imageUri)
        })
        wx.previewImage({
            current: current, 
            urls: arr
        })
    },
//上传图片
    chooseImage(e){
        let _this = this;
        let orderno = e.currentTarget.dataset.orderno;
        let items = e.currentTarget.dataset.items;
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: 'https://openapi.songchewang.com/openapi/common/file/upload',
                    filePath: tempFilePaths[0],
                    header: {
                        // 'content-type': 'application/x-www-form-urlencoded',
                        'appId': 100006,
                        'version': '',
                        'sign': 'SONGCHE'
                    },
                    name: 'files',
                    formData: {
                        'message': '{}'
                    },
                    success(opendata) {
                        const rutData = JSON.parse(opendata.data);
                        let imageUri = rutData.data[0];
                        let listArr =[];
                        app.Formdata.post('/openapi/express/wechatapplet/wash/order/image/add', { orderNo: orderno, imageUri: imageUri},(rult)=>{
                            if (rult.code == '0000'){
                          _this.data.orderList.map((item,inx)=>{
                                  if (item.id == items.id){
                                        let key = "orderList[" + inx + "].washImageList";
                                        _this.setData({
                                            key:item.washImageList.push(rult.data)
                                        })
                                    }
                                })
                                _this.setData({
                                    orderList: _this.data.orderList
                                })
                            }
                        })
                    }
                })
            }
        })
    },
    //搁架列表
    shelfList(){
        app.Formdata.get('/openapi/express/wechatapplet/wash/order/shelf/query', { limit: 10000, page: 1 },(res)=>{
            if(res.code == '0000'){
              this.setData({
                  shelfList:res.data  
                })
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      if (app.globalData.employId && app.globalData.employId != '') {
          this.loadOrderList();
          this.shelfList();
      } else {
          app.employIdCallback = employId => {
              if (employId != '') {
                  this.loadOrderList();
                  this.shelfList();
              }
          }
      }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.stationDetail();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      this.shelfList();
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
    this.setData({
      "searchForm.page": 1,
      'orderList': []
    })
    this.loadOrderList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      "searchForm.page": ++ this.data.searchForm.page
    })
    this.loadOrderList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})