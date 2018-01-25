var photoListUrl = "https://yokonghe.cn/simple-webapp/getPic"
Page({
  data: {
    duration: 500,
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    loading: false,
    plain: false
  },

  onLoad: function () {
    var that = this
    wx.request({
      url: photoListUrl,
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          photoList: res.data.data.photos,
        })
      }
    })
  },

  jumpToInfo: function (e) {
    console.log(e)
    wx.previewImage({
      urls: [e.currentTarget.dataset.id],
    })
  },

  loadMore: function (sort) {

  }
});