// pages/msgeModel/foundModel.js
var _this = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cursorindex:2,
    valIndex:'',
    modelData:[
      {
        text:'快递单号',
        type:1
      },
      {
        text: '取件编号',
        type: 2
      }
    ]
  },

  getFocus(event, index){
    if (event){
      const { value } = event.detail
      console.log(value, index)
    }
   
  },
  clickTap(e){
   
   const {index,type} = e.currentTarget.dataset;
    this.data.modelData.map((item,ind)=>{
      if(index == ind) {
        let indexof = 'modelData[' + ind + '].isAction';
        this.setData({
          valIndex:index
        })
         console.log(item.isAction);
        if (item.isAction == "" ||'undefined'){
          this.setData({
            [indexof]: !item.isAction
          })
        }else{
          this.setData({
            [indexof]: true
          })
        }
          this.getFocus();
        }
    }
    )
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