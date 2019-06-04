const updateManager = () => {
    if (wx.canIUse('getUpdateManager')) {
        const updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            if (res.hasUpdate) {
                updateManager.onUpdateReady(function () {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success: function (res) {
                            if (res.confirm) {
                                updateManager.applyUpdate()
                            } else if (res.cancel) {
                                wx.showModal({
                                    title: '已经有新版本',
                                    content: '不更新将会影响使用，删除当前小程序，重新搜索打开哟~',
                                    showCancel: false
                                })
                            }
                        }
                    })
                })
                updateManager.onUpdateFailed(function () {
                    wx.showModal({
                        title: '已经有新版本了哟~',
                        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
                        showCancel: false
                    })
                })
            }
        })
    } else {
        wx.showModal({
            title: '提示',
            content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
            showCancel: false
        })
    }
}
const GetDateStr = (index) => {
    var dd = new Date();
    dd.setDate(dd.getDate() + index);
    var y = dd.getFullYear();
  
    var m = dd.getMonth() + 1;
    var d = dd.getDate();
    
    if(m<10){
        m = '0'+m
    }
    if (d < 10) {
        d = '0' + d
    }
    return y + "-" + m + "-" + d;
}
module.exports = {
    updateManager: updateManager,
    GetDateStr: GetDateStr
}