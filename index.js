const db = wx.cloud.database({
  env: 'spark-o5fxs'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: "00:00"
  },
  bindTimeChange: function (e) {
    var that = this
    db.collection('time').where({
      time: that.data.time
    }).remove()
    this.setData({
      time: e.detail.value
    })
    db.collection("time").add({
      data: {
        time: e.detail.value
      }
    })
  },
  flag: function () {
    wx.navigateTo({
      url: '../flag/flag',
    })
  },
  target: function () {
    wx.navigateTo({
      url: '../target/target',
    })
  },
  class: function () {
    wx.navigateTo({
      url: '../class/class',
    })
  },
  finish:function(){
    wx.switchTab({
      url:'../target/finish',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection("time").get().then(res => {
      console.log(res)
      that.setData({
        time: res.data[0].time
      })
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
  
})