var photoListUrl = "https://yokonghe.cn/simple-webapp/getPic"
Page({
  data: {
    photoList: null,
    sort: 0,
    isEnd: false
  },

  onLoad: function () {
    var that = this
    wx.request({
      url: photoListUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        sort: '0'
      },
      success: function (res) {
        that.setData({
          photoList: res.data.data.photos,
          sort: res.data.data.sort,
          isEnd: res.data.data.isEnd
        })
      }
    })
  },

  jumpToInfo: function (e) {
    wx.navigateTo({
      url: '../detail/detail?thumbUrl=' + e.currentTarget.dataset.thumbUrl + '&url=' + e.currentTarget.dataset.url
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.isEnd) {
      this.loadMore(this.data.sort)
    }
  },

  loadMore: function (sort) {
    var that = this
    wx.request({
      url: photoListUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        sort: that.data.sort
      },
      success: function (res) {
        that.setData({
          photoList: that.data.photoList.concat(res.data.data.photos),
          sort: res.data.data.sort,
          isEnd: res.data.data.isEnd
        })
      }
    })
  }
});