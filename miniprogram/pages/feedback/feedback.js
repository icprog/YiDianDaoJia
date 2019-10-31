var app = getApp();

Page({
  data: {
    array: ['请选择反馈类型', '投诉', '物流状况', '客户服务', '功能异常', '产品建议', '其他'],
    index: 0,
    inputTxt: '',
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  submit(e) {
    console.log(this.data.fkxx)
    if (this.data.index != 0) {
      if (e.detail.value.textarea != '') {
        if (e.detail.value.mobile!='')
        {
          wx.request({
            url: 'https://1024.lovelywhite.cn/wxchat/module3/ts',
            data:
            {
              openid: app.globalData.openid,
              type: "send",//发送数据的类型为发送
              fklx: this.data.array[this.data.index],//反馈类型,
              fknr: this.data.inputTxt,//反馈内容
              content:'fsfk',// 内容
              script: "发送反馈",//描述
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
        else
        {
          wx.showModal({
            title: '提示',
            content: '请输入联系方式',
            showCancel: false
          })
        }
      }
      else {
        wx.showModal({
          title: '提示',
          content: '请输入反馈信息',
          showCancel: false
        })
      }
    }
    else {
      wx.showModal({
        title: '提示',
        content: '请选择反馈类型',
        showCancel: false
      })
    }
  }
})