// pages/nav/zyxd.js
const {myPay} = require('../../../utils/myPay.js')
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/image/UI/normal.png',
    selectedSrc: '/image/UI/selected.png',
    halfSrc: '/image/UI/half.png',
    zdg: {},
    gzlb:[],//关注列表
    scroll_height:0,
    isFans:false,
    title:'',
    pj: [
    {
      "pjbh": "11234",//评价唯一编号
      "khzh": 1234,//客户账号
      "pjsj": "2019-10-10 20:30",//评价时间
      "pjnr": "评价内容",//评价内容
      "pjdj": "满意",
    }
    ]
    ,
    sl: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.setNavigationBarTitle({
      title: options.title === undefined ? "" : options.title
    })
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      zdg: JSON.parse(options.item),
      title: options.title,
      scroll_height: windowHeight * 750 / windowWidth - (400) - 30
    })
    //获取关注列表
    wx.request({
      url: '',
      data:
      {
        openid: "xxx",//身份验证
        content: "hqgzlb",// 内容
        script: "获取关注列表",//描述
      },
      success(res)
      {
        if(res.statusCode===200)
        {
          if(res.data.status=='success')
          {
            that.setData(
              {
                gzlb:res.data.data
              }
            )
            //设置关注
            for (let i = 0; i < that.data.gzlb.length;i++) {
              if(that.data.gzlb[i]===zdg.bh)
              {
                that.setData(
                  {
                    isFans:true
                  }
                )
                break
              }
            }
          }
        }
      }
    })
    wx.request({
      url: 'http://www.panzongyan.cn/wxchat/module2/mtpl',
      method: 'post',
      data: {
        "useruuid": "xxx",//身份验证
        "type": "get",//发送数据的类型为获取
        "aybh": that.data.zdg.id,//阿姨编号
        "content": "zdgkhpj",//内容
        "script": "钟点工客户评价",//描述
      },
      success: function (res) {
        if (res.statusCode === 200) {
          console.log(res.data)
        }
      },
    })
  },
  order()
  {
    wx.navigateTo({
      url: '/pages/nav/xdyy/xdyy?item=' + JSON.stringify(this.data.zdg) + '&title=' + this.data.title
    })
  },
  changeFan()
  {
    let that = this
    if(this.data.isFans)
    {
      wx.request({
        url: 'http://www.panzongyan.cn/wxchat/module2/gfans',
        data:
        {
          openid: app.globalData.openid,//身份验证
          bh: that.zdg.bh,//阿姨/服务商编号
          content: "qxgz",// 内容
          script: "取消关注",//描述
        },
        success(res)
        {
          if(res.statusCode==200)
          {
            if(res.data.status=='success')
            {
              that.setData(
                {
                  isFans:false
                }
              )
              wx.showModal({
                title: '提示',
                content: '取消关注成功',
                showCancel: false
              })
            }
            else
            {
              wx.showModal({
                title: '提示',
                content: '取消关注失败',
                showCancel: false
              })
            }
          }
          else
          {
            wx.showModal({
              title: '提示',
              content: '取消关注失败',
              showCancel: false
            })
          }
        },
        fail(res)
        {
          wx.showModal({
            title: '提示',
            content: '取消关注失败',
            showCancel: false
          })
        }
      })
    }
    else
    {
      wx.request({
        url: 'http://www.panzongyan.cn/wxchat/module2/fans',
        data:
        {
          openid: app.globalData.openid,//身份验证
          bh: that.zdg.bh,//编号
          content: "gz",// 内容
          script: "关注",//描述
        },
        success(res) {
          if (res.statusCode == 200) {
            if (res.data.status == 'success') {
              that.setData(
                {
                  isFans: false
                }
              )
              wx.showModal({
                title: '提示',
                content: '关注成功',
                showCancel: false
              })
            }
            else {
              wx.showModal({
                title: '提示',
                content: '关注失败',
                showCancel: false
              })
            }
          }
          else {
            wx.showModal({
              title: '提示',
              content: '关注失败',
              showCancel: false
            })
          }
        },
        fail(res) {
          wx.showModal({
            title: '提示',
            content: '关注失败',
            showCancel: false
          })
        }
      })
    }
  }
})