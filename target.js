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
      text: '已完成',
    },
    {
      type: 'default',
      text: '进行中',
    },
    {
      type: 'warn',
      text: '未完成',
    }],
    list:[],
    flag:""
  },
  
  slideButtonTap:function (e) {
    console.log(e)
    var index=e.detail.index
    var id=e.target.id
    if(index==0){
      db.collection('flag').where({
        flag:id
      }).update({
        data:{
          state:"finish"
        }
      })
    }
    else if(index==1){
      db.collection('flag').where({
        flag:id
      }).update({
        data:{
          state:"doing"
        }
      })
    }
    else if(index==2){
      db.collection('flag').where({
        flag:id
      }).update({
        data:{
          state:"unfinish"
        }
      })
    }
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
      flag: e.detail.value
    })
  },
  submit: function () {
    var that=this
    if(this.data.flag!=""){
      db.collection('flag').add({
        data:{
          flag:that.data.flag,
          state:""
        }
      })
      that.setData({
        add:false
      })
      db.collection('flag').get().then(res => {
        that.setData({
          list:res.data
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    db.collection('flag').get().then(res => {
      console.log(res)
      that.setData({
        list:res.data
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
    db.collection('flag').get().then(res => {
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