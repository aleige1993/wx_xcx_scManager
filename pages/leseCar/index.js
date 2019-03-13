// pages/laundryOrder/index.js
let app = getApp();

import Dialog from '../../ui-plugins/vant/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      isChecked:false,
    orderStatus: ['2','3', '4', '6'],
    tabStatusActive: 0,
    searchForm: {
      limit:15,
      page: 1,
    mobile:'',
    statusList: ['2']
    },
    orderList: []
  },
    switchChange(e) {
        console.log(e);
        this.setData({ isChecked: e.detail.value });
        app.Formdata.post('/openapi/express/wechatapplet/express/station/edit', { isRent: this.data.isChecked?'1':'0' },(res)=>{
            if(res.code=="0000") {
                wx.showToast({
                    title: '设置成功！',
                    icon:'none'
                })
            }
        })
    },
  onChange(e) {
    this.setData({
      'searchForm.mobile': e.detail
    })
  },

  onSearch() {
    this.setData({
      "searchForm.page": 1,
      'orderList': []
    })
    this.loadOrderList();
  },

    tabStatusTwo(e) {
    // console.log(e);
    this.setData({
      'searchForm.page': 1,
        'searchForm.statusList': [this.data.orderStatus[e.detail.index]],
      'searchForm.orderNo': '',
        'searchForm.mobile': '',
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
    if (status === '6') {
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
      app.Formdata.post('/openapi/express/wechatapplet/express/car/order/editStatus', {
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
      app.Formdata.get('/openapi/express/wechatapplet/express/car/order/query', this.data.searchForm, function (res) {
      // console.log(res);
      if (res.success && res.success === 'true') {
        if (!res.data || !res.data.length) {
          if (_this.data.searchForm.page > 1) {
            app.Tools.showToast('没有更多的数据了')
          }
        } else {
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
//查询小站是否可以租车
    stationDetail(){
        app.Formdata.get('/openapi/express/wechatapplet/express/station/detail',{},(res)=>{
           console.log(res)
            if(res.code == '0000') {
                this.setData({
                    isChecked:res.data.isRent == '1' ? true : false
                })
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadOrderList();
    this.stationDetail();
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