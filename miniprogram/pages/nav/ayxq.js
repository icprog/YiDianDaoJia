// pages/nav/zyxd.js
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
    pj: [],
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
    this.setData(
      {
        zdg: {
          // id: options.id,
          // xm: options.xm, //姓名
          // jg: options.jg, //价格
          // xb: options.xb, //性别
          // nl: options.nl, //年龄
          // dd: "", //地点
          // xj: options.xj, //星级
          // fwcs: options.fwcs, //服务次数
          // jl: options.jl, //距离
          // tx: options.tx, //头像
          id: 1,
          xm: '小白', //姓名
          jg: 22, //价格
          xb: '男', //性别
          nl: 20, //年龄
          dd: "湖南", //地点
          xj: 4, //星级
          fwcs: 20, //服务次数
          jl: 5, //距离
          tx: '', //头像
        }
      }
    )
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
  handleChange: function (options) {
    this.setData({
      sl: options.detail.value
    })
  },
  confirmPay: function () {

  }
})