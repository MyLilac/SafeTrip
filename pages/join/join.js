// pages/join/join.js
var v_id;
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_idea: 'Y',
    text_value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    v_id = options.v_id
    console.log(v_id)
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
  submitAgree: function () {
    let that = this
    console.log("agree")
    console.log(that.data.text_value)

    var user_id = app.globalData.user_id
    var idea = that.data.text_value
    var url = app.globalData.url

    wx.showModal({
      title: '再次确认',
      content: '您同意此观点，点击确认后无法修改。',
      cancelText: '我再想想',
      confirmText: "确认提交",
      cancelColor: '#808080',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.request({
            url: url + '/ciscn/vote/create-comment',
            data: {
              vote_id: v_id,
              idea: idea,
              user_id: user_id,
              is_agree: 'Y'
            },
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            success: function (res) {
              console.log(res)
              if (res.data.success == 1) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 1000
                })

                setTimeout(function () {
                  wx:wx.navigateBack({
                    delta: 1,
                  })
                }, 1000);
              } else {
                wx.showToast({
                  title: '服务器繁忙',
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


        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  submitDisagree: function () {
    let that = this
    console.log("disagree")
    console.log(that.data.text_value)
    var user_id = app.globalData.user_id
    var idea = that.data.text_value
    var url = app.globalData.url

    wx.showModal({
      title: '再次确认',
      content: '您否决此观点，点击确认后无法修改。',
      cancelText: '我再想想',
      confirmText: "确认提交",
      cancelColor: '#808080',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.request({
            url: url + '/ciscn/vote/create-comment',
            data: {
              vote_id: v_id,
              idea: idea,
              user_id: user_id,
              is_agree: 'N'
            },
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            success: function (res) {
              console.log(res)
              if (res.data.success == 1) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 1000
                })

                setTimeout(function () {
                  wx: wx.navigateBack({
                    delta: 1,
                  })
                }, 1000);
              } else {
                wx.showToast({
                  title: '服务器繁忙',
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

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  submitUnknow: function () {
    let that = this
    console.log("unknow")
    console.log(that.data.text_value)
    var user_id = app.globalData.user_id
    var idea = that.data.text_value
    var url = app.globalData.url

    wx.showModal({
      title: '再次确认',
      content: '您不清楚此观点，点击确认后无法修改。',
      cancelText: '我再想想',
      confirmText: "确认提交",
      cancelColor: '#808080',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')

          wx.request({
            url: url + '/ciscn/vote/create-comment',
            data: {
              vote_id: v_id,
              idea: idea,
              user_id: user_id,
              is_agree: 'U'
            },
            method: 'POST',
            header: { "Content-Type": "application/x-www-form-urlencoded" },
            success: function (res) {
              console.log(res)
              if (res.data.success == 1) {
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 1000
                })

                setTimeout(function () {
                  wx: wx.navigateBack({
                    delta: 1,
                  })
                }, 1000);
              } else {
                wx.showToast({
                  title: '服务器繁忙',
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

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  bindTextAreaInput: function (e) {
    this.setData({
      text_value: e.detail.value
    })
  }

})