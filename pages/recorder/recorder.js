//index.js
//获取应用实例

const recorderManager = wx.getRecorderManager()
var is_cancel = false
var is_cancel = false
var mp3tempFilePath = ""
var have_back = false

var app = getApp()
Page({
  data: {
    j: 1,//帧动画初始图片
    lastX: 0,
    lastY: 0,
    speak_status: 1,
    is_mp3: false,
    poster: '/images/seclect_mp3.png',
    name: '',
    author: '',
    mp3tempFilePath: '',
    is_coded: false
  },

  onLoad: function (e) {
    let that = this
    console.log(app.globalData)


    var src = e.src
    var dec = e.have_back
    if (src == '') {
      that.setData({
        is_mp3: false,
        mp3tempFilePath: src,
      })
    } else {
      that.setData({
        is_mp3: true,
        mp3tempFilePath: src
      })
    }

    if (dec == 1) {
      have_back = true
    } else {
      have_back = false
    }


    wx.authorize({
      scope: 'scope.record',
      success() {
        // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
        console.log("ok")
      }
    })

    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onResume(() => {
      console.log('recorder resume')
    })
    recorderManager.onPause(() => {
      console.log('recorder pause')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res)
      this.setData({
        mp3tempFilePath: res.tempFilePath,
        is_mp3: true
      })


      wx.hideLoading()

      //app.globalData.mp3tempFilePath = res.tempFilePath
    })
    recorderManager.onFrameRecorded((res) => {
      console.log('frameBuffer.byteLength', frameBuffer.byteLength)
    })
  },

  //长按开始说话，
  startSpeak: function (event) {
    let that = this;
    if (that.data.is_mp3) {

      wx.showModal({
        title: '提示',
        content: '再次录音会删除前一条，是否继续录音？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            that.setData({
              is_mp3: false,
              mp3tempFilePath: ''
            })
            app.globalData.mp3tempFilePath = ''
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
          wx.hideLoading()
        }
      })
    } else {
      speaking.call(that);
      console.log(event)

      var options = {
        duration: 600000,
        sampleRate: 44100,
        numberOfChannels: 1,
        encodeBitRate: 192000,
        format: 'mp3',
        frameSize: 50
      }
      recorderManager.start(options)
      that.setData({
        speak_status: 2,
        lastX: event.touches[0].pageX,
        lastY: event.touches[0].pageY
      })
    }
  },

  //松手停止说话，
  stopSpeak: function () {
    let that = this;

    wx.showLoading({
      title: '请稍等',
    })

    if (is_cancel) {
      console.log("录音取消")
      is_cancel = false
    } else {
      recorderManager.stop()

      // 此处异步
      console.log(that.data.mp3tempFilePath)

      console.log("录音结束")
    }

    //去除帧动画循环
    clearInterval(that.timer)
    that.setData({
      j: 1,
      speak_status: 1
    })

  },

  //移动取消说话，
  cancelSpeak: function (event) {
    let that = this;

    var currentX = event.touches[0].pageX
    var currentY = event.touches[0].pageY
    var topmove = (currentY - this.data.lastY)
    console.log(topmove)
    if (topmove < -80) {

      is_cancel = true
      wx.showToast({
        title: '已取消',
      })
      that.setData({
        speak_status: 1
      })
    } else {
      that.setData({
        speak_status: 3
      })
    }

  },
  //确定按钮，
  saveMp3: function () {
    console.log("D1111")
    let that = this
    app.globalData.mp3tempFilePath = that.data.mp3tempFilePath
    if (have_back) {
      wx: wx.navigateBack({
        delta: 1,
      })
    } else {
      wx.navigateTo({
        url: '/pages/moments/moments'
      })
    }

  },
  //取消按钮，
  cancelMp3: function () {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否取消并删除当前录音？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.setData({
            is_mp3: false,
            mp3tempFilePath: ''
          })
          app.globalData.mp3tempFilePath = ''
          if (have_back) {
            wx: wx.navigateBack({
              delta: 1,
            })
          } else {
            wx.navigateTo({
              url: '/pages/moments/moments'
            })
          }

        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },
  coded: function () {
    let that = this
    var is_coded = !that.data.is_coded;
    that.setData({
      is_coded: is_coded
    })
  },
  playVoice:function() {
    var tempFilePath = this.data.mp3tempFilePath
    wx.playVoice({
      filePath: tempFilePath
    })
  }

})


function speaking() {
  //话筒帧动画
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
    return
  }, 200);
  //波纹放大,淡出动画
  var _this = this;


}