//logs.js
Page({
  data: {
    markList: null
  },

  onLoad: function () {

  },

  onShow: function () {
    this.setData({
      markList: wx.getStorageSync('markList')
    })
    // console.log(this.data.markList)
  },

  jumpToInfo: function (e) {
    wx.navigateTo({
      url: '../detail/detail?thumbUrl=' + e.currentTarget.dataset.thumbUrl + '&url=' + e.currentTarget.dataset.url
    })
  },

  doUnMark: function (e) {
    wx.showToast({
      title: '已取消收藏',
      icon: 'success'
    })
    var thumbUrl = e.currentTarget.dataset.thumbUrl;
    this.deleteInArray(this.data.markList, thumbUrl)
    var list = this.data.markList
    this.setData({
      markList: list
    })
    wx.setStorage({
      key: 'markList',
      data: list,
    })
  },
  
  deleteInArray: function (arr, item) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].thumbUrl === item) {
        arr.splice(i, 1)
        return
      }
    }
  },
})
