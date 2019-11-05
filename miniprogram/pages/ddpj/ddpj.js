var app = getApp();

Page({
  data: {
    array: ['请选择满意度', '满意', '一般', '不满意'],
    index: 0,
    inputTxt: '',
    starIndex: 0,
    item: {}
  },
  onLoad(e) {
    this.setData(
      {
        item: JSON.parse(e.item)
      }
    )
    console.log(this.data.item)
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  onChange2(e) {
    const index = e.detail.index;
    this.setData({
      starIndex: index
    })
  },
  submit(e) {
    let that = this
    console.log(this.data.fkxx)
    if (this.data.index != 0) {
      if (e.detail.value.textarea != '') {

        wx.request({
          url: 'https://yddj.panzongyan.cn/wxchat/module2/tjpl',
          data:
          {
            openid: app.globalData.openid,
            type: "send",//发送数据的类型为发送
            ddbh: that.data.item.ddbh,//订单编号
            myd: that.data.array[that.data.index],
            pf: that.data.starIndex,//评分
            pjnr: e.detail.value.textarea,
            content: "fskhpj",//内容
            script: that.data.item.fws,//描述
          },
          success(res) {
            if (res.statusCode === 200) {
              if (res.data.status === 'success') {
                wx.showModal({
                  title: '提示',
                  content: '提交成功，感谢您的建议/意见',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                     wx.navigateBack({
                       delta: 2
                     })
                    }
                  }
                })
              }
              else {
                wx.showModal({
                  title: '提示',
                  content: '服务器错误，提交失败',
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
              content: '提交失败',
              showCancel: false
            })
          }
        })

      }
      else {
        wx.showModal({
          title: '提示',
          content: '请输入评价信息',
          showCancel: false
        })
      }
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请选择满意度',
        showCancel: false
      })
    }
  }
})