// miniprogram/pages/index/index.js
const db = wx.cloud.database({
  env: 'spark-o5fxs'
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    add: false,
    slideButtons: [{
      type: 'warn',
      text: '删除',
      extClass: 'test',
    }]
  },
  slideButtonTap: function (e) {
    console.log(e)
    var that = this
    db.collection('plan').where({
      plan: e.target.id
    }).remove().then(res => {
      db.collection('plan').get().then(res => {
        that.setData({
          list: res.data
        })
      })
    })

  },
  add: function () {
    this.setData({
      add: true
    })
  },
  cancelAdd: function () {
    this.setData({
      add: false
    })
  },
  input: function (e) {
    this.setData({
      plan: e.detail.value
    })
  },
  submit: function () {
    var that = this
    if (this.data.plan != "") {
      db.collection('plan').add({
        data: {
          plan: that.data.plan
        }
      }).then(res => {
        db.collection('plan').get().then(res => {
          that.setData({
            list: res.data
          })
        })
      })
      that.setData({
        add: false
      })

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('plan').get().then(res => {
      that.setData({
        list: res.data
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
    db.collection('plan').get().then(res => {
      console.log(res.data)
    })
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

  }
})