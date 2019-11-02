// pages/nav/zyxd.js
let app = getApp();
Page({
  data: {
    idx: 0,//select服务种类
    xmbh: "1111",//唯一编号
    fwxq: '<html>或者文字',//服务详情
    fwzl: [//服务种类
    ],
    title: '',
    time: '',
    date: '',
    ddbz: '',
    defaultIndex: -1,
    selectedIndex: -1,
    item: {},//地址元数据
    dzxx: [],//地址数据list
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: options.title === undefined ? "" : options.title
    })
    this.setData({
      title: options.title
    })
    wx.request({
      url: 'https://1024.lovelywhite.cn/wxchat/login/hqdz',
      data: {
        "openid": app.globalData.openid,
        //身份验证
        "type": "get",
        //发送数据的类型为获取
        "content": "dzxx",
        // 内容
        "script": "地址信息", //描述
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          if (res.data.status === 'success') {
            that.setData({
              dzxx: res.data.data.dzxx
            })
            //更新地址信息
            for (let index = 0; index < that.data.dzxx.length; index++) {
              const element = that.data.dzxx[index];
              if (element.bh === res.data.data.defaultBh) {
                that.setData({
                  defaultIndex: index,
                  selectedIndex: index
                })
              }
            }
          }
        }
      },
      fail(res) {
        console.log(res)
      }
    })
    wx.request({
      url: 'https://1024.lovelywhite.cn/wxchat/module3/index',
      data:
      {
        openid: app.globalData.openid,
        //身份验证
        type: "send",
        //发送数据的类型为获取
        content: "hqjszyxx",
        xmmc: this.data.title,//项目名称
        script: "获取" + this.data.title+"信息",//描述

      },
      success(res)
      {
        console.log(res)
        if(res.statusCode===200)
        {
          if(res.data.status==='success')
          {
            that.setData(
              {
                fwzl:res.data.data.fwzl,
                xmbh:res.data.data.xmbh,
                fwxq:res.data.data.fwxq
              }
            )
          }
          else
          {
            wx.showModal({
              title: '提示',
              content: '服务种类为空',
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
          }
        }
      },
      fail(res)
      {
        console.log(res)
        wx.showModal({
          title: '提示',
          content: '获取失败',
          showCancel: false
        })
      }
    })
  },
 
  ddbzInput: function (e) {
    this.setData({
      ddbz: e.detail.value
    })
  },
  change(e)
  {
    let index = e.currentTarget.dataset.index;
    this.setData({
      idx: index,
    })
  },
  order() {
    var date = this.data.date + ' ' + this.data.time + ':00';
    date = date.substring(0, 19);
    date = date.replace(/-/g, '/');
    var timestamp = new Date(date).getTime();
    if (app.globalData.hasLogin) {
      if (this.data.selectedIndex != -1) {
        if (this.data.time !== '' && this.data.date !== '') {
          wx.request({
            url: 'https://1024.lovelywhite.cn/wxchat/module3/operate3',
            data:
            {
              openid: app.globalData.openid,
              dzbh: this.data.dzxx[this.data.selectedIndex].bh,
              jsbh: this.data.xmbh,
              fwsj: timestamp,
              fwbh: this.data.fwzl[this.data.idx].fwbh,
              ddbz: this.data.ddbz,
              type: "send",
              content: "xdjszy",
              script: "极速直约",
            },
            success(res)
            {
              if(res.statusCode==200)
              {
                if(res.data.status=='success')
                {
                  wx.showModal({
                    title: '提示',
                    content: '下单成功',
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
                }
                else
                {
                  wx.showModal({
                    title: '提示',
                    content: '下单失败',
                    showCancel: false,
                  })
                }
              }
              else
              {
                wx.showModal({
                  title: '提示',
                  content: '下单失败',
                  showCancel: false,
                })
              }
            },
            fail(res)
            {
              wx.showModal({
                title: '提示',
                content: '下单失败',
                showCancel: false,
              })
            }
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '请选择服务时间',
            showCancel: false
          })
        }
      }
      else
      {
        wx.showModal({
          title: '提示',
          content: '请先添加地址',
          showCancel: false
        })
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '请登录',
        showCancel: false
      })
    }
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  onShow() {
    let that = this
    wx.request({
      url: 'https://1024.lovelywhite.cn/wxchat/login/hqdz',
      data: {
        "openid": app.globalData.openid,
        //身份验证
        "type": "get",
        //发送数据的类型为获取
        "content": "dzxx",
        // 内容
        "script": "地址信息", //描述
      },
      success: function (res) {
        console.log(res)
        if (res.statusCode === 200) {
          if (res.data.status === 'success') {
            that.setData({
              dzxx: res.data.data.dzxx
            })
          }
          else {
            wx.showModal({
              title: '提示',
              content: '请先添加地址',
              showCancel: false
            })
          }
        }
      },
      fail(res) {
        console.log(res)
      }
    })
    this.setData({
      selectedIndex: this.data.selectedIndex
    })
  },
})