
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_video: false, // 是否存在视频
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    app.globalData.videotempFilePaths = options.src
    let that = this
    that.setData({
      src: options.src,
      is_video: true
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
  videoLoading: function () {

  },
  videoError: function () {

  },
  delVideo: function () {
    console.log("delete")

    app.globalData.videotempFilePaths = ''
    let that = this
    that.setData({
      src: '',
      is_video: false
    })
  },
  uploadVideo: function (e) {
    let that = this
    var url = app.globalData.url
    var user_id = app.globalData.user_id
    var tour_id = app.globalData.tour_id
    var idea = e.detail.value.idea

    wx.showLoading({
      title: '请稍等',
    })

    wx.request({
      url: url + '/ciscn/vote/add-vote',
      data: {
        idea: idea,
        user_id: user_id,
        tour_id: tour_id,
        longitude: app.globalData.longitude,
        latitude: app.globalData.latitude
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {
        // success
        var id = res.data.id
        if (res.data.success == 1) {

          var src = that.data.src
          wx.uploadFile({
            url: url + '/ciscn/vote/upload-file',
            filePath: src,
            name: 'file',
            formData: {
              'id': id,
              'type': 'video'
            },
            success: function (res) {
              console.log(res)
              var obj = JSON.parse(res.data);
              console.log(obj)
              wx.hideLoading()
              if (obj.success == 1) {
                
                wx.showToast({
                  title: '发表成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.reLaunch({
                  url: '/pages/me/me'
                })
              } else {
                wx.showToast({
                  title: '视频上传失败',
                  image: '/images/cha.png',
                  duration: 2000
                })
              }

            }
          })
        } else {
          console.log(res)
          wx.showToast({
            title: '创建失败请重试',
            image: '/images/cha.png',
            duration: 2000
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })



  }
})