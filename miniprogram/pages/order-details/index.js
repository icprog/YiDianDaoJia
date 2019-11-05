var app = getApp();
const { orderWX ,pay } = require('../../utils/myPay.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var  pages  =  getCurrentPages();
    var  prevPage  =  pages[pages.length  -  2];
    var  info  =  prevPage.data
    this.setData(
      {
        item: prevPage.data.item
      }
    )
    console.log(this.data.item)
  },
  re(e)
  {
    let type = e.currentTarget.dataset.type
    if(type == 'zf')
    {
      orderWX(this.data.item.zfje, this.data.item.script, this.data.item.ddbh).then((res) => {
        pay(res.result).then((res) => {
          wx.showModal({
            title: '提示',
            content: '支付成功',
            showCancel: false,
            success(res)
            {
              if(res.confirm)
              {
                wx.navigateBack({
                })
              }
            }
          })
        }).catch((res) => {
          console.log(res)
          if(res.errMsg=="requestPayment:fail cancel")
          {
            wx.showModal({
              title: '提示',
              content: '支付取消',
              showCancel: false,
            })
          }
          else
          {
            wx.showModal({
              title: '提示',
              content: '支付失败',
              showCancel: false,
            })
          }
        })
      }).catch((res) => {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '支付失败',
          showCancel: false,
        })
      })
    }
    else if(type == 'pj')
    {
      wx.navigateTo({
        url: '/pages/ddpj/ddpj?item='+JSON.stringify(this.data.item),
      })
    }
    else if(type == 'td')
    {
      let that = this
      wx.showModal({
        title: '提示',
        content: '确定要退订该服务？',
        showCancel: true,
        success: function(res) {
          if(res.confirm)
          {
            wx.request({
              url: 'https://yddj.panzongyan.cn/wxchat/wxx/ddtd',
              data:
              {
                openid: app.globalData.openid,
                type: "send",//发送数据的类型为发送
                ddbh: that.data.item.ddbh,//订单编号
                content: "qxxdbjzy",//内容
                script: "取消下单保洁直约",//描述
              },
              success(res) {
                if (res.statusCode === 200) {
                  if (res.data.status === 'success') {
                    wx.showModal({
                      title: '提示',
                      content: '已通知服务商，请联系客服',
                      showCancel: false,
                      success(res) {
                        if (res.confirm) {
                          wx.navigateBack({

                          })
                        }
                      }
                    })
                  }
                  else {
                    wx.showModal({
                      title: '提示',
                      content: res.data.message,
                      showCancel: false
                    })
                  }
                }
                else {
                  wx.showModal({
                    title: '提示',
                    content: '网络错误，提交失败',
                    showCancel: false
                  })
                }
              },
              fail(res) {
                wx.showModal({
                  title: '提示',
                  content: '退订失败',
                  showCancel: false
                })
              }
            })
          }
        }
      })
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
    
  }
})