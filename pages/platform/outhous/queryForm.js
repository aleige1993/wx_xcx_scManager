// pages/platform/outhous/queryForm.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
      page:1,
      limit:1000,
      mobile:'',
      listItem:[],
      indexItem:[]
  },
    onChange(e){
        this.setData({
            mobile: e.detail
        })
    },
    onSearch(event){
        if (this.data.mobile==""){
            app.Tools.showToast('搜索不能为空');
            return false;
        }
        let params = {
            'page': this.data.page,
            'limit': this.data.limit,
            'mobile': this.data.mobile
        }
        app.Formdata.get('/openapi/express/wechatapplet/express/order/query', params,(res)=>{
          console.log(res)
            if (res.code == "0000" && res.data.length > 0  ){
                this.setData({
                    'isShow': true,
                    'listItem': res.data
                })
            }else{
                this.setData({
                    'isShow':false
                })
            }
      })
    },
    //出库
    output(e){
       let detail = e.target.dataset
        console.log(detail)
        app.Formdata.post('/openapi/express/wechatapplet/express/order/output', { expressNo: detail.expressno }, (res) => {
            if(res.code=='0000'){
                wx.showToast({
                    title: '出库成功',
                    icon: 'success',
                    duration: 2000
                })
                this.onSearch();
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