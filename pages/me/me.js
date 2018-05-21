//wx-drawer
const MENU_WIDTH_SCALE = 0.82;
const FAST_SPEED_SECOND = 300;
const FAST_SPEED_DISTANCE = 5;
const FAST_SPEED_EFF_Y = 50;
var app = getApp()
Page({
  data: {
    ui: {
      windowWidth: 0,
      menuWidth: 0,
      offsetLeft: 0,
      tStart: true
    },
    first: true,
    second: false,
    third: false,
    vote_list: [],
    mpage: 'mpage'
  },
  onLoad() {
    try {
      let res = wx.getSystemInfoSync()
      this.windowWidth = res.windowWidth;
      this.data.ui.menuWidth = this.windowWidth * MENU_WIDTH_SCALE;
      this.data.ui.offsetLeft = 0;
      this.data.ui.windowWidth = res.windowWidth;
      this.setData({ ui: this.data.ui })
    } catch (e) {
    }
    let that = this
    that.firstShow()
    //调用应用实例的方法获取全局数据
    //更新数据
    that.setData({
      userInfo: app.globalData.userInfo,
      user_id: app.globalData.user_id
    })
  },


  // 手势右滑等多个函数
  handlerStart(e) {
    let { clientX, clientY } = e.touches[0];
    this.tapStartX = clientX;
    this.tapStartY = clientY;
    this.tapStartTime = e.timeStamp;
    this.startX = clientX;
    this.data.ui.tStart = true;
    this.setData({ ui: this.data.ui })
  },
  handlerMove(e) {
    let { clientX } = e.touches[0];
    let { ui } = this.data;
    let offsetX = this.startX - clientX;
    this.startX = clientX;
    ui.offsetLeft -= offsetX;
    if (ui.offsetLeft <= 0) {
      console.log('取消模糊')
      this.setData({ mpage: 'mpage' })
      
      ui.offsetLeft = 0;
    } else if (ui.offsetLeft >= ui.menuWidth) {
      console.log('mohu')
      this.setData({ mpage: 'mpage-filter' })
      ui.offsetLeft = ui.menuWidth;
    }
    this.setData({ ui: ui })
  },
  handlerCancel(e) {
    // console.log(e);
  },
  handlerEnd(e) {
    this.data.ui.tStart = false;
    this.setData({ ui: this.data.ui })
    let { ui } = this.data;
    let { clientX, clientY } = e.changedTouches[0];
    let endTime = e.timeStamp;
    //快速滑动
    if (endTime - this.tapStartTime <= FAST_SPEED_SECOND) {
      //向左
      if (this.tapStartX - clientX > FAST_SPEED_DISTANCE) {
        console.log('取消模糊')
        this.setData({ mpage: 'mpage' })
        ui.offsetLeft = 0;
      } else if (this.tapStartX - clientX < -FAST_SPEED_DISTANCE && Math.abs(this.tapStartY - clientY) < FAST_SPEED_EFF_Y) {
        console.log('mohu')
        this.setData({ mpage: 'mpage-filter' })
        ui.offsetLeft = ui.menuWidth - 1;
      } else {
        if (ui.offsetLeft >= ui.menuWidth / 2) {
          console.log('mohu')
          this.setData({ mpage: 'mpage-filter' })
          ui.offsetLeft = ui.menuWidth - 1;
        } else {
          console.log('取消模糊')
          this.setData({ mpage: 'mpage' })
          ui.offsetLeft = 0;
        }
      }
    } else {
      if (ui.offsetLeft >= ui.menuWidth / 2) {
        console.log('mohu')
        this.setData({ mpage: 'mpage-filter' })
        ui.offsetLeft = ui.menuWidth - 1;
      } else {
        console.log('取消模糊')
        this.setData({ mpage: 'mpage' })
        ui.offsetLeft = 0;
      }
    }
    this.setData({ ui: ui })
  },
  handlerPageTap(e) {
    let { ui } = this.data;
    if (ui.offsetLeft != 0) {
      console.log('取消模糊')
      this.setData({ mpage: 'mpage' })
      ui.offsetLeft = 0;
      this.setData({ ui: ui })
    }
  },
  handlerAvatarTap(e) {

    let { ui } = this.data;
    if (ui.offsetLeft == 0) {
      ui.offsetLeft = ui.menuWidth - 1;

      this.setData({ ui: ui })
    }
  },


  // 其他函数
  firstShow: function () {
    console.log("1");
    let that = this
    that.setData({
      first: true,
      second: false,
      third: false
    })
    var user_id = app.globalData.user_id
    var url = app.globalData.url

    wx.request({
      url: url + '/ciscn/vote/vote-list',
      data: {
        user_id: user_id,
        type: 'W'
      },
      method: 'GET',
      // header: {}, 
      success: function (res) {
        console.log(res.data)
        if (res.data.success == 1) {
          that.setData({
            vote_list: res.data.list
          })
        } else {
          wx.showToast({
            title: '刷新失败请重试',
            image: '/images/cha.png',
            duration: 2000
          })
        }

      }
    })


  },
  secondShow: function () {
    console.log("2");
    let that = this
    that.setData({
      first: false,
      second: true,
      third: false
    })
    var user_id = app.globalData.user_id
    var url = app.globalData.url

    wx.request({
      url: url + '/ciscn/vote/vote-list',
      data: {
        user_id: user_id,
        type: 'O'
      },
      method: 'GET',
      // header: {}, 
      success: function (res) {
        console.log(res.data)
        if (res.data.success == 1) {
          that.setData({
            vote_list: res.data.list
          })
        } else {
          wx.showToast({
            title: '刷新失败请重试',
            image: '/images/cha.png',
            duration: 2000
          })
        }

      }
    })


  },
  thirdShow: function () {
    console.log("3");

    let that = this
    that.setData({
      first: false,
      second: false,
      third: true
    })
    var user_id = app.globalData.user_id
    var url = app.globalData.url

    wx.request({
      url: url + '/ciscn/vote/my-vote',
      data: {
        user_id: user_id
      },
      method: 'GET',
      // header: {}, 
      success: function (res) {
        console.log(res.data)
        if (res.data.success == 1) {
          that.setData({
            vote_list: res.data.list
          })
        } else {
          wx.showToast({
            title: '刷新失败请重试',
            image: '/images/cha.png',
            duration: 2000
          })
        }
      }
    })

  },
  selectTour: function () {
    let that = this
    var url = app.globalData.url
    var user_id = app.globalData.user_id
    wx.request({
      url: url + '/ciscn/tour/get-tours',
      data: {
        user_id: user_id
      },
      method: 'GET',
      // header: {}, 
      success: function (res) {

        if (res.data.success == 0) {
          wx.showToast({
            title: '服务器繁忙',
            image: '/images/cha.png',
            duration: 2000
          })
        } else {
          var tour_list = res.data.tour_list
          var action_list = res.data.action_list

          wx.showActionSheet({
            itemList: action_list,
            success: function (res) {
              wx.setStorageSync('tour_id', tour_list[res.tapIndex]['id']);
              app.globalData.tour_id = tour_list[res.tapIndex]['id'];
              wx.showToast({
                title: '切换成功！',
              })
            }
          })
        }
      }
    })

  }
})
