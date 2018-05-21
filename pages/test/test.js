// pages/add/add.js
var app = getApp()
var tid;
Page({
  data: {
    check_date: '选择日期',
    start_time: '开始时间',
    end_time: '结束时间',
    index: 0,
    loading: false,
    disabled: false,
    end_start: '00:00',
    start_end: '23:59',
    longitude: 113.324520,
    latitude: 23.099994,
    location: '搜索地点',
    markers: [],
    controls: [],
    input_cls: '',
    text_area_cls:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tid = options.id;
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        console.log('getSystemInfo');
        console.log(res.windowWidth);
        that.setData({
          map_width: res.windowWidth
          , map_height: res.windowWidth
          , controls: [{
            id: 1,
            iconPath: '/images/map_ding.png',
            position: {
              left: res.windowWidth / 2 - 8,
              top: 200 / 2 - 8,
              width: 30,
              height: 30
            },
            clickable: true
          }]
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

  },
  datePickerChange: function (e) {
    let that = this
    console.log(e)
    var check_date = e.detail.value
    that.setData({
      check_date: check_date
    })
  },
  startTimePickerChange: function (e) {
    let that = this
    var start_time = e.detail.value

    that.setData({
      start_time: start_time,
      end_start: start_time
    })

  },
  endTimePickerChange: function (e) {
    let that = this
    var end_time = e.detail.value

    that.setData({
      end_time: end_time,
      start_end: end_time
    })
  },
  formSubmit: function (e) {

    let that = this;
    var value = e.detail.value
    console.log(value)
    var name = value['name0']
    var place = value['place0']
    var introduce = value['introduce0']
    var check_date = value['check_date0']
    var start_time = value['start_time0']
    var end_time = value['end_time0']
    if (!name || !place || !check_date || !start_time || !end_time || !introduce) {
      wx.showToast({
        title: '关键值为空！',
        image: '/images/cha.png',
        // icon:'none',
        duration: 2000
      })
    } else if (end_time <= start_time) {
      wx.showToast({
        title: '时间出错！',
        image: '/images/cha.png',
        // icon:'none',
        duration: 2000
      })
    }
    else {
      var time = start_time + ""
      var i = parseInt(start_time) + 1
      for (i; i < end_time; i++) {
        time += "," + i
      }
      console.log(time)

      that.setData({
        loading: true,
        disabled: true
      })
      var url = app.globalData.url + '/ciscn/tour/add-schedule'
      var user_id = app.globalData.user_id


    }

  },
  searchLocation: function () {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        var tmp = {
          iconPath: "/images/map_flag.png",
          id: 0,
          latitude: res.longitude,
          longitude: res.latitude,
          width: 50,
          height: 50
        }
        var markers = that.data.markers
        markers.push(tmp)
        console.log(markers)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude,
          location: res.name,
          markers: markers
        })
      },
      fail: function (emsg) {
        console.log(emsg)
      }
    })
  },
  input_focus:function (e) {
    console.log(e)
    this.setData({
      input_cls: 'focus'
    })
  },
  input_blur: function (e) {
    console.log(e)
    this.setData({
      input_cls: ''
    })
  },
  text_area_focus: function (e) {
    this.setData({
      text_area_cls: 'focus'
    })
  },
  text_area_blur: function (e) {
    this.setData({
      text_area_cls: ''
    })
  }

})