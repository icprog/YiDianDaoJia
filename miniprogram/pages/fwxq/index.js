// miniprogram/pages/fwxq/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    richText: "<div><img class=\"desc-img\" src=\"//img.alicdn.com/imgextra/i1/66540576/O1CN01j2CKK01G7qh63QCcV_!!66540576.jpg_640x0q80_.webp\"></div><div><img class=\"desc-img\" src=\"//img.alicdn.com/imgextra/i1/66540576/O1CN01j2CKK01G7qh63QCcV_!!66540576.jpg_640x0q80_.webp\"></div><div><img class=\"desc-img\" src=\"//img.alicdn.com/imgextra/i1/66540576/O1CN01j2CKK01G7qh63QCcV_!!66540576.jpg_640x0q80_.webp\"></div><div><img class=\"desc-img\" src=\"//img.alicdn.com/imgextra/i1/66540576/O1CN01j2CKK01G7qh63QCcV_!!66540576.jpg_640x0q80_.webp\"></div><div><img class=\"desc-img\" src=\"//img.alicdn.com/imgextra/i1/66540576/O1CN01j2CKK01G7qh63QCcV_!!66540576.jpg_640x0q80_.webp\"></div><div><img class=\"desc-img\" src=\"//img.alicdn.com/imgextra/i1/66540576/O1CN01j2CKK01G7qh63QCcV_!!66540576.jpg_640x0q80_.webp\"></div>",
    is:true,
    pj: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let pages = getCurrentPages()
    let prvPage = pages[pages.length - 2]
    let that = this
    // this.setData(
    //   {
    //     richText:prvPage.data.fwxq
    //   }
    // )
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth - (100) - 30
    })
    wx.request({
      url: '/',
      success(res)
      {
        console.log(res)
        that.setData(
          {
            richText: res.data.data
          }
        )
      }
    })
    wx.request({
      url: 'https://yddj.panzongyan.cn/wxchat/module2/mtpl',
      method: 'post',
      data: {
        openid: app.globalData.openid,
        type: "get",
        aybh: 1,
        content: "zdgkhpj",//内容
        script: "钟点工客户评价",
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          if (res.data.status == 'success') {
            that.setData(
              {
                pj: res.data.data
              }
            )
          }
          else {
          }
        }
      },
    })
  },
  kh()
  {
    this.setData(
      {
        is : true
      }
    )
  },
  js()
  {
    this.setData(
      {
        is : false
      }
    )
  }
})