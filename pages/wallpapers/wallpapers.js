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

  doMark: function (e) {
    var that = this
    var markList
    var markItem = {
      thumbUrl: e.currentTarget.dataset.thumbUrl,
      url: e.currentTarget.dataset.url
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
  },

  deleteInArray: function (arr, item) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].url === item.url) {
        arr.splice(i, 1)
        return
      }
    }
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