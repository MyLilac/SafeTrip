// pages/comment/comment.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comment: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    var comment_id = options.c_id
    var user_id = app.globalData.user_id
    var url = app.globalData.url
    wx.request({
      url: url + '/ciscn/vote/comment-details',
      data: {
        c_id: comment_id
      },
      method: 'GET',
      // header: {}, 
      success: function (res) {
        console.log(res)
        that.setData({
          comment: res.data
        })
      }
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

  }
})