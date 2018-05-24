// pages/tourdetails/tourdetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: 'https://oa-dev.hitadri.com/ciscn/image/2bg4.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.src)
    let that = this
    that.setData({
      src: options.src
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
  joinTour:function() {
    wx.showModal({
      title: '通知',
      content: '已经提交申请，请等待旅游团审核。',
      showCancel: false,
      confirmText: "OK"
    })
  }
})