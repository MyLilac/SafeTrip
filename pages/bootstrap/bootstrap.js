// pages/bootstrap/bootstrap.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    test: '',
    is_user: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this


    var user_info = wx.getStorageSync('user_info');
    if (!user_info) {

      wx.getUserInfo({
        success: function (res) {
          wx.setStorageSync('user_info', res.userInfo);
          app.globalData.userInfo = res.userInfo;
        }
      })
    } else {

      app.globalData.userInfo = user_info;
    }
    var user_id = wx.getStorageSync('user_id');

    if (user_id) {
      // 缓存中存在则 取出id使用

      app.globalData.user_id = user_id;
      var url = app.globalData.url
      var tour_id = wx.getStorageSync('tour_id');

      if (!tour_id) {
        that.getTours(that, url, user_id)
      } else {
        app.globalData.tour_id = tour_id;
        wx.redirectTo({
          url: '/pages/homepage/homepage',
          success: function (res) {
            // success
          },
          fail: function (res) {
            // fail
          }
        })
      }


    } else {
      // 缓存中不存在，则进行登录
      that.getUserInfo(that)
    }

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
  getUserInfo: function (that) {
    wx.login({
      success: function (res) {
        console.log(res)
        var js_code = res.code;
        if (js_code) {
          //发起网络请求,进行登录
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.userInfo
              app.globalData.userInfo = userInfo
              wx.setStorageSync('user_info', userInfo);
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country
              var url = app.globalData.url
              wx.request({
                url: url + '/ciscn/user/login',
                data: {
                  code: js_code,
                  userInfo: userInfo,
                  nickName: nickName,
                  avatarUrl: avatarUrl,
                  gender: gender,
                  province: province,
                  city: city,
                  country: country
                },
                method: 'GET',
                // header: {}, 
                success: function (res) {

                  app.globalData.user_id = res.data.user_id;
                  wx.setStorageSync('user_id', res.data.user_id);
                  that.getTours(that, url, res.data.user_id)
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  getTours: function (that, url, user_id) {
    console.log('come-in')
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
          if (res.data.tour_count < 1) {
            wx.showModal({
              title: '提示',
              content: '您尚未加入任何旅游团',
              showCancel: false,
              confirmText: "我知道了",
              success: function (res) {
                if (res.confirm) {

                }
                wx.redirectTo({
                  url: '/pages/homepage/homepage',
                  success: function (res) {
                    // success

                  },
                  fail: function (res) {

                  }
                })
              }
            })
          } else if (res.data.tour_count == 1) {
            wx.setStorageSync('tour_id', tour_list[0]['id']);
            app.globalData.tour_id = tour_list[0]['id'];
            wx.redirectTo({
              url: '/pages/homepage/homepage',
              success: function (res) {
                // success

              },
              fail: function (res) {

              }
            })
          }
          else {

            wx.showModal({
              title: '提示',
              content: '检查到您参与了多个旅游团，请选择',
              showCancel: false,
              confirmText: "去选择",
              success: function (res) {
                if (res.confirm) {
                  wx.showActionSheet({
                    itemList: action_list,
                    success: function (res) {
                      wx.setStorageSync('tour_id', tour_list[res.tapIndex]['id']);
                      app.globalData.tour_id = tour_list[res.tapIndex]['id'];
                      wx.redirectTo({
                        url: '/pages/homepage/homepage',
                        success: function (res) {
                          // success

                        },
                        fail: function (res) {

                        }
                      })
                    },
                    fail: function (res) {
                      wx.setStorageSync('tour_id', tour_list[0]['id']);
                      app.globalData.tour_id = tour_list[0]['id'];
                      wx.redirectTo({
                        url: '/pages/homepage/homepage',
                        success: function (res) {
                          // success

                        },
                        fail: function (res) {

                        }
                      })
                    }
                  })
                }
              }
            })
          }
        }

      }
    })
  }
})