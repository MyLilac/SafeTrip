
var windowWidth;
var windowHeight;
var radius;
var interval_id


Page({

  onReady: function (e) {

  },
  onShow: function (e) {
    // (function play() {
    //   if (timer) clearTimeout(timer);
    //   renderTime();
    //   return timer = setTimeout(play, 900);
    // })();


  },
  onHide: function (e) {

  },
  toHome: function () {

    wx.redirectTo({
      url: '/pages/bootstrap/bootstrap',
      success: function (res) {

      },
    })

  }

})