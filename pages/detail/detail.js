// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thumbUrl: '',
    url: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.url + " " + options.thumbUrl)
    this.setData({
      thumbUrl: options.thumbUrl,
      url: options.url
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

  showWallpaper: function (e) {
    wx.previewImage({
      urls: [this.data.url],
    })
  },

  doMark: function (e) {
    var that = this
    var markList
    var markItem = {
      thumbUrl: this.data.thumbUrl,
      url: this.data.url
    }
    wx.showToast({
      title: '已添加到收藏',
      icon: 'success'
    })
    wx.getStorage({
      key: 'markList',
      success: function (res) {
        markList = res.data
        if (markList === null) {
          markList = new Array
        }
        if (that.isInArray(markList, markItem)) {
          return
        } else {
          markList = markList.concat(markItem)
        }
        wx.setStorage({
          key: 'markList',
          data: markList,
        })
      },
      fail: function () {
        markList = [markItem]
        wx.setStorage({
          key: 'markList',
          data: markList,
        })
      }
    })
  },

  isInArray: function (arr, item) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].url === item.url) {
        return true
      }
    }
    return false
  }
})