// pages/laundryOrder/index.js
let app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isChecked: false,
        createStartTime:null,
        createEndTime:null,
        createNum:null,
        parmes:{
            busiType:'1',
            page:1,
            limit:10
        },
        timeList:[]
    },
    createStartChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            createStartTime: e.detail.value
        })
    },
    createEndChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            createEndTime: e.detail.value
        })
    },
    newStartTimeChange(e) {
        let value = e.detail.value;
        let index = e.currentTarget.dataset.index;
        let key = 'timeList[' + index + '].beginTime' 
        this.setData({
            [key]: value
        })
    },
    newEndTimeChange(e) {
        let value = e.detail.value;
        let index = e.currentTarget.dataset.index;
        var key = 'timeList[' + index + '].endTime' 
        this.setData({
            [key]: value
        })
    },
    inputChange(e){
        this.setData({
            createNum:e.detail.value
        })
    },
    newMaxNum(e){
        console.log(e)
        let value = e.detail.value
        let index = e.currentTarget.dataset.index;
        let key = 'timeList[' + index + '].maxNum' 
        this.setData({
            [key]: value
        })
    },
    buttAllUp(e){
        let  _this = this;
        let  _data = this.data;
        if (!_data.createStartTime){
            app.Tools.showToast('请选择开始时间')
            return false
        }
        if (!_data.createEndTime) {
            app.Tools.showToast('请选择结束时间')
            return false
        }
        if (!_data.createNum) {
            app.Tools.showToast('请输入配件数')
            return false
        }


        let parmes = {
            busiType: '1',
            beginTime:'0000-00-00 '+ _data.createStartTime+':00',
            endTime: '0000-00-00 ' +  _data.createEndTime+':00',
            maxNum: _data.createNum
        }
        app.Formdata.post('/openapi/express/wechatapplet/express/delivery/save', parmes, (res) => {
            if(res.code == '0000') {
                wx.showToast({
                    title: '添加成功',
                    success(){
                        _this.setData({
                            'parmes.page':1,
                            'createStartTime': null,
                            'createEndTime': null,
                            'createNum': null,
                            'timeList':[]
                        },()=>{
                            _this.getDeliveryList()
                        })
                    }
                })
            }
        })


    },
    //删除
    delTime(e){
        let _this = this;
        let index = e.currentTarget.dataset.index;
        let item = e.currentTarget.dataset.items;
        wx.showModal({
            title: '温馨提示',
            content: '删除不可恢复，确认删除吗？',
            success(rult) {
                if (rult.confirm) {
                    app.Formdata.post('/openapi/express/wechatapplet/express/delivery/del', { id: item.id }, (res) => {
                        if (res.code == '0000') {
                            _this.data.timeList.splice(index, 1)
                            _this.setData({
                                timeList: _this.data.timeList
                            })
                        }
                    })
                } else if (rult.cancel) {
                    console.log('用户点击取消')
                }
            }
        })


        
    },
    //编辑修改
    editTime(e){
        console.log(e);
        let item = e.currentTarget.dataset.items;
        let parmes = {
            id: item.id,
            beginTime:'0000-00-00 '+item.beginTime+':00',
            endTime: '0000-00-00 ' + item.endTime + ':00',
            maxNum: item.maxNum
        }
        app.Formdata.post('/openapi/express/wechatapplet/express/delivery/edit',parmes,(res)=>{
            console.log(res)
            if(res.code == '0000') { 
                app.Tools.showToast('修改成功');
            }
        })
    },
    switchChange(e) {
        console.log(e);
        this.setData({ isChecked: e.detail.value });
        app.Formdata.post('/openapi/express/wechatapplet/express/station/edit', { isExpressAppointment: this.data.isChecked ? '1' : '0' }, (res) => {
            if (res.code == "0000") {
                wx.showToast({
                    title: '设置成功！',
                    icon: 'none'
                })
            }
        })
    },
    //查询小站是否可以预约
    stationDetail() {
        app.Formdata.get('/openapi/express/wechatapplet/express/station/detail', {}, (res) => {
            console.log(res)
            if (res.code == '0000') {
                this.setData({
                    isChecked: res.data.isExpressAppointment == '1' ? true : false
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    //获取配送接点
    getDeliveryList(){
        let _this = this;
        app.Formdata.get('/openapi/express/wechatapplet/express/delivery/page',  _this.data.parmes, (res)=>{
            if(res.code == '0000'){
                if (res.data && res.data.length>0){
                    res.data.map((item, index) => {
                        item.beginTime = item.beginTime.substr(11, 5);
                        item.endTime = item.endTime.substr(11, 5);
                    });
                    this.setData({
                        timeList: _this.data.timeList.concat(res.data)
                    })
                }else{
                    if (_this.data.parmes.page > 1){
                        app.Tools.showToast('没有更多数据')
                    }
                }
                wx.stopPullDownRefresh()
            }
        })
    },
    onLoad: function (options) {
        this.stationDetail();
        this.getDeliveryList();
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
            "parmes.page": 1,
            'timeList': []
        })
        this.getDeliveryList();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        this.setData({
            "parmes.page": ++this.data.parmes.page
        })
        this.getDeliveryList();
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})