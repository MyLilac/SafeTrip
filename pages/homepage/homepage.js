var app = getApp()
var check = 1
var points_count = 0
var start_longitude;
var start_latitude;
Page({
  data: {
    plus_true: true,
    longitude: 0,
    latitude: 0,
    markers: [],
    polyline: [],
    isPopping: false,//是否已经弹出  
    button: '弹出',
    animMenu: {},
    animMenus: {}
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    console.log(app.globalData.tour_id)

    var user_id = app.globalData.user_id
    var tour_id = app.globalData.tour_id
    var url = app.globalData.url

    wx.request({
      url: url + '/ciscn/tour/get-route',
      data: {
        user_id: user_id,
        t_id: tour_id
      },
      method: 'GET',
      // header: {}, 
      success: function (res) {
        console.log(res)
        points_count = res.data.points_count
        start_longitude = res.data.longitude
        start_latitude = res.data.latitude
        that.setData({
          polyline: res.data.polyline,
          markers: res.data.markers,
          longitude: res.data.longitude,
          latitude: res.data.latitude
        })
      }
    })

    that.mapCtx = wx.createMapContext('map')


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    wx.showLoading({
      title: '地图加载中',
    })

    setTimeout(function () {
      that.plus()
      wx.hideLoading()
    }, 2500)

    that.animation_1 = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease-in-out"

    })
    that.animation_2 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"

    })


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

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  // translate: function () {
  //   let that = this
  //   var plus_check = true
  //   if (check == 1) {
  //     that.animation_2.opacity(0).step()
  //     plus_check = false
  //     that.animation_1.opacity(0.5).step()
  //   } else {
  //     that.animation_2.opacity(0.5).step()
  //     plus_check = true
  //     that.animation_1.opacity(0).scale(1, 1).translate(0, 0).step()
  //   }
  //   check *= -1

  //   that.setData({
  //     animation_1: this.animation_1.export(),
  //     animation_2: this.animation_2.export(),
  //     plus_true: plus_check
  //   })
  // },

  takePhoto: function () {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#CED63A",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImage('camera')
          }
        }
      }
    })

  },

  chooseWxImage: function (type) {
    var that = this;
    that.mapCtx.moveToLocation()
    setTimeout(function () {
      that.mapCtx.getCenterLocation({
        success: function (res) {
          console.log(res.longitude)
          console.log(res.latitude)
          app.globalData.latitude = res.latitude;
          app.globalData.longitude = res.longitude;
        }
      })
    }, 50)
    // wx.getLocation({
    //   type: 'gcj02 ',
    //   success: function (res) {
    //     console.log(res)
    //     app.globalData.latitude = res.latitude;
    //     app.globalData.longitude = res.longitude;
    //     console.log("++++++++++")
    //   }
    // })



    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        app.globalData.tempFilePaths = res.tempFilePaths;
        wx.navigateTo({
          url: '/pages/moments/moments',
          success: function (res) {
            // success
          },
          fail: function (res) {
          }
        })
      }
    })
  },

  takeVideo: function () {
    console.log("video")
    var that = this
    that.mapCtx.moveToLocation()
    // wx.getLocation({
    //   type: 'gcj02 ',
    //   success: function (res) {
    //     console.log(res)
    //     app.globalData.latitude = res.latitude;
    //     app.globalData.longitude = res.longitude;
    //     console.log("++++++++++")
    //   }
    // })

    setTimeout(function () {
      that.mapCtx.getCenterLocation({
        success: function (res) {
          console.log(res.longitude)
          console.log(res.latitude)
          app.globalData.latitude = res.latitude;
          app.globalData.longitude = res.longitude;
        }
      })
    }, 50)

    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        console.log("success")
        console.log(res)
        var tempFilePath = res.tempFilePath
        console.log(tempFilePath)
        wx.navigateTo({
          url: '/pages/video/video?src=' + tempFilePath,
          success: function (res) {
            // success
          },
          fail: function (res) {
          }
        })
      }
    })
  },

  takeMp3: function () {
    console.log("mp3")
    var that = this
    that.mapCtx.moveToLocation()
    // wx.getLocation({
    //   type: 'gcj02 ',
    //   success: function (res) {
    //     console.log(res)
    //     app.globalData.latitude = res.latitude;
    //     app.globalData.longitude = res.longitude;
    //     console.log("++++++++++")
    //   }
    // })

    setTimeout(function () {
      that.mapCtx.getCenterLocation({
        success: function (res) {
          console.log(res.longitude)
          console.log(res.latitude)
          app.globalData.latitude = res.latitude;
          app.globalData.longitude = res.longitude;
        }
      })
    }, 50)

    var src = ''
    wx.navigateTo({
      url: '/pages/recorder/recorder?src=' + src + '&have_back=0'
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  searchLocation: function () {
    let that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude

        })
      },
      fail: function (emsg) {
        console.log(emsg)
      }
    })
  },
  searchTour: function () {
    wx.navigateTo({
      url: '/pages/tourlist/tourlist',
      success: function (res) {
        // success
      },
      fail: function (res) {
      }
    })
  },
  toMe: function () {
    wx.navigateTo({
      url: '/pages/me/me',
      success: function (res) {
        // success
      },
      fail: function (res) {
      }
    })
  },
  toWay: function () {
    let that = this
    that.setData({
      longitude: start_longitude,
      latitude: start_latitude
    })
  },
  toVote: function () {
    console.log("Dsa")
    var animationMenus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationMenus.translate(-150).step();


    var animationMenu = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationMenu.opacity(0).step();

    this.setData({
      animMenus: animationMenus.export(),
      animMenu: animationMenu.export(),
    })


  },
  testTap: function (e) {
    console.log(e)
  },
  markTap: function (e) {
    console.log(e)
    console.log(points_count)
    var id = e.markerId;
    if (id >= points_count) {
      wx.navigateTo({
        url: '/pages/vote/vote?v_id=' + id
      })

    }
  },
  //点击弹出  
  plus: function () {
    console.log(this.data.isPopping)
    if (!this.data.isPopping) {
      //缩回动画  
      this.popp();
      this.setData({
        isPopping: true,
        button: '收起',
      })
    } else if (this.data.isPopping) {
      //弹出动画  
      this.takeback();
      this.setData({
        isPopping: false,
        button: '弹出',
      })
    }
  },
  //弹出动画  
  popp: function () {
    //plus顺时针旋转  

    var animationMenu = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationMenu.translate(-150).opacity(1).step();
    this.setData({
      animMenu: animationMenu.export(),
    })
  },
  //收回动画  
  takeback: function () {
    //plus逆时针旋转  

    var animationMenu = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })

    animationMenu.translate(0).step();


    var animationMenus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease-out'
    })
    animationMenus.translate(0).step();

    this.setData({
      animMenu: animationMenu.export(),
      animMenus: animationMenus.export(),
    })
  },


})

