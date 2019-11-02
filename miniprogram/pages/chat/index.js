// miniprogram/pages/chat/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatList: [
      {
        type:1,
        date:'2019-10-20 20:30',
        content:"请问您需要什么帮助1111111111111111111111111111111111111111111吗1111？"
      },
      {
        type: 0,
        date: '2019-10-20 20:30',
        content: "请问您需要什么帮助1111111111111111111111111111111111111111111吗1111？"
      }
    ],
    message:'',
    scroll_height:0
  },
  bindKeyInput: function (e) {
    this.setData({
      message: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (60) - 30
    })
    setInterval(()=>
    {
      wx.request({
        url: '',
        data:
        {
          openid:app.globalData.openid
        },
        success(res)
        {
        }
      })
    },5000)
  },
  
  //发送信息
  sendMessage: function() {
    let that = this
    wx.request({
      url: '/game/game/sendMessage',
      data: {
        openid: app.globalData.openid,
        mes: that.data.message
      },
      success(res) {
       
      },
      fail(res) {
        console.log(res)
      },
      complete()
      {
        that.data.chatList.push({
          type: 2,
          content: that.data.message,
          date: '2019-10-10 20:23'
        })
        that.setData(
          {
            message: '',
            chatList: that.data.chatList,
          }
        )
      }
    })
  },
})