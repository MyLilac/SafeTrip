var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChart = null;
Page({
  data: {
    select_color_1: '#93ea75',
    select_color_2: '#f8f8ff',
    select_color_3: '#f8f8ff',
    in_color_1: '#fff',
    in_color_2: '#FF6347',
    in_color_3: '#B0E0E6',
    agree_count: 0,
    disagree_count: 0,
    unknow_count: 0,
    total_count: 0,
    unknow: [],
    disagree: [],
    agree: [],
    unknow_show: false,
    disagree_show: false,
    agree_show: true

  },
  touchHandler: function (e) {
    var index = pieChart.getCurrentDataIndex(e)
    let that = this
    console.log(index);

    var no = that.data.total_count - (that.data.agree_count + that.data.disagree_count + that.data.unknow_count)
    switch (index) {
      case 0:
        that.selectFirst()
        break;
      case 1:
        that.selectSecond()
        break;
      case 2:
        that.selectThird()
        break;
      case 3:
        wx.showModal({
          title: '提示',
          content: '有' + no + '人尚未投票',
          showCancel: false,
          confirmText: "我知道了"
        })
        break;
      default:

    }

  },
  onLoad: function (options) {
    let that = this
    var vote_id = options.v_id
    console.log(vote_id)
    var user_id = app.globalData.user_id
    var url = app.globalData.url
    var agree_count, disagree_count, unknow_count, total_count

    wx.request({
      url: url + '/ciscn/vote/comments-list',
      data: {
        user_id: user_id,
        vote_id: vote_id
      },
      method: 'GET',
      // header: {}, 
      success: function (res) {
        console.log(res.data)
        if (res.data.success == 1) {
          agree_count = res.data.agree_count
          disagree_count = res.data.disagree_count
          unknow_count = res.data.unknow_count
          total_count = res.data.total_count
          that.setData({
            agree_count: res.data.agree_count,
            disagree_count: res.data.disagree_count,
            unknow_count: res.data.unknow_count,
            total_count: res.data.total_count,
            unknow: res.data.unknow,
            disagree: res.data.disagree,
            agree: res.data.agree
          })



          var windowWidth = 320;
          try {
            var res = wx.getSystemInfoSync();
            windowWidth = res.windowWidth;
          } catch (e) {
            console.error('getSystemInfoSync failed!');
          }

          pieChart = new wxCharts({
            animation: true,
            canvasId: 'pieCanvas',
            type: 'pie',
            series: [{
              name: '赞成',
              color: '#93ea75',
              data: agree_count,
            }, {
              name: '否定',
              color: '#FF6347',
              data: disagree_count,
            }, {
              name: '不清楚',
              color: '#B0E0E6',
              data: unknow_count,
            }, {
              name: '未投票',
              color: '#c0c0c0',
              data: total_count - (agree_count + disagree_count + unknow_count),
            }],
            width: windowWidth,
            color: '#fff',
            height: 250,
            dataLabel: true
          });
        } else {
          wx.showToast({
            title: '服务器繁忙',
            image: '/images/cha.png',
            duration: 2000
          })
        }

      }
    })

  },


  selectFirst: function () {
    let that = this
    that.setData({
      select_color_1: '#93ea75',
      select_color_2: '#f8f8ff',
      select_color_3: '#f8f8ff',
      in_color_1: '#fff',
      in_color_2: '#FF6347',
      in_color_3: '#B0E0E6',
      unknow_show: false,
      disagree_show: false,
      agree_show: true
    })

  },
  selectSecond: function () {
    let that = this
    that.setData({
      select_color_1: '#f8f8ff',
      select_color_2: '#FF6347',
      select_color_3: '#f8f8ff',
      in_color_1: '#93ea75',
      in_color_2: '#fff',
      in_color_3: '#B0E0E6',
      unknow_show: false,
      disagree_show: true,
      agree_show: false
    })
  },
  selectThird: function () {
    let that = this
    that.setData({
      select_color_1: '#f8f8ff',
      select_color_2: '#f8f8ff',
      select_color_3: '#B0E0E6',
      in_color_1: '#93ea75',
      in_color_2: '#FF6347',
      in_color_3: '#fff',
      unknow_show: true,
      disagree_show: false,
      agree_show: false
    })
  },
  toDetails: function (e) {
    console.log(e.target.dataset.vcid)
    wx.navigateTo({
      url: '/pages/comment/comment?c_id=' + e.target.dataset.vcid,
      success: function (res) {
        // success
      },
      fail: function (res) {
      }
    })
  }
});