
var app = getApp()
var v_id
const recorderManager = wx.getRecorderManager()
const options = {
  duration: 10000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac',
  frameSize: 50
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictures: [],
    idea: '',
    is_mp3: 'N', // 是否存在语音
    is_video: 'N', // 是否存在视频
    is_image: 'N', // 是否存在图片
    is_idea: 'N', // 是否存在描述
    can_join: 'N',
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '语音',
    author: '未知用户',
    mp3_src: '',
    video_src: '',
    longitude: 113.324520,
    latitude: 23.099994,
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    v_id = options.v_id
    var user_id = app.globalData.user_id
    var url = app.globalData.url

    wx.request({
      url: url + '/ciscn/vote/vote-details',
      data: {
        v_id: v_id,
        user_id: user_id
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data)
        var vote = res.data.vote
        var image = res.data.images
        if (res.data.success == 1) {

          var markers = [{
            iconPath: "/images/map_star.png",
            id: 0,
            latitude: vote.latitude,
            longitude: vote.longitude,
            width: 40,
            height: 40
          }]

          that.setData({
            is_mp3: vote.have_mp3,
            is_video: vote.have_video,
            is_image: vote.have_image,
            is_idea: vote.have_idea,
            can_join: vote.can_join,
            idea: vote.idea,
            mp3_src: vote.mp3_path,
            video_src: vote.video_path,
            longitude: vote.longitude,
            latitude: vote.latitude,
            pictures: image,
            markers: markers
          })
        } else {
          wx.showToast({
            title: '加载失败',
            image: '/images/cha.png',
            duration: 2000
          })
        }

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

  },
  imageLoad: function (e) {
    console.log(e)
  },
  previewImage: function (e) {
    var that = this,
      //获取当前图片的下表
      index = e.currentTarget.dataset.index,
      //数据源
      pictures = that.data.pictures;
    wx.previewImage({
      //当前显示下表
      current: pictures[index],
      //数据源
      urls: pictures
    })
  },
  joinVote: function () {
    console.log("join")
    var idea = this.data.idea
    wx: wx.navigateTo({
      url: '/pages/join/join?v_id=' + v_id + '&idea=' + idea,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  showCommentList: function () {
    console.log("showCommentList")
    wx: wx.navigateTo({
      url: '/pages/commentlist/commentlist?v_id=' + v_id,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})