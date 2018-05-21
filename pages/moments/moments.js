
var app = getApp()
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
    is_mp3: false, // 是否存在语音
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '语音',
    author: '未知用户',
    src: '',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // recorderManager.onStart(() => {
    //   console.log('recorder start')
    // })
    // recorderManager.onResume(() => {
    //   console.log('recorder resume')
    // })
    // recorderManager.onPause(() => {
    //   console.log('recorder pause')
    // })
    // recorderManager.onStop((res) => {
    //   console.log('recorder stop', res)
    //   const { tempFilePath } = res
    // })
    // recorderManager.onFrameRecorded((res) => {
    //   const { frameBuffer } = res
    //   console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    // })



    // recorderManager.start(options)

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
    let that = this

    var src = app.globalData.mp3tempFilePath
    if (src == '') {
      that.setData({
        is_mp3: false,
        src: src,
        pictures: app.globalData.tempFilePaths
      })
    } else {
      that.setData({
        is_mp3: true,
        src: src,
        pictures: app.globalData.tempFilePaths
      })
    }

    var picture = that.data.pictures;
    console.log(picture);
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

  addImage: function (e) {
    var that = this;
    var count = 9 - that.data.pictures.length
    wx.chooseImage({
      count: count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res);
        var tmp = app.globalData.tempFilePaths.concat(res.tempFilePaths)
        console.log(tmp)
        app.globalData.tempFilePaths = tmp;
        that.setData({
          pictures: tmp
        })
      }
    })
  },
  takeMp3: function () {
    let that = this
    var src = that.data.src

    wx.navigateTo({
      url: '/pages/recorder/recorder?src=' + src + '&have_back=1'
    })
  },
  uploadMoments: function (e) {
    let that = this
    console.log(e)
    console.log(that.data)

    var user_id = app.globalData.user_id
    var tour_id = app.globalData.tour_id
    var idea = e.detail.value.idea
    var url = app.globalData.url
    var img_arr = that.data.pictures

    wx.showLoading({
      title: '请稍等',
    })

    wx.request({
      url: url + '/ciscn/vote/add-vote',
      data: {
        idea: idea,
        tour_id: tour_id,
        user_id: user_id,
        longitude: app.globalData.longitude,
        latitude: app.globalData.latitude
      },
      method: 'POST',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      success: function (res) {

        console.log("+++++++_______________")
        console.log(res.data)
        // success
        var id = res.data.id

        if (res.data.success == 1) {
          if (that.data.is_mp3) {
            var src = that.data.src
            wx.uploadFile({
              url: url + '/ciscn/vote/upload-file',
              filePath: src,
              name: 'file',
              formData: {
                'id': id,
                'type': 'mp3'
              },
              success: function (mp3_res) {
                console.log('------------------------')
                var obj = JSON.parse(mp3_res.data);
                console.log(obj)

                if (obj.success == 1) {
                  if (img_arr.length == 0) {
                    wx.hideLoading()

                    wx.showToast({
                      title: '发表成功',
                      icon: 'success',
                      duration: 2000
                    })
                    setTimeout(function () {
                      wx.reLaunch({
                        url: '/pages/me/me'
                      })
                    }, 1000);


                  }

                } else {
                  wx.showToast({
                    title: '音频上传失败',
                    image: '/images/cha.png',
                    duration: 2000
                  })
                }
              }
            })
          }
          if (img_arr.length == 0) {
            wx.showToast({
              title: '发表成功',
              icon: 'success',
              duration: 2000
            })

            setTimeout(function () {
              wx.reLaunch({
                url: '/pages/me/me'
              })
            }, 1000);
          }
          for (var i = 0; i < img_arr.length; i++) {
            var flag = 0;
            if ((i + 1) == img_arr.length) {
              flag = 1
            }
            var img_path = img_arr[i]
            wx.uploadFile({
              url: url + '/ciscn/vote/upload-file',
              filePath: img_path,
              name: 'file',
              formData: {
                'id': id,
                'type': 'image'
              },
              success: function (img_res) {
                console.log("+++++++++++++++++++++++++")
                var obj = JSON.parse(img_res.data);
                console.log(obj)

                if (obj.success == 1 && flag == 1) {
                  wx.showToast({
                    title: '发表成功',
                    icon: 'success',
                    duration: 2000
                  })

                  setTimeout(function () {
                    wx.reLaunch({
                      url: '/pages/me/me'
                    })
                  }, 1000);

                }
              }
            })
          }



        } else {
          console.log(res)
          wx.showToast({
            title: '创建失败请重试',
            image: '/images/cha.png',
            duration: 2000
          })
        }
        wx.hideLoading()
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