// pages/driveCar/index.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sreachForm: {
      page: 1,
      limit: 10
    },
    carList: [],
    studyCarEnum: [
      {
        text: 'C1',
        value: '1'
      },
      {
        text: 'C2',
        value: '2'
      },
      {
        text: 'C3',
        value: '3'
      },
      {
        text: 'C4',
        value: '4'
      }, {
        text: 'A1',
        value: '5'
      },
      {
        text: 'A2',
        value: '6'
      },
      {
        text: 'A3',
        value: '7'
      },
      {
        text: 'B1',
        value: '8'
      },
      {
        text: 'B2',
        value: '9'
      }
    ]
  },

  confirmStudy(e) {
    let _this = this;
    let index = e.currentTarget.dataset.index;
    let mobile = e.currentTarget.dataset.mobile;
    app.Formdata.post('/openapi/express/wechatapplet/express/drive/confirm', {
      mobile: mobile
    }, function(res) {
      if (res.success && res.success === 'true') {
        app.Tools.showToast('通知成功');
        let carList = _this.data.carList;
        carList = carList.map((item, itemIndex) => {
          if (itemIndex === index) {
            item.status = '2';
          }
          return item;
        });
        _this.setData({
          carList: carList
        })
      }
    })
  },

  viewDetail(e) {
    wx.navigateTo({
      url: '/pages/driveCar/driveDetails?item=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },

  confirmStudy(e) {
    let _this = this;
    let index = e.currentTarget.dataset.index;
    let mobile = e.currentTarget.dataset.mobile;
    app.Formdata.post('/openapi/express/wechatapplet/express/drive/confirm', {
      mobile: mobile
    }, function(res) {
      if (res.success && res.success === 'true') {
        app.Tools.showToast('通知成功');
        let carList = _this.data.carList;
        carList = carList.map((item, itemIndex) => {
          if (itemIndex === index) {
            item.status = '2';
          }
          return item;
        });
        _this.setData({
          carList: carList
        })
      }
    })
  },

  viewDetail(e) {
    wx.navigateTo({
      url: '/pages/driveCar/driveDetails?item=' + JSON.stringify(e.currentTarget.dataset.item)
    })
  },

  loadCarList() {
    let _this = this;
    wx.showLoading({
      title: '加载中...',
    });
    app.Formdata.get('/openapi/express/wechatapplet/express/drive/query', this.data.sreachForm, function (res) {
      if (res.success && res.success === 'true') {
        if (!res.data || !res.data.length) {
          if (_this.data.sreachForm.page > 1) {
            app.Tools.showToast('没有更多的数据了')
          }
        } else {
          res.data = res.data.map(item => {
            item.typeText = app.Tools.getEnumValueToText(_this.data.studyCarEnum, item.type);
            return item;
          });
          _this.setData({
            carList: _this.data.carList.concat(res.data)
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
      this.loadCarList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      this.setData({
          carList:[]
      })
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
      "sreachForm.page": 1,
      'carList': []
    })
    this.loadCarList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      "sreachForm.page": ++this.data.sreachForm.page
    })
    this.loadCarList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})